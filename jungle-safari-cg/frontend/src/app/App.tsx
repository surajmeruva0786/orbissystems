import { useState } from 'react';
import { RouterProvider } from 'react-router';
import { router } from './routes';
import { WelcomeScreen } from './components/WelcomeScreen';
import ClickSpark from './components/ClickSpark';

export default function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  if (showWelcome) {
    return (
      <ClickSpark sparkColor="#7C3AED" sparkRadius={25} sparkCount={8} duration={600}>
        <WelcomeScreen onComplete={() => setShowWelcome(false)} />
      </ClickSpark>
    );
  }

  return (
    <ClickSpark sparkColor="#7C3AED" sparkRadius={25} sparkCount={8} duration={600}>
      <RouterProvider router={router} />
    </ClickSpark>
  );
}
