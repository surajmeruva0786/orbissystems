import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from "motion/react";
import { gsap } from 'gsap';
import { Shield, Zap, BarChart3, Headphones, Link2, Layers } from "lucide-react";
import { RainbowBadge } from "./RainbowBadge";

// Particle Card Component
interface ParticleCardProps {
  children: React.ReactNode;
  className?: string;
  disableAnimations?: boolean;
  style?: React.CSSProperties;
  particleCount?: number;
  glowColor?: string;
  enableTilt?: boolean;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
}

const DEFAULT_PARTICLE_COUNT = 8;
const DEFAULT_GLOW_COLOR = '79, 70, 229'; // indigo-600

const createParticleElement = (x: number, y: number, color: string = DEFAULT_GLOW_COLOR): HTMLDivElement => {
  const el = document.createElement('div');
  el.className = 'particle';
  el.style.cssText = `
    position: absolute;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: rgba(${color}, 0.9);
    box-shadow: 0 0 10px rgba(${color}, 0.8), 0 0 20px rgba(${color}, 0.5);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

const ParticleCard: React.FC<ParticleCardProps> = ({
  children,
  className = '',
  disableAnimations = false,
  style,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  enableTilt = true,
  clickEffect = false,
  enableMagnetism = false
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef<HTMLDivElement[]>([]);
  const particlesInitialized = useRef(false);
  const magnetismAnimationRef = useRef<gsap.core.Tween | null>(null);

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return;

    const { width, height } = cardRef.current.getBoundingClientRect();
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(Math.random() * width, Math.random() * height, glowColor)
    );
    particlesInitialized.current = true;
  }, [particleCount, glowColor]);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    magnetismAnimationRef.current?.kill();

    particlesRef.current.forEach(particle => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'back.in(1.7)',
        onComplete: () => {
          particle.parentNode?.removeChild(particle);
        }
      });
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;

    if (!particlesInitialized.current) {
      initializeParticles();
    }

    memoizedParticles.current.forEach((particle, index) => {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;

        const clone = particle.cloneNode(true) as HTMLDivElement;
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);

        gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });

        gsap.to(clone, {
          x: (Math.random() - 0.5) * 80,
          y: (Math.random() - 0.5) * 80,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: 'none',
          repeat: -1,
          yoyo: true
        });

        gsap.to(clone, {
          opacity: 0.4,
          duration: 1.5,
          ease: 'power2.inOut',
          repeat: -1,
          yoyo: true
        });
      }, index * 100);

      timeoutsRef.current.push(timeoutId);
    });
  }, [initializeParticles]);

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return;

    const element = cardRef.current;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      animateParticles();

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 3,
          rotateY: 3,
          duration: 0.3,
          ease: 'power2.out',
          transformPerspective: 1000
        });
      }
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }

      if (enableMagnetism) {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!enableTilt && !enableMagnetism) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      if (enableTilt) {
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        gsap.to(element, {
          rotateX,
          rotateY,
          duration: 0.1,
          ease: 'power2.out',
          transformPerspective: 1000
        });
      }

      if (enableMagnetism) {
        const magnetX = (x - centerX) * 0.03;
        const magnetY = (y - centerY) * 0.03;

        magnetismAnimationRef.current = gsap.to(element, {
          x: magnetX,
          y: magnetY,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mousemove', handleMouseMove);

    return () => {
      isHoveredRef.current = false;
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mousemove', handleMouseMove);
      clearAllParticles();
    };
  }, [animateParticles, clearAllParticles, disableAnimations, enableTilt, enableMagnetism, clickEffect, glowColor]);

  return (
    <div
      ref={cardRef}
      className={`${className} relative overflow-hidden`}
      style={{ ...style, position: 'relative', overflow: 'hidden' }}
    >
      {children}
    </div>
  );
};

// Main BentoFeatures Component
export function BentoFeatures() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const features = [
    {
      icon: Layers,
      title: "Scalable Architecture",
      description: "Built to handle enterprise-scale operations with multi-level verification.",
      iconColor: "text-amber-600",
      iconBg: "bg-amber-50",
      glowColor: "217, 119, 6" // amber-600
    },
    {
      icon: Zap,
      title: "Rapid Deployment",
      description: "Streamlined implementation process reduces deployment time from months to weeks.",
      iconColor: "text-indigo-600",
      iconBg: "bg-indigo-50",
      glowColor: "79, 70, 229" // indigo-600
    },
    {
      icon: Shield,
      title: "Secure & Compliant",
      description: "Government-grade security with full compliance to data protection regulations and privacy standards.",
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-50",
      glowColor: "16, 185, 129" // emerald-500
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Comprehensive dashboards and reporting tools for data-driven decision making.",
      iconColor: "text-amber-600",
      iconBg: "bg-amber-50",
      glowColor: "217, 119, 6" // amber-600
    },
    {
      icon: Headphones,
      title: "Dedicated Support",
      description: "24/7 expert support team and field officers to assist you at every stage.",
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-50",
      glowColor: "16, 185, 129" // emerald-500
    },
    {
      icon: Link2,
      title: "Seamless Integration",
      description: "Easy integration with existing government systems and third-party platforms.",
      iconColor: "text-purple-600",
      iconBg: "bg-purple-50",
      glowColor: "147, 51, 234" // purple-600
    }
  ];

  return (
    <section className="relative py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50" id="features">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-3 sm:space-y-4 mb-10 sm:mb-12 lg:mb-16"
        >
          <RainbowBadge>
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2">
              <div className="w-2 h-2 bg-indigo-600 rounded-full" />
              <span className="text-xs sm:text-sm font-medium text-gray-700">
                Why Orbis Systems
              </span>
            </div>
          </RainbowBadge>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight px-4">
            Comprehensive Solutions for{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Critical Systems
            </span>
          </h2>
          
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Our platform is designed to provide end-to-end support for government and enterprise operations with transparency, security, and efficiency.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="bento-grid-container">
          <style>
            {`
              .bento-grid-container {
                display: grid;
                grid-template-columns: 1fr;
                gap: 1rem;
              }
              
              @media (min-width: 640px) {
                .bento-grid-container {
                  grid-template-columns: repeat(2, 1fr);
                  gap: 1rem;
                }
              }
              
              @media (min-width: 1024px) {
                .bento-grid-container {
                  grid-template-columns: repeat(4, 1fr);
                  grid-auto-rows: 280px;
                  gap: 1.25rem;
                }
                
                /* Card 1 - Small (top-left quadrant, position 1) */
                .bento-grid-container > div:nth-child(1) {
                  grid-column: 1 / 2;
                  grid-row: 1 / 2;
                }
                
                /* Card 2 - Small (top-left quadrant, position 2) */
                .bento-grid-container > div:nth-child(2) {
                  grid-column: 2 / 3;
                  grid-row: 1 / 2;
                }
                
                /* Card 3 - Large (top-right, 2 columns wide, 1 row tall) */
                .bento-grid-container > div:nth-child(3) {
                  grid-column: 3 / 5;
                  grid-row: 1 / 2;
                }
                
                /* Card 4 - Large (bottom-left, 2 columns wide, 1 row tall) */
                .bento-grid-container > div:nth-child(4) {
                  grid-column: 1 / 3;
                  grid-row: 2 / 3;
                }
                
                /* Card 5 - Small (bottom-right quadrant, position 1) */
                .bento-grid-container > div:nth-child(5) {
                  grid-column: 3 / 4;
                  grid-row: 2 / 3;
                }
                
                /* Card 6 - Small (bottom-right quadrant, position 2) */
                .bento-grid-container > div:nth-child(6) {
                  grid-column: 4 / 5;
                  grid-row: 2 / 3;
                }
              }
              
              @media (min-width: 1280px) {
                .bento-grid-container {
                  grid-auto-rows: 300px;
                  gap: 1.5rem;
                }
              }
              
              /* Particle effect styles */
              .particle {
                position: absolute;
                pointer-events: none;
                z-index: 100;
              }
            `}
          </style>
          
          {features.map((feature, index) => {
            const Icon = feature.icon;
            // Cards 3 and 4 are the large featured cards
            const isLargeCard = index === 2 || index === 3;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="h-full"
              >
                <ParticleCard
                  className={`h-full bg-white rounded-2xl lg:rounded-3xl ${
                    isLargeCard ? 'p-8 sm:p-10 lg:p-12' : 'p-6 sm:p-7 lg:p-8'
                  } border border-gray-200/80 hover:border-indigo-300/60 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10`}
                  disableAnimations={isMobile}
                  particleCount={isLargeCard ? 30 : 20}
                  glowColor={feature.glowColor}
                  enableTilt={true}
                  enableMagnetism={false}
                  clickEffect={false}
                >
                  {/* Icon */}
                  <div className={isLargeCard ? "mb-6 lg:mb-8" : "mb-4 lg:mb-5"}>
                    <div className={`${
                      isLargeCard 
                        ? 'w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20' 
                        : 'w-12 h-12 sm:w-13 sm:h-13 lg:w-14 lg:h-14'
                    } ${feature.iconBg} rounded-xl lg:rounded-2xl flex items-center justify-center transition-transform duration-300 hover:scale-110 shadow-sm`}>
                      <Icon className={`${
                        isLargeCard 
                          ? 'w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10' 
                          : 'w-6 h-6 sm:w-6.5 sm:h-6.5 lg:w-7 lg:h-7'
                      } ${feature.iconColor}`} strokeWidth={2.5} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-2 sm:space-y-3 relative z-10">
                    <h3 className={`${
                      index === 3 
                        ? 'text-sm sm:text-base lg:text-lg' // Even smaller for Real-time Analytics
                        : isLargeCard 
                        ? 'text-xl sm:text-2xl lg:text-3xl' 
                        : 'text-xl sm:text-xl lg:text-2xl'
                    } font-bold text-gray-900 leading-tight`}>
                      {feature.title}
                    </h3>
                    <p className={`${
                      index === 3 
                        ? 'text-[10px] sm:text-xs lg:text-xs' // Even smaller for Real-time Analytics
                        : isLargeCard 
                        ? 'text-sm sm:text-base lg:text-lg' 
                        : 'text-sm sm:text-base'
                    } text-gray-600 leading-relaxed`}>
                      {feature.description}
                    </p>
                  </div>
                </ParticleCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}