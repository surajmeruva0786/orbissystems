import { motion } from "motion/react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import SoftAurora from "./SoftAurora";
import { RainbowButton } from "./RainbowButton";

export function CTABanner() {
  const benefits = [
    "Enterprise-Grade Security",
    "99.9% Uptime SLA",
    "24/7 Premium Support"
  ];

  return (
    <section className="relative py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8" id="cta">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl sm:rounded-3xl lg:rounded-[32px] bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950"
        >
          {/* Animated background patterns */}
          <div className="absolute inset-0">
            {/* Grid pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />
            
            {/* Gradient orbs */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 50, 0],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-indigo-600/30 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                x: [0, -50, 0],
                y: [0, 30, 0],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-purple-600/30 rounded-full blur-3xl"
            />
          </div>
          
          {/* Content */}
          <div className="relative px-6 sm:px-8 lg:px-16 py-12 sm:py-16 lg:py-20">
            {/* Soft Aurora Background Effect */}
            <div className="absolute inset-0 opacity-40 pointer-events-none">
              <SoftAurora
                speed={0.5}
                scale={2.0}
                brightness={0.8}
                color1="#6366f1"
                color2="#8b5cf6"
                noiseFrequency={2.0}
                noiseAmplitude={1.2}
                bandHeight={0.4}
                bandSpread={1.2}
                octaveDecay={0.15}
                layerOffset={1.5}
                colorSpeed={0.8}
                enableMouseInteraction={true}
                mouseInfluence={0.3}
              />
            </div>
            
            <div className="max-w-4xl mx-auto text-center space-y-8 sm:space-y-10">
              {/* Heading */}
              <div className="space-y-4 sm:space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight px-4">
                    Ready to Transform Your{" "}
                    <span className="relative inline-block">
                      <span className="relative bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                        Operations?
                      </span>
                      <motion.div
                        animate={{
                          scale: [1, 1.1, 1],
                          opacity: [0.5, 0.8, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="absolute -inset-2 bg-gradient-to-r from-indigo-600/30 to-purple-600/30 blur-xl -z-10"
                      />
                    </span>
                  </h2>
                </motion.div>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed px-4"
                >
                  Partner with us to build mission-critical software for government institutions and enterprises across India.
                </motion.p>
              </div>

              {/* Benefits */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm px-4"
              >
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-1.5 sm:gap-2 text-gray-300">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 flex-shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4"
              >
                <RainbowButton
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto group relative overflow-hidden bg-white text-gray-900 px-6 sm:px-8 py-3 sm:py-4 font-semibold shadow-2xl shadow-white/10 hover:shadow-white/20 transition-all"
                >
                  <span className="relative flex items-center justify-center gap-2 text-gray-900">
                    Schedule a Demo
                    <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </RainbowButton>
                
                <RainbowButton
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto relative group px-6 sm:px-8 py-3 sm:py-4 font-semibold overflow-hidden bg-transparent border-2 border-white/30 hover:border-white/50"
                >
                  <span className="relative text-gray-900">
                    Contact Sales
                  </span>
                </RainbowButton>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}