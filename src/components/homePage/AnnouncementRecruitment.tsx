"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Tab } from "@headlessui/react";
import { FaBullhorn, FaTags, FaArrowRight } from "react-icons/fa6";

// Import data
import announcementsData from "@/data/homePage/announcements.json";
import recruitmentsData from "@/data/homePage/recruitments.json";

interface AnnouncementItem {
  id: number;
  title: string;
  link: string;
  date?: string;
  isNew?: boolean;
}

interface RecruitmentItem {
  id: number;
  title: string;
  link: string;
  isNew?: boolean;
}

// Animation variants
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

// Helper function to check if an item is new (within the last 7 days)
const isItemNew = (dateString: string | undefined): boolean => {
  if (!dateString) return false;
  const itemDate = new Date(dateString);
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  return itemDate.getTime() > sevenDaysAgo.getTime();
};

export function AnnouncementRecruitment() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Process data for Announcements: sort by date, add isNew
  const processedAnnouncements = useMemo(() => {
    return (announcementsData as AnnouncementItem[])
      .map((item) => ({
        ...item,
        isNew: isItemNew(item.date),
      }))
      .sort((a, b) => {
        const dateA = a.date ? new Date(a.date).getTime() : 0;
        const dateB = b.date ? new Date(b.date).getTime() : 0;
        return dateB - dateA; // Newest first
      });
  }, []);

  // Process data for Recruitments: reverse order
  const processedRecruitments = useMemo(() => {
    return (recruitmentsData as RecruitmentItem[])
      .map((item) => ({
        ...item,
        isNew: false,
      }))
      .slice()
      .reverse();
  }, []);

  const tabs = [
    { name: "Announcements", icon: FaBullhorn, data: processedAnnouncements, link: "/announcements" },
    { name: "Recruitment", icon: FaTags, data: processedRecruitments, link: "/recruitments" },
  ];

  // Calculate animation duration based on item count
  const calculateAnimationDuration = (itemCount: number) => {
    const minDuration = 10; // Minimum duration for smooth scrolling
    const durationPerItem = 5; // Seconds per item
    return Math.max(minDuration, itemCount * durationPerItem);
  };

  // Debug: Log item counts and tab changes
  console.log("Announcements count:", processedAnnouncements.length);
  console.log("Recruitments count:", processedRecruitments.length);
  console.log("Selected tab index:", selectedIndex);

  return (
    <motion.div
      className="max-w-4xl mx-auto relative z-10 p-4 px-0 rounded-2xl shadow-xl bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 border border-gray-100 dark:border-gray-700 w-full sm:w-[calc(100%-2rem)] md:w-full"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.1 }}
    >
      {/* Tab Group */}
      <Tab.Group selectedIndex={selectedIndex} onChange={(index) => {
        setSelectedIndex(index);
        console.log("Switched to tab:", tabs[index].name);
      }}>
        <Tab.List className="flex space-x-1 rounded-full bg-white dark:bg-gray-800 p-1 shadow-lg mx-auto mb-6 sm:mb-8 max-w-sm sm:max-w-md">
          {tabs.map((tab) => {
            const TabIcon = tab.icon;
            return (
              <Tab
                key={tab.name}
                className={({ selected }) =>
                  `w-full py-2 text-sm sm:py-2.5 sm:text-lg font-medium leading-5 rounded-full
                  focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60
                  transition-all duration-300 ease-in-out
                  ${
                    selected
                      ? "bg-blue-600 text-white shadow-md transform scale-105"
                      : "text-blue-700 dark:text-blue-300 hover:bg-blue-100 hover:text-blue-800 dark:hover:bg-gray-700 dark:hover:text-blue-200"
                  }`
                }
              >
                <div className="flex items-center justify-center gap-1 sm:gap-2">
                  <TabIcon className="text-base sm:text-xl" />
                  <span>{tab.name}</span>
                </div>
              </Tab>
            );
          })}
        </Tab.List>

        {/* Scrolling Content Area */}
        <Tab.Panels className="relative h-96 overflow-hidden rounded-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 shadow-inner">
          {tabs.map((tab, idx) => (
            <Tab.Panel
              key={idx}
              className="focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60 h-full flex flex-col"
            >
              {tab.data.length > 0 ? (
                <motion.ul
                  key={tab.name} // Force re-render on tab switch
                  className="space-y-4 w-full"
                  initial={{ translateY: "100%" }}
                  animate={{ translateY: "-100%" }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "linear",
                    duration: calculateAnimationDuration(tab.data.length),
                  }}
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.1 }}
                  variants={listVariants}
                >
                  {tab.data.map((item: AnnouncementItem | RecruitmentItem) => (
                    <motion.li
                      key={item.id}
                      variants={itemVariants}
                      className="group flex items-start gap-3 p-4 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-200 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                    >
                      <span className="flex-shrink-0 text-blue-600 dark:text-blue-400 mt-1">
                        {tab.name === "Announcements" ? <FaBullhorn className="text-lg" /> : <FaTags className="text-lg" />}
                      </span>
                      <Link href={item.link} target="_blank" rel="noopener noreferrer" className="flex-grow">
                        <p className="text-base sm:text-lg font-medium text-gray-800 dark:text-gray-200 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-200">
                          {item.title}
                          {tab.name === "Announcements" && (item as AnnouncementItem).isNew && (
                            <span className="ml-2 inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 animate-pulse">
                              New
                            </span>
                          )}
                        </p>
                        {(item as AnnouncementItem).date && (
                          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Published: {(item as AnnouncementItem).date}
                          </p>
                        )}
                      </Link>
                    </motion.li>
                  ))}
                </motion.ul>
              ) : (
                <motion.div variants={itemVariants} className="text-center text-gray-500 dark:text-gray-400 p-8">
                  No {tab.name.toLowerCase()} available at the moment. Please check back later!
                </motion.div>
              )}
            </Tab.Panel>
          ))}
        </Tab.Panels>

        {/* View All Button */}
        <div className="text-center mt-8">
          <Link
            href={tabs[selectedIndex].link}
            className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300 sm:px-8 sm:py-2 sm:text-base"
          >
            View All {tabs[selectedIndex].name} <FaArrowRight className="ml-2 -mr-1 text-base sm:ml-3 sm:text-xl" />
          </Link>
        </div>
      </Tab.Group>
    </motion.div>
  );
}