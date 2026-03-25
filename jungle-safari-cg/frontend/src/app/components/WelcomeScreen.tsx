import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import welcomeAnimation from "../../imports/pasted_text/welcome.json";

interface WelcomeScreenProps {
  onComplete: () => void;
}

export function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onComplete, 800);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 bg-white flex items-center justify-center z-50 transition-opacity duration-700 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Enlarged Welcome Animation */}
      <div className="w-[800px] max-w-[90vw]">
        <Lottie animationData={welcomeAnimation} loop={true} />
      </div>
    </div>
  );
}