"use client";

import { motion } from 'framer-motion';
import { FaCalendarAlt } from 'react-icons/fa';
import { Section } from './Section';

interface ComingSoonProps {
  title?: string;
  message: string;
}

export const ComingSoon = ({ title = "Coming Soon", message }: ComingSoonProps) => {
  return (
    <Section>
      <motion.div
        className="mx-auto max-w-2xl text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="rounded-xl border border-gray-200 bg-white p-12 shadow-lg">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <FaCalendarAlt className="mx-auto h-16 w-16 text-indigo-400" />
          </motion.div>
          
          <h2 className="mt-6 text-3xl font-bold text-gray-900">{title}</h2>
          <p className="mt-4 text-lg text-gray-600">
            {message}
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Please check back later for updates!
          </p>
        </div>
      </motion.div>
    </Section>
  );
};