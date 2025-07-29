"use client";

import { motion } from 'framer-motion';
import { FaTrophy } from 'react-icons/fa';
import { Section } from '@/components/ui/Section';
import { SectionTitle } from '@/components/ui/SectionTitle'; 
import aboutData from '@/data/aboutPage/aboutPage.json';

export const StudentAwardSection = () => {
  return (
    // THE FIX: Add 'overflow-hidden' to the Section component
    <Section className="bg-indigo-50 overflow-hidden">
      <SectionTitle>{aboutData.award.title}</SectionTitle>
      
      <div className="mt-12 grid grid-cols-1 items-center gap-12 lg:grid-cols-3">
        
        {/* Left Column: Animated Trophy Icon */}
        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              filter: [
                'drop-shadow(0 0 10px rgba(236, 178, 33, 0.4))',
                'drop-shadow(0 0 20px rgba(236, 178, 33, 0.7))',
                'drop-shadow(0 0 10px rgba(236, 178, 33, 0.4))'
              ],
            }}
            transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
            }}
          >
            <FaTrophy className="h-40 w-40 text-yellow-500" />
          </motion.div>
        </motion.div>

        {/* Right Column: Text Content */}
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-lg leading-8 text-gray-700">
            {aboutData.award.description}
          </p>
          <p className="mt-6 rounded-lg border-l-4 border-yellow-500 bg-yellow-50 p-4 font-semibold text-yellow-800">
            {aboutData.award.prize}
          </p>
        </motion.div>
      </div>
    </Section>
  );
};