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
  date: string; // e.g., "Oct 31, 2025" - this is the string from JSON
  link: string;
  location?: string; // Optional field for location
  // These will be added dynamically after parsing:
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

export function UpcomingEvents() {
  // Process and sort events
  const processedEvents = useMemo(() => {
    // Current time is Friday, July 4, 2025 at 10:50:26 PM IST.
    // Use this fixed date for filtering if you want consistent results for testing,
    // otherwise use `new Date()` for the actual current date.
    const now = new Date('2025-07-04T22:50:26');

    return (upcomingEventsData as EventItem[])
      .map(event => ({
        ...event,
        parsedDate: parseEventDate(event.date),
      }))
      // Filter out past events (keep events from today onwards)
      .filter(event => event.parsedDate && event.parsedDate.getTime() >= now.getTime())
      .sort((a, b) => {
        // Sort chronologically (earliest first)
        const dateA = a.parsedDate ? a.parsedDate.getTime() : 0;
        const dateB = b.parsedDate ? b.parsedDate.getTime() : 0;
        return dateA - dateB;
      });
  }, []);

  // Calculate the animation duration based on the number of items
  const calculateAnimationDuration = (itemCount: number) => {
    const minDuration = 20;
    const durationPerItem = 3;
    return `${Math.max(minDuration, itemCount * durationPerItem)}s`;
  };

  return (
    <>
      {/* Main content container with fixed width/height and styling */}
      <div className="max-w-4xl mx-auto relative z-10 p-4 px-0 rounded-2xl shadow-xl bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 border border-gray-100 dark:border-gray-700
                  w-full sm:w-[calc(100%-2rem)] md:w-full"> {/* Adjusted width for mobile and tablet */}

        {/* Header and navigation controls */}
        <div className="flex items-center justify-between mb-8 px-4">
          <div className="flex items-center">
            <FaCalendar className="text-3xl sm:text-4xl text-blue-600 dark:text-blue-400 mr-4" />
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mr-4"> {/* Adjusted font size */}
              Upcoming Events
            </h2>
            <div className="w-12 sm:w-16 h-1 bg-blue-600 dark:bg-blue-400 rounded-full"></div> {/* Underline */}
          </div>
        </div>

        {/* Scrolling Event List Container: fixed height, overflow hidden, and scrolling content */}
        <div className="relative h-96 overflow-hidden rounded-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-2 sm:p-4 shadow-inner"> {/* Adjusted padding */}
          {processedEvents.length > 0 ? (
            <motion.ul
              variants={listVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4 animate-scrollUp absolute top-0 left-0 w-full"
              style={{
                animationDuration: calculateAnimationDuration(processedEvents.length),
                paddingBottom: '100%',
              }}
            >
              {/* Duplicate content for seamless scrolling loop */}
              {[...processedEvents, ...processedEvents].map((event: EventItem, index) => {
                const { monthDay, year } = getFormattedDateParts(event.date);
                const isCurrentNew = event.parsedDate ? isEventNew(event.parsedDate) : false;

                return (
                  <motion.li
                    key={`${event.id}-${index}`}
                    variants={itemVariants}
                    className="flex items-start gap-4 px-0.5 py-4 sm:p-4 rounded-lg bg-white dark:bg-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200" // Adjusted padding here
                  >
                    {/* Date Block */}
                    <div className="flex-shrink-0 w-20 sm:w-24 bg-amber-800 text-white rounded-lg p-2 sm:p-3 text-center shadow-md"> {/* Changed to amber-800 and adjusted width/padding */}
                      <p className="text-base sm:text-lg font-bold leading-none">{monthDay}</p>
                      <p className="text-xs sm:text-sm">{year}</p>
                    </div>

                    {/* Event Details */}
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
            <Link href="/events" className="inline-flex items-center px-6 py-2 sm:px-8 sm:py-2 border border-transparent text-sm sm:text-base font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300"> {/* Adjusted padding and font size */}
              View All Events <FaArrowRight className="ml-2 sm:ml-3 text-base sm:text-xl" /> {/* Adjusted icon size */}
            </Link>
          </div>
        )}
      </div>
    </>
  );
}