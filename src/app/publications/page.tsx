"use client";

import { useState, useEffect, useRef } from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiExternalLink, FiDownload, FiFilter } from "react-icons/fi";
import HeroSection from "@/components/HeroSection";
import { CallToActionSection } from "@/components/homePage/CallToActionSection";

// Import publications data
import publicationsData from "@/data/publications/publications.json";

// Define Publication interface
interface Publication {
  id: string;
  title: string;
  type: string;
  authors: string[];
  journalOrConference?: string | undefined; // Allow undefined for patents
  year: number | string; // Allow string from JSON, will parse to number
  imageUrl?: string;
  link?: string;
  pdfLink?: string | undefined | null; // Allow null from previous fix
  patentNumber?: string;
  abstract?: string;
}

// Animation variants
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

export default function PublicationsAndPatentsPage() {
  const [typeFilter, setTypeFilter] = useState<"all" | "journal article" | "conference presentation" | "book chapter" | "patent">("all");
  const [yearFilter, setYearFilter] = useState<string>("all");
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get unique years, converting to numbers for sorting
  const uniqueYears = Array.from(
    new Set(publicationsData.map((item: Publication) => parseInt(item.year.toString())))
  ).sort((a, b) => b - a);

  // Filter and sort data
  const filteredData = publicationsData
    .filter((item: Publication) => {
      const isPatent = item.type.toLowerCase().includes("patent");
      const matchesType =
        typeFilter === "all" ||
        (typeFilter === "journal article" && item.type === "Journal Article") ||
        (typeFilter === "conference presentation" && item.type === "Conference Paper") ||
        (typeFilter === "book chapter" && item.type === "Book Chapter") ||
        (typeFilter === "patent" && isPatent);
      const matchesYear = yearFilter === "all" || parseInt(item.year.toString()) === parseInt(yearFilter);
      return matchesType && matchesYear;
    })
    .sort((a: Publication, b: Publication) => {
      const yearA = parseInt(a.year.toString());
      const yearB = parseInt(b.year.toString());
      return yearB - yearA; // Sort descending
    });

  // Debug state changes
  useEffect(() => {
    console.log("Filter State:", { typeFilter, yearFilter, filteredItems: filteredData.length });
    console.log("Publications Data:", publicationsData.map(item => ({ id: item.id, year: item.year, pdfLink: item.pdfLink, journalOrConference: item.journalOrConference })));
  }, [typeFilter, yearFilter, filteredData]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsTypeDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-jakarta">
      <HeroSection
        title="Publications"
        description="Explore the scientific contributions and innovative patents from the Advanced Materials Development & Characterization Group."
        gradientFrom="from-teal-50"
        gradientTo="to-cyan-100"
      />

      <section className="py-10 px-6 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
                className="lg:hidden px-4 py-2 rounded-lg font-semibold transition-colors duration-200 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-teal-500 hover:text-white flex items-center"
              >
                Filter by Type <FiFilter className="ml-2" />
              </button>
              {isTypeDropdownOpen && (
                <div className="lg:hidden absolute z-10 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => {
                      console.log("Clicked All");
                      setTypeFilter("all");
                      setIsTypeDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 font-semibold transition-colors duration-200 ${
                      typeFilter === "all"
                        ? "bg-teal-600 text-white"
                        : "text-gray-900 dark:text-gray-100 hover:bg-teal-500 hover:text-white"
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => {
                      console.log("Clicked Journal Article");
                      setTypeFilter("journal article");
                      setIsTypeDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 font-semibold transition-colors duration-200 ${
                      typeFilter === "journal article"
                        ? "bg-teal-600 text-white"
                        : "text-gray-900 dark:text-gray-100 hover:bg-teal-500 hover:text-white"
                    }`}
                  >
                    Journal Article
                  </button>
                  <button
                    onClick={() => {
                      console.log("Clicked Conference Presentation");
                      setTypeFilter("conference presentation");
                      setIsTypeDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 font-semibold transition-colors duration-200 ${
                      typeFilter === "conference presentation"
                        ? "bg-teal-600 text-white"
                        : "text-gray-900 dark:text-gray-100 hover:bg-teal-500 hover:text-white"
                    }`}
                  >
                    Conference Presentation
                  </button>
                  <button
                    onClick={() => {
                      console.log("Clicked Book Chapter");
                      setTypeFilter("book chapter");
                      setIsTypeDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 font-semibold transition-colors duration-200 ${
                      typeFilter === "book chapter"
                        ? "bg-teal-600 text-white"
                        : "text-gray-900 dark:text-gray-100 hover:bg-teal-500 hover:text-white"
                    }`}
                  >
                    Book Chapter
                  </button>
                  <button
                    onClick={() => {
                      console.log("Clicked Patents");
                      setTypeFilter("patent");
                      setIsTypeDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 font-semibold transition-colors duration-200 ${
                      typeFilter === "patent"
                        ? "bg-teal-600 text-white"
                        : "text-gray-900 dark:text-gray-100 hover:bg-teal-500 hover:text-white"
                    }`}
                  >
                    Patents
                  </button>
                </div>
              )}
              <div className="hidden lg:flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    console.log("Clicked All");
                    setTypeFilter("all");
                  }}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${
                    typeFilter === "all"
                      ? "bg-teal-600 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-teal-500 hover:text-white"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => {
                    console.log("Clicked Journal Article");
                    setTypeFilter("journal article");
                  }}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${
                    typeFilter === "journal article"
                      ? "bg-teal-600 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-teal-500 hover:text-white"
                  }`}
                >
                  Journal Article
                </button>
                <button
                  onClick={() => {
                    console.log("Clicked Conference Presentation");
                    setTypeFilter("conference presentation");
                  }}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${
                    typeFilter === "conference presentation"
                      ? "bg-teal-600 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-teal-500 hover:text-white"
                  }`}
                >
                  Conference Presentation
                </button>
                <button
                  onClick={() => {
                    console.log("Clicked Book Chapter");
                    setTypeFilter("book chapter");
                  }}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${
                    typeFilter === "book chapter"
                      ? "bg-teal-600 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-teal-500 hover:text-white"
                  }`}
                >
                  Book Chapter
                </button>
                <button
                  onClick={() => {
                    console.log("Clicked Patents");
                    setTypeFilter("patent");
                  }}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${
                    typeFilter === "patent"
                      ? "bg-teal-600 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-teal-500 hover:text-white"
                  }`}
                >
                  Patents
                </button>
              </div>
            </div>
            <select
              value={yearFilter}
              onChange={(e) => {
                console.log("Selected Year:", e.target.value);
                setYearFilter(e.target.value);
              }}
              className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="all">All Years</option>
              {uniqueYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white dark:bg-gray-900">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          className="max-w-6xl mx-auto text-center"
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-12 text-gray-900 dark:text-gray-100">
            Recent Publications and Patents
          </motion.h2>

          {filteredData.length === 0 ? (
            <p className="text-lg text-gray-600 dark:text-gray-400">
              No items match the selected filters.
            </p>
          ) : (
            <motion.div
              key={`${typeFilter}-${yearFilter}`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            >
              {filteredData.map((item) => (
                <motion.div
                  key={item.id}
                  variants={cardVariants}
                  className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col"
                >
                  {item.imageUrl && (
                    <div className="relative w-full h-48 sm:h-56 overflow-hidden">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{ objectFit: "cover" }}
                        className="transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-6 text-left flex-grow flex flex-col">
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-2">
                      {item.type}
                    </span>
                    <h3 className="text-xl font-bold mb-2 text-teal-700 dark:text-teal-300 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 italic">
                      {item.authors.join(", ")}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs mb-3">
                      {item.patentNumber
                        ? `Patent ${item.patentNumber} (${item.year})`
                        : item.journalOrConference
                        ? `${item.journalOrConference} (${item.year})`
                        : `(${item.year})`}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-4 flex-grow">
                      {item.abstract}
                    </p>
                    <div className="mt-auto flex flex-wrap gap-3 pt-2">
                      {item.link && (
                        <Link
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-600 dark:text-blue-400 font-semibold text-sm hover:underline hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
                        >
                          {item.patentNumber ? "View Patent" : "View Publication"}
                          <FiExternalLink className="ml-1 text-base" />
                        </Link>
                      )}
                      {item.pdfLink && (
                        <Link
                          href={item.pdfLink}
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
          )}
        </motion.div>
      </section>

      <CallToActionSection />
    </div>
  );
}