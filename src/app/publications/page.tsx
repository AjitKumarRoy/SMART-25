// FILE: src/app/publications/page.tsx
"use client"; // Required for client-side interactivity and Framer Motion

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiExternalLink, FiDownload } from "react-icons/fi"; // Icons for external link and download

// Import your publications data
import publicationsData from "@/data/publications/publications.json";
import { CallToActionSection } from "@/components/homePage/CallToActionSection"; // Assuming you want to reuse this


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
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function PublicationsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-jakarta">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 md:py-32 bg-gradient-to-br from-teal-50 to-cyan-100 dark:from-gray-900 dark:to-gray-800 text-center">
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
            Our Published Works
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl max-w-3xl mx-auto opacity-90 text-gray-700 dark:text-gray-300"
          >
            Explore the latest scientific contributions and breakthroughs from the Advanced Materials and Data Computing Group.
          </motion.p>
        </motion.div>
        {/* Subtle background pattern/shape for premium feel */}
        <div className="absolute inset-0 z-0 opacity-10 dark:opacity-5">
          <svg className="w-full h-full" fill="none" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="pattern-dots" x="0" y="0" width=".5" height=".5" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse">
                <circle id="pattern-dot" cx="2" cy="2" r="1" fill="currentColor"></circle>
              </pattern>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-dots)"></rect>
          </svg>
        </div>
      </section>

      {/* Publications Grid Section */}
      <section className="py-20 px-6 bg-white dark:bg-gray-900">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          className="max-w-6xl mx-auto text-center"
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-12 text-gray-900 dark:text-gray-100">
            Recent Publications
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {publicationsData.map((pub) => (
              <motion.div
                key={pub.id}
                variants={cardVariants}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col"
              >
                {/* Optional Image for Publication */}
                {pub.imageUrl && (
                  <div className="relative w-full h-48 sm:h-56 overflow-hidden">
                    <Image
                      src={pub.imageUrl}
                      alt={pub.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: 'cover' }}
                      className="transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                )}
                
                <div className="p-6 text-left flex-grow flex flex-col">
                  {pub.type && (
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-2">
                      {pub.type}
                    </span>
                  )}
                  <h3 className="text-xl font-bold mb-2 text-teal-700 dark:text-teal-300 leading-tight">
                    {pub.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 italic">
                    {pub.authors.join(", ")}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs mb-3">
                    {pub.journalOrConference} ({pub.year})
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-4 flex-grow">
                    {pub.abstract}
                  </p>

                  <div className="mt-auto flex flex-wrap gap-3 pt-2">
                    {pub.link && (
                      <Link
                        href={pub.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 dark:text-blue-400 font-semibold text-sm hover:underline hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
                      >
                        View Publication <FiExternalLink className="ml-1 text-base" />
                      </Link>
                    )}
                    {pub.pdfLink && (
                      <Link
                        href={pub.pdfLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-purple-600 dark:text-purple-400 font-semibold text-sm hover:underline hover:text-purple-700 dark:hover:text-purple-300 transition-colors duration-200"
                      >
                        Download PDF <FiDownload className="ml-1 text-base" />
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Optional: Add a general description about publication goals */}
      <section className="py-20 px-6 bg-gray-100 dark:bg-gray-950">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">
            Our Commitment to Open Science
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
            We are dedicated to disseminating our research findings widely to foster collaboration and accelerate scientific progress. Our publications reflect our rigorous methodology and commitment to impactful contributions across various disciplines.
          </motion.p>
        </motion.div>
      </section>

      {/* Re-use the existing CallToActionSection */}
      <CallToActionSection />
    </div>
  );
}