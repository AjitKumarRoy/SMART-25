"use client";
import { motion } from 'framer-motion';

// STEP 1: Update the interface to accept all standard HTML attributes
interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
}

// STEP 2: Collect all other props into a '...rest' variable
export const Section = ({ children, className = '', ...rest }: SectionProps) => {
  return (
    <motion.section
      className={`w-full px-4 py-16 md:px-8 md:py-24 lg:py-28 ${className}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      {...rest} // And apply them here. This will add your id="faq".
    >
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </motion.section>
  );
};