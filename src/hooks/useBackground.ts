import { useState, useEffect } from 'react';
import { backgrounds } from '../data/backgrounds';

export function useBackground() {
  const [currentBg, setCurrentBg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 60000); // Change every minute

    return () => clearInterval(interval);
  }, []);

  return backgrounds[currentBg];
}