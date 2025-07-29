"use client";
import { motion } from 'framer-motion';

interface ScrollingNotificationProps {
  text: string;
}

export const ScrollingNotification = ({ text }: ScrollingNotificationProps) => {
  const duplicatedText = Array(3).fill(text).join(' \u00A0\u00A0\u00A0•\u00A0\u00A0\u00A0 ');

  return (
    <div className="bg-indigo-600 text-white py-3 overflow-hidden whitespace-nowrap">
      <motion.div
        className="text-lg font-semibold tracking-wide"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          ease: 'linear',
          duration: 10, // Slower duration for a more premium feel
          repeat: Infinity,
        }}
      >
        {duplicatedText}
      </motion.div>
    </div>
  );
};