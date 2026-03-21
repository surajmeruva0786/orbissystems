import React from "react";
import { motion } from "motion/react";

interface RainbowBadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function RainbowBadge({ children, className = "" }: RainbowBadgeProps) {
  return (
    <div className={`relative inline-flex items-center ${className}`}>
      {/* Animated rainbow border */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-60 blur-[2px]"
        animate={{
          background: [
            "linear-gradient(90deg, #FF6B6B, #4ECDC4, #45B7D1, #96CEB4, #FFEAA7, #DFE6E9, #FF6B6B)",
            "linear-gradient(180deg, #4ECDC4, #45B7D1, #96CEB4, #FFEAA7, #DFE6E9, #FF6B6B, #4ECDC4)",
            "linear-gradient(270deg, #45B7D1, #96CEB4, #FFEAA7, #DFE6E9, #FF6B6B, #4ECDC4, #45B7D1)",
            "linear-gradient(360deg, #96CEB4, #FFEAA7, #DFE6E9, #FF6B6B, #4ECDC4, #45B7D1, #96CEB4)",
            "linear-gradient(90deg, #FF6B6B, #4ECDC4, #45B7D1, #96CEB4, #FFEAA7, #DFE6E9, #FF6B6B)",
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Static background with slight padding to show rainbow border */}
      <div className="relative bg-white rounded-full p-[0.5px]">
        <div className="bg-white rounded-full">
          {children}
        </div>
      </div>
    </div>
  );
}