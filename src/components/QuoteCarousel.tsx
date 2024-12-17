import React, { useEffect, useState } from 'react';
import { useQuotes } from '../hooks/useQuotes';
import { Quote } from 'lucide-react';

export function QuoteCarousel() {
  const quote = useQuotes();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, [quote]);

  return (
    <div className="fixed top-4 right-4 w-full max-w-sm transform transition-all duration-500 ease-in-out">
      <div className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      }`}>
        <Quote className="absolute -top-3 -left-3 w-8 h-8 text-blue-500 bg-white dark:bg-gray-800 rounded-full p-1" />
        <blockquote className="relative">
          <p className="text-lg font-medium text-gray-900 dark:text-white leading-relaxed">
            "{quote.text}"
          </p>
          <footer className="mt-3">
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              — {quote.author}
            </p>
          </footer>
        </blockquote>
      </div>
    </div>
  );
}