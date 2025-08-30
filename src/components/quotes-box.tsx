'use client';

import { useState, useEffect } from 'react';
import { farmingQuotes } from '@/lib/constants';
import { motion, AnimatePresence } from 'framer-motion';

export default function QuotesBox() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % farmingQuotes.length);
    }, 15000); // 15 seconds

    return () => clearInterval(intervalId);
  }, []);

  const currentQuote = farmingQuotes[currentIndex];

  return (
    <div className="p-6 my-8 rounded-lg bg-blue-500/10 border border-blue-500/20 shadow-md min-h-[100px] flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.p
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-center text-lg italic font-medium"
          style={{ color: '#2E7D32' }}
        >
          &ldquo;{currentQuote}&rdquo;
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
