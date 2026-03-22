import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { TextGenerateEffect } from "./TextGenerateEffect";
import { TextGenerateEffectGradient } from "./TextGenerateEffectGradient";
import Ballpit from "./Ballpit";
import { RainbowButton } from "./RainbowButton";
import { RainbowBadge } from "./RainbowBadge";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Ballpit background */}
      <div className="absolute inset-0 opacity-30">
        <Ballpit followCursor={true} count={40} />
      </div>
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/70 to-indigo-50/50 pointer-events-none" />
      
      {/* Very subtle grid pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLDAsMCwwLjAxNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-50" />
      
      <div className="relative max-w-7xl mx-auto pt-16 sm:pt-20">
        <div className="max-w-5xl mx-auto text-center space-y-8 sm:space-y-10">
          {/* Badge with Rainbow Border */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2"
          >
            <RainbowBadge>
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2">
                <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-indigo-600" />
                <span className="text-xs sm:text-sm font-medium text-gray-700">
                  Built for Government & Enterprise
                </span>
              </div>
            </RainbowBadge>
          </motion.div>

          {/* Hero Heading with TextGenerateEffect */}
          <div className="space-y-4 sm:space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.1]">
              <div className="block text-gray-900 mb-2">
                <TextGenerateEffect words="Enterprise Software" duration={0.8} />
              </div>
              <div className="block">
                <TextGenerateEffectGradient words="Engineered for Impact" duration={0.8} />
              </div>
            </h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4"
            >
              Building secure, scalable, and compliant platforms designed for government bodies, 
              public-sector organizations, and enterprise clients across India.
            </motion.p>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4"
          >
            <RainbowButton
              size="lg"
              className="w-full sm:w-auto group relative text-white px-6 sm:px-8 py-3 sm:py-4 font-medium shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 transition-all"
            >
              <span className="relative flex items-center justify-center gap-2 text-white">
                Explore Solutions
                <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </RainbowButton>
            
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-medium border-2 border-gray-300 text-gray-700 hover:border-indigo-600 hover:text-indigo-600 transition-all"
            >
              Client Portal
            </motion.button>
          </motion.div>

          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 pt-6 sm:pt-8 px-4"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-xs sm:text-sm text-gray-600 text-center">
                <span className="font-semibold text-gray-900">Enterprise-Grade Security</span> • Compliant Infrastructure
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}