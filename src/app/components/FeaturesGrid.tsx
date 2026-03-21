import { motion } from "motion/react";
import { Shield, Zap, BarChart3, Headphones, Link2, Layers } from "lucide-react";

export function FeaturesGrid() {
  const features = [
    {
      icon: Shield,
      title: "Secure & Compliant",
      description: "Government-grade security with full compliance to data protection regulations and privacy standards.",
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-50"
    },
    {
      icon: Zap,
      title: "Rapid Deployment",
      description: "Streamlined implementation process reduces deployment time from months to weeks.",
      iconColor: "text-indigo-600",
      iconBg: "bg-indigo-50"
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Comprehensive dashboards and reporting tools for data-driven decision making.",
      iconColor: "text-amber-600",
      iconBg: "bg-amber-50"
    },
    {
      icon: Headphones,
      title: "Dedicated Support",
      description: "24/7 expert support team and field officers to assist you at every stage.",
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-50"
    },
    {
      icon: Link2,
      title: "Seamless Integration",
      description: "Easy integration with existing government systems and third-party platforms.",
      iconColor: "text-purple-600",
      iconBg: "bg-purple-50"
    },
    {
      icon: Layers,
      title: "Scalable Architecture",
      description: "Built to handle enterprise-scale operations with multi-level verification processes.",
      iconColor: "text-amber-600",
      iconBg: "bg-amber-50"
    }
  ];

  return (
    <section className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Very subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/30 to-white" />
      
      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-3 sm:space-y-4 mb-10 sm:mb-12 lg:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white border border-gray-200 rounded-full shadow-sm">
            <div className="w-2 h-2 bg-indigo-600 rounded-full" />
            <span className="text-xs sm:text-sm font-medium text-gray-700">
              Why Orbis Systems
            </span>
          </div>
          
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

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              {/* Card */}
              <div className="relative h-full bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300">
                {/* Small icon */}
                <div className="mb-4 sm:mb-5">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 ${feature.iconBg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${feature.iconColor}`} strokeWidth={2} />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2 sm:space-y-3">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}