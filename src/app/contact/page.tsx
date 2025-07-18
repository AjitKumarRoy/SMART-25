// FILE: src/app/contact/page.tsx
"use client"; // This page uses client-side interactivity (useState, useMemo, Framer Motion)

import { motion, Variants } from "framer-motion";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiSend,
  FiExternalLink,
} from "react-icons/fi";
import { CallToActionSection } from "@/components/homePage/CallToActionSection";


const locationMap = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29750.42555589095!2d81.28712141562498!3d21.239651400000014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a293d920dfc4355%3A0x62d2d02080f3e3b2!2sIIT%20Bhilai%20Gate%20Number%202%3A%20Kohka%20Gate!5e0!3m2!1sen!2sin!4v1752823431662!5m2!1sen!2sin";

// --- Animation Variants (Consistent with other pages) ---
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", damping: 10, stiffness: 100, delay: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const staggerContainerVariants: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const listItemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-jakarta">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 md:py-32 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={sectionVariants}
          className="max-w-5xl mx-auto px-6 relative z-10"
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight text-gray-900 dark:text-gray-100"
          >
            Get In Touch
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl max-w-3xl mx-auto opacity-90 text-gray-700 dark:text-gray-300"
          >
            We&apos;re here to help! Reach out to us through the form or find our contact details below.
          </motion.p>
        </motion.div>
        {/* Subtle background pattern/shape */}
        <div className="absolute inset-0 z-0 opacity-10 dark:opacity-5">
          <svg
            className="w-full h-full"
            fill="none"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <pattern
                id="pattern-zigzag"
                x="0"
                y="0"
                width=".2"
                height=".2"
                patternUnits="userSpaceOnUse"
                patternContentUnits="userSpaceOnUse"
              >
                <path
                  d="M 0 0 L 10 10 L 0 20 L 10 30 L 0 40 Z"
                  stroke="currentColor"
                  strokeWidth="1"
                  fill="none"
                ></path>
              </pattern>
            </defs>
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="url(#pattern-zigzag)"
            ></rect>
          </svg>
        </div>
      </section>

      {/* Contact Details Section */}
      <section className="py-20 px-6 bg-white dark:bg-gray-900">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8"
        >
          {/* General Inquiries */}
          <motion.div
            variants={listItemVariants}
            className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700 text-center"
          >
            <FiMail className="text-5xl text-blue-600 dark:text-blue-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-3 text-blue-800 dark:text-blue-300">General Inquiries</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              For all general questions about the institute.
            </p>
            <a
              href="mailto:contact@iitbhilai.ac.in"
              className="text-blue-600 dark:text-blue-400 hover:underline font-semibold flex items-center justify-center gap-2"
            >
              contact@iitbhilai.ac.in <FiExternalLink />
            </a>
            <p className="text-gray-700 dark:text-gray-300 mt-2 flex items-center justify-center gap-2">
              <FiPhone /> +91-77123-55000
            </p>
          </motion.div>

          
        </motion.div>
      </section>



        {/* Contact Form Section */}
      <section className="py-20 px-6 bg-white dark:bg-gray-900">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-800 dark:text-blue-300">
            Send Us A Message
          </h2>
          <motion.form
            variants={staggerContainerVariants}
            className="space-y-6 bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
          >
            <motion.div variants={itemVariants}>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="John Doe"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400 transition-colors"
                required
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400 transition-colors"
                required
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Subject (Optional)
              </label>
              <input
                type="text"
                id="subject"
                placeholder="Inquiry about admissions"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400 transition-colors"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Message
              </label>
              <textarea
                id="message"
                placeholder="Type your message here..."
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400 transition-colors resize-y"
                required
              ></textarea>
            </motion.div>

            <motion.button
              type="submit"
              variants={itemVariants}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-all shadow-md hover:shadow-lg"
            >
              Send Message <FiSend className="text-lg" />
            </motion.button>
          </motion.form>
          <motion.p
            variants={itemVariants}
            className="text-center text-gray-600 dark:text-gray-400 text-sm mt-8"
          >
            We aim to respond to all inquiries within 2-3 business days.
          </motion.p>
        </motion.div>
      </section>



      {/* Campus Location & Map Section */}
      <section className="py-20 px-6 bg-gray-100 dark:bg-gray-900">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">
            Our Campus Location
          </h2>
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center gap-4 mb-4">
              <FiMapPin className="text-blue-600 dark:text-blue-400 text-3xl" />
              <div>
                <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Indian Institute of Technology Bhilai
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Office: 414B, Bhardwaj Building, Academic Zone, IIT Bhilai
                  <br />
                  Kutelabhata, Durg - 491 002, Chhattisgarh, INDIA
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <FiClock className="text-blue-600 dark:text-blue-400 text-3xl" />
              <div>
                <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">Office Hours</p>
                <p className="text-gray-600 dark:text-gray-400">
                  Monday - Friday: 9:00 AM - 5:00 PM IST
                </p>
              </div>
            </div>

            {/* Embedded Google Map (Placeholder) */}
            <div className="aspect-video w-full rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600 shadow-inner">
              <iframe
                src={locationMap}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false} // Changed to false as full screen embedding often causes issues
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="IIT Bhilai Campus Location"
              ></iframe>
            </div>
          </motion.div>
        </motion.div>
      </section>

    

      {/* Re-use the existing CallToActionSection */}
      <CallToActionSection />
    </div>
  );
}