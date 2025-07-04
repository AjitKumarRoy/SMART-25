"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Tab } from "@headlessui/react";
import { FaBullhorn, FaTags, FaArrowRight } from "react-icons/fa6"; // Using Fa6 for modern icons

// Import data
import announcementsData from "@/data/announcements.json"; // Renamed to avoid conflict
import recruitmentsData from "@/data/recruitments.json"; // Renamed to avoid conflict

interface AnnouncementItem {
  id: number;
  title: string;
  link: string;
  date?: string; // date is now required for 'New' tag logic
}

interface RecruitmentItem {
  id: number;
  title: string;
  link: string;
}

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, // Stagger children for a nice reveal
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
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

// Helper function to check if an item is new (within the last 7 days)
const isItemNew = (dateString: string | undefined): boolean => {
  if (!dateString) return false;
  const itemDate = new Date(dateString);
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  // Compare timestamps. itemDate > sevenDaysAgo means it's newer than 7 days ago.
  return itemDate.getTime() > sevenDaysAgo.getTime();
};

export function AnnouncementRecruitment() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Process data for Announcements: reverse, add isNew
  const processedAnnouncements = useMemo(() => {
    return (announcementsData as AnnouncementItem[])
      .map((item) => ({
        ...item,
        isNew: isItemNew(item.date),
      }))
      .sort((a, b) => {
        const dateA = a.date ? new Date(a.date).getTime() : 0;
        const dateB = b.date ? new Date(b.date).getTime() : 0;
        return dateB - dateA; // For descending order (newest first)
      });
  }, [announcementsData]);

  // Process data for Recruitments: reverse
  const processedRecruitments = useMemo(() => {
    return (recruitmentsData as RecruitmentItem[]).slice().reverse();
  }, [recruitmentsData]);

  const tabs = [
    { name: "Announcements", icon: FaBullhorn, data: processedAnnouncements },
    { name: "Recruitment", icon: FaTags, data: processedRecruitments },
  ];

  // Calculate the animation duration based on the number of items
  // This makes the scroll speed relatively consistent regardless of item count
  const calculateAnimationDuration = (itemCount: number) => {
    // You might want to adjust these numbers for desired speed
    const minDuration = 20; // Minimum duration in seconds
    const durationPerItem = 3; // Seconds per item
    return `${Math.max(minDuration, itemCount * durationPerItem)}s`;
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={listVariants}
      className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-16 rounded-3xl shadow-xl overflow-hidden relative"
    >
      {/* Background blobs for visual interest */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <Tab.List className="flex space-x-1 rounded-full bg-white dark:bg-gray-800 p-1 shadow-lg max-w-md mx-auto mb-10">
            {tabs.map((tab, idx) => {
              const TabIcon = tab.icon;
              return (
                <Tab
                  key={tab.name}
                  className={({ selected }) =>
                    `w-full py-2.5 text-lg font-medium leading-5 rounded-full
                    focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60
                    transition-all duration-300 ease-in-out
                    ${selected
                      ? "bg-blue-600 text-white shadow-md transform scale-105"
                      : "text-blue-700 dark:text-blue-300 hover:bg-blue-100 hover:text-blue-800 dark:hover:bg-gray-700 dark:hover:text-blue-200"
                    }`
                  }
                >
                  <div className="flex items-center justify-center gap-2">
                    <TabIcon className="text-xl" />
                    <span>{tab.name}</span>
                  </div>
                </Tab>
              );
            })}
          </Tab.List>

          {/* Fixed Width & Height Container for Tab Panels */}
          <Tab.Panels className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100 dark:border-gray-700 max-w-2xl mx-auto h-96">
            {tabs.map((tab, idx) => (
              <Tab.Panel
                key={idx}
                className="focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60 h-full flex flex-col"
              >
                {tab.data.length > 0 ? (
                  // Scrolling Container for the list (takes remaining height)
                  <div className="relative flex-grow overflow-hidden rounded-lg">
                    <motion.ul
                      variants={listVariants}
                      initial="hidden"
                      animate="visible"
                      // Apply the custom CSS class for animation
                      className="space-y-4 animate-scrollUp absolute top-0 left-0 w-full"
                      style={{
                        // Set the animation duration dynamically
                        animationDuration: calculateAnimationDuration(tab.data.length),
                        paddingBottom: '100%', // Crucial for seamless looping
                      }}
                    >
                      {/* Duplicate content for seamless scrolling loop */}
                      {[...tab.data, ...tab.data].map((item: AnnouncementItem | RecruitmentItem, itemIndex) => (
                        <motion.li
                          key={`${item.id}-${itemIndex}`} // Unique key for duplicated items
                          variants={itemVariants}
                          className="group flex items-start gap-3 p-4 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-200 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                        >
                          <span className="flex-shrink-0 text-blue-600 dark:text-blue-400 mt-1">
                            <FaBullhorn className="text-lg" /> {/* Generic icon for list items */}
                          </span>
                          <Link href={item.link} target="_blank" rel="noopener noreferrer" className="flex-grow">
                            <p className="text-lg font-medium text-gray-800 dark:text-gray-200 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-200">
                              {item.title}
                              {(tab.name === "Announcements" && (item as AnnouncementItem).isNew) && (
                                <span className="ml-2 inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 animate-pulse">
                                  New
                                </span>
                              )}
                            </p>
                            {(item as AnnouncementItem).date && (
                              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                Published: {(item as AnnouncementItem).date}
                              </p>
                            )}
                          </Link>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </div>
                ) : (
                  <motion.li variants={itemVariants} className="text-center text-gray-500 dark:text-gray-400 p-8">
                    No items available at the moment. Please check back later!
                  </motion.li>
                )}
                {/* View All Link at the bottom */}
                <div className="text-center mt-8">
                  <Link href={`/${tab.name.toLowerCase()}`} className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300">
                    View All {tab.name} <FaArrowRight className="ml-2 -mr-1" />
                  </Link>
                </div>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </motion.section>
  );
}