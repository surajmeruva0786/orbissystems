import { motion } from "motion/react";
import { Mail, Phone, MapPin, Twitter, Linkedin, Github } from "lucide-react";
import orbisLogo from "../../imports/orbis-logo-light.svg";

export function Footer() {
  const footerLinks = {
    solutions: [
      "Government Solutions",
      "Enterprise Platforms",
      "Public Sector Tools",
      "Custom Development"
    ],
    company: [
      "About Us",
      "Our Team",
      "Careers",
      "Press & Media"
    ],
    resources: [
      "Documentation",
      "Case Studies",
      "Blog",
      "Support Center"
    ]
  };

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Github, href: "#", label: "GitHub" }
  ];

  return (
    <footer className="relative bg-gradient-to-b from-gray-50 to-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-8 mb-10 sm:mb-12">
          {/* Logo & Description */}
          <div className="lg:col-span-2 space-y-5 sm:space-y-6">
            <motion.div 
              className="flex items-center cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <img 
                src={orbisLogo} 
                alt="Orbis Systems" 
                className="h-10 sm:h-12 w-auto"
              />
            </motion.div>
            
            <p className="text-sm sm:text-base text-gray-600 max-w-sm leading-relaxed">
              Enterprise software solutions engineered for government and enterprise sectors. Ready to deliver impact through innovation.
            </p>
            
            <div className="space-y-2 sm:space-y-3">
              <motion.a 
                href="mailto:info@orbissystems.co.in"
                whileHover={{ x: 2 }}
                className="flex items-center gap-2 sm:gap-3 text-gray-600 hover:text-indigo-600 transition-colors group"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gray-100 group-hover:bg-indigo-50 rounded-lg flex items-center justify-center transition-colors">
                  <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <span className="text-xs sm:text-sm">info@orbissystems.co.in</span>
              </motion.a>
              
              <motion.a 
                href="tel:+918688034099"
                whileHover={{ x: 2 }}
                className="flex items-center gap-2 sm:gap-3 text-gray-600 hover:text-indigo-600 transition-colors group"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gray-100 group-hover:bg-indigo-50 rounded-lg flex items-center justify-center transition-colors">
                  <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <span className="text-xs sm:text-sm">+91 8688034099</span>
              </motion.a>
              
              <motion.div 
                whileHover={{ x: 2 }}
                className="flex items-center gap-2 sm:gap-3 text-gray-600 group"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gray-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <span className="text-xs sm:text-sm">Raipur, Chhattisgarh, India</span>
              </motion.div>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Solutions</h3>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.solutions.map((link, index) => (
                <li key={index}>
                  <motion.a 
                    href="#"
                    whileHover={{ x: 2 }}
                    className="text-xs sm:text-sm text-gray-600 hover:text-indigo-600 transition-colors inline-block"
                  >
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Company</h3>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <motion.a 
                    href="#"
                    whileHover={{ x: 2 }}
                    className="text-xs sm:text-sm text-gray-600 hover:text-indigo-600 transition-colors inline-block"
                  >
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Resources</h3>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <motion.a 
                    href="#"
                    whileHover={{ x: 2 }}
                    className="text-xs sm:text-sm text-gray-600 hover:text-indigo-600 transition-colors inline-block"
                  >
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
            <p className="text-xs sm:text-sm text-gray-500 text-center md:text-left">
              © 2026 Orbis Systems. All rights reserved.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-2 sm:gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 sm:w-9 sm:h-9 bg-gray-100 hover:bg-gradient-to-br hover:from-indigo-600 hover:to-purple-600 rounded-lg flex items-center justify-center text-gray-600 hover:text-white transition-all group"
                  aria-label={social.label}
                >
                  <social.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </motion.a>
              ))}
            </div>
            
            {/* Legal Links */}
            <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
              <motion.a 
                href="#"
                whileHover={{ y: -1 }}
                className="text-xs sm:text-sm text-gray-500 hover:text-indigo-600 transition-colors"
              >
                Privacy Policy
              </motion.a>
              <motion.a 
                href="#"
                whileHover={{ y: -1 }}
                className="text-xs sm:text-sm text-gray-500 hover:text-indigo-600 transition-colors"
              >
                Terms of Service
              </motion.a>
              <motion.a 
                href="#"
                whileHover={{ y: -1 }}
                className="text-xs sm:text-sm text-gray-500 hover:text-indigo-600 transition-colors"
              >
                Security
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}