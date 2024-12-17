import { useState, useEffect } from 'react';
import { quotes } from '../data/quotes';

export function useQuotes() {
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 60000); // Change every minute

    return () => clearInterval(interval);
  }, []);

  return quotes[currentQuote];
}