// FILE: src/app/news-events/page.tsx
"use client"; // This page uses client-side interactivity (useState, useMemo, Framer Motion)

import { useState, useMemo } from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import {
  FiExternalLink,
  FiCalendar,
  FiMapPin,
  FiInfo,
  FiFileText,
  FiBriefcase,
} from "react-icons/fi";
import { format, isAfter, subDays } from "date-fns";

// Import your ALL-IN-ONE consolidated news data (for general news/announcements)
import allUpdates from "@/data/notices.json";


import { CallToActionSection } from "@/components/sections/CallToActionSection";

// --- Type Definition for Clarity ---
interface UpdateItem {
  id: string;
  title: string;
  date: string;
  link: string | null;
  type: "Announcement" | "Event" | "Recruitment" | "News";
  location: string | null;
  description: string | null;
}

// --- Animation Variants (Consistent with previous pages) ---
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

// Helper function to check if an item is "new" based on its date
const isNewItem = (itemDate: string): boolean => {
  const sevenDaysAgo = subDays(new Date(), 7);
  const itemParsedDate = new Date(itemDate);
  return isAfter(itemParsedDate, sevenDaysAgo) && itemParsedDate <= new Date();
};

export default function NewsEventsPage() {
  const [filter, setFilter] = useState("All");

  // Memoize filtered and sorted general updates (News, Announcements, Recruitment)
  const filteredAndSortedGeneralUpdates = useMemo(() => {
    let currentUpdates: UpdateItem[] = [...allUpdates];

    // Filter out "Events" type if it's "All" because we have a dedicated events section
    // Or, apply the specific filter
    if (filter !== "All") {
      currentUpdates = currentUpdates.filter((item) => item.type === filter);
    } else {
        // If "All" is selected, exclude "Event" types from this main list
        // as they are covered in the dedicated section.
        currentUpdates = currentUpdates.filter((item) => item.type !== "Event");
    }

    // Sort past/current items by most recent first
    currentUpdates.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime(); // Descending sort (newest first)
    });

    return currentUpdates;
  }, [filter]);



  // Helper to get the correct icon based on type
  const getTypeIcon = (type: UpdateItem["type"]) => {
    switch (type) {
      case "Announcement":
        return <FiInfo className="text-purple-600 dark:text-purple-300" />;
      case "Event":
        return <FiCalendar className="text-green-600 dark:text-green-300" />;
      case "Recruitment":
        return <FiBriefcase className="text-blue-600 dark:text-blue-300" />;
      case "News":
        return <FiFileText className="text-orange-600 dark:text-orange-300" />;
      default:
        return <FiInfo />;
    }
  };

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
            className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight text-blue-800 dark:text-blue-300"
          >
            News & Events
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl max-w-3xl mx-auto opacity-90"
          >
            Stay updated with our latest announcements, upcoming events, and important news.
          </motion.p>
        </motion.div>
        {/* Subtle background pattern/shape for premium feel */}
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

    
      {/* Latest News & Announcements Section */}
      <section className="py-20 px-6 bg-white dark:bg-gray-900">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-800 dark:text-blue-300">
            Latest News & Announcements
          </h2>
          {/* Filter Buttons for general updates */}
          <div className="flex justify-center flex-wrap mb-12 gap-4">
            {["All", "News", "Announcement", "Recruitment", "Event"].map((category) => ( 
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  filter === category
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-200 text-gray-800 hover:bg-blue-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* General Updates List */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainerVariants}
            className="space-y-6"
          >
            {filteredAndSortedGeneralUpdates.map((item) => (
              <motion.div
                key={item.id}
                variants={listItemVariants}
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700 flex flex-col md:flex-row items-start md:items-center justify-between"
              >
                <div className="flex-grow mb-4 md:mb-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-semibold flex items-center gap-1 ${
                        item.type === "Announcement"
                          ? "bg-purple-100 text-purple-800 dark:bg-purple-700 dark:text-purple-100"
                          : item.type === "Event" // Event items should ideally not appear here due to filter
                          ? "bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100"
                          : item.type === "Recruitment"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-100"
                          : "bg-orange-100 text-orange-800 dark:bg-orange-700 dark:text-orange-100" // For general News
                      }`}
                    >
                      {getTypeIcon(item.type)} {item.type}
                    </span>
                    {isNewItem(item.date) && (
                      <span className="bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold animate-pulse">
                        NEW
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-1 text-blue-700 dark:text-blue-300 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                    {item.description}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm flex items-center gap-1">
                    <FiCalendar className="inline-block mr-1 text-base" />
                    {format(new Date(item.date), "PPP")}
                    {item.location && (
                      <span className="ml-4 flex items-center gap-1">
                        <FiMapPin className="inline-block text-base" />
                        {item.location}
                      </span>
                    )}
                  </p>
                </div>

                {item.link && (
                  <Link
                    href={item.link}
                    target={
                      item.link.startsWith("/") || item.link.startsWith("#")
                        ? "_self"
                        : "_blank"
                    }
                    rel={
                      item.link.startsWith("/") || item.link.startsWith("#")
                        ? ""
                        : "noopener noreferrer"
                    }
                    className="flex-shrink-0 px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200 flex items-center gap-2"
                  >
                    View Details
                    <FiExternalLink className="text-base" />
                  </Link>
                )}
                {!item.link && (
                  <div className="flex-shrink-0 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg font-semibold cursor-not-allowed flex items-center gap-2 dark:bg-gray-700 dark:text-gray-300">
                    No Link Available <FiInfo className="text-base" />
                  </div>
                )}
              </motion.div>
            ))}
            {filteredAndSortedGeneralUpdates.length === 0 && (
              <motion.p
                initial="hidden"
                animate="visible"
                variants={itemVariants}
                className="text-center text-gray-600 dark:text-gray-400 text-lg py-10"
              >
                No items found for this category.
              </motion.p>
            )}
          </motion.div>
        </motion.div>
      </section>

      {/* Re-use the existing CallToActionSection */}
      <CallToActionSection />
    </div>
  );
}