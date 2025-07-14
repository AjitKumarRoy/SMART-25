// FILE: src/app/news-events/page.tsx
"use client";

import { useState, useMemo } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  FiExternalLink,
  FiCalendar,
  FiMapPin,
  FiInfo,
  FiFileText,
  FiBriefcase,
  FiFilter,
  FiX,
} from "react-icons/fi";
import { format, isAfter, subDays } from "date-fns";

import rawAllUpdates from "@/data/news&events/notices.json";
const allUpdates: UpdateItem[] = rawAllUpdates as UpdateItem[];

import { CallToActionSection } from "@/components/homePage/CallToActionSection";

interface UpdateItem {
  id: string;
  title: string;
  date: string;
  link: string | null;
  type: "Announcement" | "Event" | "Recruitment" | "News";
  location: string | null;
  description: string | null;
}

type FilterCategory = UpdateItem["type"] | "All";

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

const filterDropdownVariants: Variants = {
  hidden: { opacity: 0, height: 0, transition: { duration: 0.3 } },
  visible: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
};

const isNewItem = (itemDate: string): boolean => {
  const sevenDaysAgo = subDays(new Date(), 7);
  const itemParsedDate = new Date(itemDate);
  return isAfter(itemParsedDate, sevenDaysAgo) && itemParsedDate <= new Date();
};

export default function NewsEventsPage() {
  const [filter, setFilter] = useState<FilterCategory>("All");
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  const handleFilterClick = (category: FilterCategory) => {
    setFilter(category);
    setIsFilterMenuOpen(false);
  };

  const filteredAndSortedGeneralUpdates = useMemo(() => {
    let currentUpdates: UpdateItem[] = [...allUpdates];

    if (filter !== "All") {
      currentUpdates = currentUpdates.filter((item) => item.type === (filter as UpdateItem["type"]));
    } else {
      // Show all items, including Events
      currentUpdates = [...allUpdates];
    }

    currentUpdates.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });

    return currentUpdates;
  }, [filter]);

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
            className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight text-gray-900 dark:text-gray-100"
          >
            News & Events
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl max-w-3xl mx-auto opacity-90 text-gray-700 dark:text-gray-300"
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
          viewport={{ once: true }}
          variants={sectionVariants}
          className="max-w-6xl mx-auto"
        >
          

          {/* Filter Buttons (Desktop) and Filter Icon (Mobile) */}
          <div className="mb-12">
            {/* Mobile Filter Button */}
            <div className="flex justify-center md:hidden mb-6">
              <button
                onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 transition-colors duration-300"
              >
                {isFilterMenuOpen ? <FiX /> : <FiFilter />}
                {isFilterMenuOpen ? "Close Filters" : "Filter by Type"}
              </button>
            </div>

            {/* Filter Buttons (Visible on md screens and up) */}
            <div className="hidden md:flex justify-center flex-wrap gap-4">
              {["All", "News", "Announcement", "Recruitment", "Event"].map((category) => (
                <button
                  key={category}
                  onClick={() => handleFilterClick(category as FilterCategory)}
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

            {/* Mobile Filter Dropdown (using AnimatePresence for exit animations) */}
            <AnimatePresence>
              {isFilterMenuOpen && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={filterDropdownVariants}
                  className="md:hidden mt-4 bg-gray-100 dark:bg-gray-850 p-4 rounded-lg shadow-inner border border-gray-200 dark:border-gray-700 overflow-hidden"
                >
                  <div className="flex flex-col space-y-3">
                    {["All", "News", "Announcement", "Recruitment", "Event"].map((category) => (
                      <button
                        key={category}
                        onClick={() => handleFilterClick(category as FilterCategory)}
                        className={`w-full text-left px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                          filter === category
                            ? "bg-blue-600 text-white shadow-md"
                            : "bg-white text-gray-800 hover:bg-blue-50 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
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
                          : item.type === "Event"
                          ? "bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100"
                          : item.type === "Recruitment"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-100"
                          : "bg-orange-100 text-orange-800 dark:bg-orange-700 dark:text-orange-100"
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