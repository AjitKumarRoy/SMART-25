// FILE: src/components/sections/CallToActionSection.tsx
"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

// Animation Variants (from original page.tsx)
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", damping: 10, stiffness: 100 },
  },
};

const buttonLeftVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { delay: 0.2, duration: 0.5 } },
};

const buttonRightVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { delay: 0.3, duration: 0.5 } },
};

export function CallToActionSection() {
  return (
    <section
      className="
        bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900
        py-20 px-6
        text-gray-900 dark:text-gray-100 text-center
      "
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={sectionVariants}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
          Join Us in Shaping the Future of Technology
        </h2>
        <p className="text-lg md:text-xl opacity-90 mb-10">
          Whether you are a prospective student, a collaborating researcher, or an industry partner,
          we invite you to explore opportunities with the AMDCG group.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <motion.div
            variants={buttonLeftVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Link
              href="/contact"
              className="
                bg-blue-600 text-white hover:bg-blue-700
                dark:bg-blue-500 dark:text-gray-900 dark:hover:bg-blue-400
                font-bold py-4 px-10 rounded-full text-lg shadow-lg hover:shadow-xl
                transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center gap-2
              "
            >
              Get in Touch <FiArrowRight />
            </Link>
          </motion.div>
          <motion.div
            variants={buttonRightVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Link
              href="/careers"
              className="
                border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white
                dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-gray-900
                font-bold py-4 px-10 rounded-full text-lg shadow-lg hover:shadow-xl
                transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center gap-2
              "
            >
              View Careers <FiArrowRight />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}