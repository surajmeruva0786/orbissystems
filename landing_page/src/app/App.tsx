import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LoadingScreen } from "./components/LoadingScreen";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { StatsBar } from "./components/StatsBar";
import { BentoFeatures } from "./components/BentoFeatures";
import { CTABanner } from "./components/CTABanner";
import { Footer } from "./components/Footer";
import ClickSpark from "./components/ClickSpark";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Wait for the full welcome animation to complete (animation is ~8.2 seconds)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  // Smooth scroll behavior
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loading" />}
      </AnimatePresence>

      {!isLoading && (
        <ClickSpark sparkCount={8} sparkRadius={25} duration={600}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-white"
          >
            <Navbar />
            <main>
              <HeroSection />
              <StatsBar />
              <BentoFeatures />
              <CTABanner />
            </main>
            <Footer />
          </motion.div>
        </ClickSpark>
      )}
    </>
  );
}