"use client";

import { motion } from 'framer-motion';
import { FaCalendarAlt } from 'react-icons/fa';
import { Section } from '@/components/ui/Section';
import datesData from '@/data/homePage/importantDates.json';

export const DatesTimelineSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <Section>
      <div className="mx-auto max-w-2xl">
        <motion.div
          className="relative border-l-2 border-indigo-200"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {datesData.map((item, index) => (
            <motion.div key={index} className="mb-10 ml-8" variants={itemVariants}>
              <span className="absolute -left-[11px] flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 ring-8 ring-white">
                <FaCalendarAlt className="h-3 w-3 text-white" />
              </span>
              <h3 className="text-xl font-bold text-gray-900">{item.event}</h3>
              <time className="block text-base font-semibold text-indigo-700">{item.date}</time>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
};