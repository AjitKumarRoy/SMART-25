"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';
import { Section } from '@/components/ui/Section';
import faqData from '@/data/homePage/faq.json';

export const FaqSection = () => {
  // State to track the currently open FAQ item index
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Function to toggle the FAQ item
  const handleToggle = (index: number) => {
    // If the clicked item is already open, close it. Otherwise, open the new one.
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Section id="faq" className="bg-white">
      <div  className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        {/* Left Column: Title and Description */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-gray-600">
            Have questions? We&apos;ve got answers. If you can&apos;t find what you&apos;re looking for, feel free to contact us directly.
          </p>
        </motion.div>

        {/* Right Column: Accordion */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {faqData.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div key={index} className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50 transition-all duration-300">
                  <button
                    onClick={() => handleToggle(index)}
                    className="flex w-full items-center justify-between p-5 text-left font-medium text-gray-800 transition-colors hover:bg-gray-100 focus:outline-none"
                  >
                    {/* Updated question style */}
                    <span className="text-lg font-semibold">{faq.question}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <FaChevronDown className="h-5 w-5 text-indigo-500" />
                    </motion.span>
                  </button>

                  {/* The answer panel with smooth expand/collapse animation */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1, transition: { height: { duration: 0.4, ease: "easeInOut" }, opacity: { duration: 0.25, delay: 0.15 } } }}
                        exit={{ height: 0, opacity: 0, transition: { height: { duration: 0.4, ease: "easeInOut" }, opacity: { duration: 0.25 } } }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-2 text-gray-600">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
};