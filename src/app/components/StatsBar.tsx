import { motion } from "motion/react";
import { Shield, Zap } from "lucide-react";

export function StatsBar() {
  const stats = [
    {
      icon: Shield,
      number: "99.9%",
      label: "Uptime Guarantee",
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-50"
    },
    {
      icon: Zap,
      number: "24/7",
      label: "Premium Support",
      iconColor: "text-indigo-600",
      iconBg: "bg-indigo-50"
    }
  ];

  return (
    <section className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              {/* Card */}
              <div className="relative bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300">
                <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
                  {/* Small icon */}
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 ${stat.iconBg} rounded-xl flex items-center justify-center`}>
                    <stat.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.iconColor}`} strokeWidth={2} />
                  </div>
                  
                  {/* Number */}
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                    {stat.number}
                  </div>
                  
                  {/* Label */}
                  <div className="text-sm sm:text-base text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}