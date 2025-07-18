"use client";

import { useMemo } from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { FaCalendar, FaLocationDot, FaArrowRight } from "react-icons/fa6";

// Import data and helper functions
import upcomingEventsData from "@/data/homePage/upcomingEvents.json";
import { getFormattedDateParts, isEventNew, parseEventDate } from "@/utils/dateHelpers";

interface EventItem {
  id: number;
  title: string;
  date: string;
  link: string;
  location?: string;
  parsedDate?: Date;
  isNew?: boolean;
}

// Variants for the overall list container (ul)
const listVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

// Variants for individual list items (li)
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 120,
    },
  },
};

// Variants for the section container
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 10,
      stiffness: 100,
    },
  },
};

export function UpcomingEvents() {
  // Process and sort events
  const processedEvents = useMemo(() => {
    const now = new Date(); // Use real-time date
    return (upcomingEventsData as EventItem[])
      .map(event => ({
        ...event,
        parsedDate: parseEventDate(event.date),
      }))
      .filter(event => event.parsedDate && event.parsedDate.getTime() >= now.getTime())
      .sort((a, b) => {
        const dateA = a.parsedDate ? a.parsedDate.getTime() : 0;
        const dateB = b.parsedDate ? b.parsedDate.getTime() : 0;
        return dateA - dateB;
      });
  }, []);

  // Calculate animation duration based on item count
  const calculateAnimationDuration = (itemCount: number) => {
    const minDuration = 10; // Minimum 10s
    const durationPerItem = 5; // 5s per item
    return Math.max(minDuration, itemCount * durationPerItem);
  };

  // Debug: Log event count
  console.log("Upcoming events count:", processedEvents.length);

  return (
    <motion.div
      className="max-w-4xl mx-auto relative z-10 p-4 px-0 rounded-2xl shadow-xl bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 border border-gray-100 dark:border-gray-700 w-full sm:w-[calc(100%-2rem)] md:w-full"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.1 }}
    >
      {/* Header and navigation controls */}
      <div className="flex items-center justify-between mb-8 px-4">
        <div className="flex items-center">
          <FaCalendar className="text-3xl sm:text-4xl text-blue-600 dark:text-blue-400 mr-4" />
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mr-4">
            Upcoming Events
          </h2>
          <div className="w-12 sm:w-16 h-1 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
        </div>
      </div>

      {/* Scrolling Event List Container */}
      <div className="relative h-96 overflow-hidden rounded-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-2 sm:p-4 shadow-inner">
        {processedEvents.length > 0 ? (
          <motion.ul
            key={`events-${processedEvents.length}`} // Force re-render on data change
            className="space-y-4 w-full"
            initial={{ translateY: "100%" }}
            animate={{ translateY: "-100%" }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
              duration: calculateAnimationDuration(processedEvents.length),
            }}
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            variants={listVariants}
          >
            {processedEvents.map((event: EventItem) => {
              const { monthDay, year } = getFormattedDateParts(event.date);
              const isCurrentNew = event.parsedDate ? isEventNew(event.parsedDate) : false;

              return (
                <motion.li
                  key={event.id}
                  variants={itemVariants}
                  className="flex items-start gap-4 px-0.5 py-4 sm:p-4 rounded-lg bg-white dark:bg-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex-shrink-0 w-20 sm:w-24 bg-amber-800 text-white rounded-lg p-2 sm:p-3 text-center shadow-md">
                    <p className="text-base sm:text-lg font-bold leading-none">{monthDay}</p>
                    <p className="text-xs sm:text-sm">{year}</p>
                  </div>
                  <Link href={event.link} target="_blank" rel="noopener noreferrer" className="flex-grow group">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 mb-1">
                      {event.title}
                      {isCurrentNew && (
                        <span className="ml-2 inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 animate-pulse">
                          New
                        </span>
                      )}
                    </h3>
                    {event.location && (
                      <div className="flex items-center text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
                        <FaLocationDot className="mr-1" />
                        <span>{event.location}</span>
                      </div>
                    )}
                  </Link>
                </motion.li>
              );
            })}
          </motion.ul>
        ) : (
          <motion.div variants={itemVariants} className="text-center text-gray-500 dark:text-gray-400 p-8">
            No upcoming events scheduled at the moment. Please check back later!
          </motion.div>
        )}
      </div>

      {/* View All Button */}
      {processedEvents.length > 0 && (
        <div className="text-center mt-8">
          <Link
            href="/events"
            className="inline-flex items-center px-6 py-2 sm:px-8 sm:py-2 border border-transparent text-sm sm:text-base font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
          >
            View All Events <FaArrowRight className="ml-2 sm:ml-3 text-base sm:text-xl" />
          </Link>
        </div>
      )}
    </motion.div>
  );
}