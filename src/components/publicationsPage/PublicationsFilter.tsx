"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { FiFilter, FiCalendar, FiBookOpen, FiFileText } from "react-icons/fi";

// Define the types for the component's props
interface PublicationsFilterProps {
  years: number[];
  onFilterChange: (year: number | null, type: "All" | "Publication" | "Patent") => void;
  initialYear?: number | null;
  initialType?: "All" | "Publication" | "Patent";
}

// Variants for the filter menu dropdown
const dropdownVariants: Variants = {
  hidden: { opacity: 0, height: 0, transition: { duration: 0.3 } },
  visible: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
};

export default function PublicationsFilter({
  years,
  onFilterChange,
  initialYear = null,
  initialType = "All",
}: PublicationsFilterProps) {
  const [selectedYear, setSelectedYear] = useState<number | null>(initialYear);
  const [selectedType, setSelectedType] = useState<"All" | "Publication" | "Patent">(initialType);
  const [isYearMenuOpen, setIsYearMenuOpen] = useState(false);
  const [isTypeMenuOpen, setIsTypeMenuOpen] = useState(false);

  // Sync state with parent component's initial values
  useEffect(() => {
    setSelectedYear(initialYear);
    setSelectedType(initialType);
  }, [initialYear, initialType]);

  // Handle year button click
  const handleYearClick = (year: number | null) => {
    setSelectedYear(year);
    onFilterChange(year, selectedType);
    setIsYearMenuOpen(false);
  };

  // Handle type button click
  const handleTypeClick = (type: "All" | "Publication" | "Patent") => {
    setSelectedType(type);
    onFilterChange(selectedYear, type);
    setIsTypeMenuOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12">
      {/* Year Filter Dropdown */}
      <div className="relative w-full md:w-auto">
        {/* Mobile/Tablet dropdown button */}
        <button
          onClick={() => setIsYearMenuOpen(!isYearMenuOpen)}
          className="flex items-center gap-2 w-full md:w-auto px-6 py-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-semibold shadow-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 md:hidden"
        >
          <FiCalendar />
          Year: {selectedYear || "All"}
        </button>

        {/* Desktop year buttons */}
        <div className="hidden md:flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => handleYearClick(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedYear === null
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-200 text-gray-800 hover:bg-blue-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            All Years
          </button>
          {years.map((year) => (
            <button
              key={year}
              onClick={() => handleYearClick(year)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedYear === year
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-200 text-gray-800 hover:bg-blue-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {year}
            </button>
          ))}
        </div>

        {/* Mobile/Tablet dropdown menu */}
        <AnimatePresence>
          {isYearMenuOpen && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={dropdownVariants}
              className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden md:hidden"
            >
              <ul className="py-2">
                <li
                  onClick={() => handleYearClick(null)}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  All Years
                </li>
                {years.map((year) => (
                  <li
                    key={year}
                    onClick={() => handleYearClick(year)}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {year}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Type Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-2">
        <button
          onClick={() => handleTypeClick("All")}
          className={`flex items-center gap-1 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
            selectedType === "All"
              ? "bg-blue-600 text-white shadow-lg"
              : "bg-gray-200 text-gray-800 hover:bg-blue-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          }`}
        >
          <FiFilter /> All
        </button>
        <button
          onClick={() => handleTypeClick("Publication")}
          className={`flex items-center gap-1 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
            selectedType === "Publication"
              ? "bg-teal-600 text-white shadow-lg"
              : "bg-gray-200 text-gray-800 hover:bg-teal-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          }`}
        >
          <FiBookOpen /> Publications
        </button>
        <button
          onClick={() => handleTypeClick("Patent")}
          className={`flex items-center gap-1 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
            selectedType === "Patent"
              ? "bg-purple-600 text-white shadow-lg"
              : "bg-gray-200 text-gray-800 hover:bg-purple-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          }`}
        >
          <FiFileText /> Patents
        </button>
      </div>
    </div>
  );
}