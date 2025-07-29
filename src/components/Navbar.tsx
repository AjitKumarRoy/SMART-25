// FILE: src/components/Navbar.tsx
"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  FiSearch,
  FiMenu,
  FiX,
  FiHome,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import { motion, AnimatePresence, Variants } from "framer-motion";
import SearchBar from "./SearchBar";
import { AnimatedTitle } from "./AnimatedTitle";

// --- Navigation Link Data (Extracted for better management) ---
const mainNavLinks = [
  { href: "/about", label: "About" },
  { href: "/important-dates", label: "Important Dates" },
  { href: "/call-for-papers", label: "Call for Papers" },
  { href: "/paper-submission", label: "Paper Submission" },
  { href: "/committee", label: "Committee" },
  { href: "/speakers", label: "Speakers" },
];

const moreDropdownLinks = [
  { href: "/registration", label: "Registration" },
  { href: "/program-schedule", label: "Program Schedule" },
  { href: "/venue", label: "Venue" },
  { href: "/contact", label: "Contact" },
];

// const allPaths = [
//   ...mainNavLinks.map((link) => link.href),
//   ...moreDropdownLinks.map((link) => link.href),
// ];

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const moreDropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);

    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
      if (
        isMoreOpen &&
        moreDropdownRef.current &&
        !moreDropdownRef.current.contains(event.target as Node)
      ) {
        setIsMoreOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen, isMoreOpen]);

  const handleCloseAll = () => {
    setIsMobileMenuOpen(false);
    setIsMoreOpen(false);
    setIsSearchOpen(false);
  };

  const handleMobileMenuToggle = () => {
    if (!isMobileMenuOpen) {
      // If the menu is about to open...
      // Check if the navbar ref exists and if the user is scrolled above the navbar's sticky position
      if (navRef.current && window.scrollY < navRef.current.offsetTop) {
        // Scroll smoothly to the top of the navbar
        window.scrollTo({
          top: navRef.current.offsetTop,
          behavior: "smooth",
        });
      }
    }
    // Then, toggle the menu state
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isMoreLinkActive = moreDropdownLinks.some((link) =>
    pathname.startsWith(link.href)
  );
  const isActive = (href: string) => {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  };

  const mobileMenuVariants: Variants = {
    hidden: {
      x: "-100%",
      transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    visible: {
      x: "0%",
      transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const dropdownVariants: Variants = {
    hidden: {
      opacity: 0,
      scaleY: 0,
      originY: 0,
      transition: { duration: 0.2 },
    },
    visible: {
      opacity: 1,
      scaleY: 1,
      originY: 0,
      transition: { duration: 0.2 },
    },
  };

  return (
    <nav
      ref={navRef}
      className="sticky top-0 w-full z-50 bg-gradient-to-r from-white/90 to-gray-50/90 dark:from-gray-950/90 dark:to-gray-900/90 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 shadow-lg transition-all duration-300 ease-in-out font-sans"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* --- UPDATED: Left side: Animated Title --- */}
        <div className="flex-shrink-0">
          <Link href="/" onClick={handleCloseAll}>
            <AnimatedTitle />
          </Link>
        </div>

        {/* Center: Desktop Nav Links and Dropdown. Hidden on tablets and mobiles. */}
        {isMounted && (
          <div className="hidden lg:flex gap-8 items-center text-gray-800 dark:text-gray-200">
            {mainNavLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`
                                    relative text-lg font-medium transition-colors duration-300 group
                                    ${
                                      isActive(item.href)
                                        ? "text-blue-600 dark:text-blue-400"
                                        : "hover:text-blue-600 dark:hover:text-blue-400"
                                    }
                                `}
                onClick={handleCloseAll}
              >
                {item.label}
                <span
                  className={`
                                    absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 transform
                                    ${
                                      isActive(item.href)
                                        ? "scaleX-100"
                                        : "scaleX-0 group-hover:scaleX-100"
                                    }
                                    transition-transform origin-left duration-300
                                `}
                ></span>
              </Link>
            ))}
            <div
              className="relative"
              onMouseEnter={() => setIsMoreOpen(true)}
              onMouseLeave={() => setIsMoreOpen(false)}
              ref={moreDropdownRef}
            >
              <button
                className={`
                                    text-lg font-medium transition-colors duration-300 flex items-center gap-1 group
                                    ${
                                      isMoreOpen || isMoreLinkActive
                                        ? "text-blue-600 dark:text-blue-400"
                                        : "hover:text-blue-600 dark:hover:text-blue-400"
                                    }
                                `}
              >
                More
                <span className="text-sm transition-transform duration-300 transform">
                  {isMoreOpen ? <FiChevronUp /> : <FiChevronDown />}
                </span>
                <span
                  className={`
                                    absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 transform
                                    ${
                                      isMoreOpen || isMoreLinkActive
                                        ? "scaleX-100"
                                        : "scaleX-0 group-hover:scaleX-100"
                                    }
                                    transition-transform origin-left duration-300
                                `}
                ></span>
              </button>
              <AnimatePresence>
                {isMoreOpen && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={dropdownVariants}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-4 min-w-[180px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl rounded-lg overflow-hidden py-2"
                  >
                    {moreDropdownLinks.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`
                                                    block px-5 py-2 transition-colors duration-200 text-base
                                                    ${
                                                      isActive(item.href)
                                                        ? "bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400"
                                                        : "text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400"
                                                    }
                                                `}
                        onClick={handleCloseAll}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label="Toggle search"
            >
              <FiSearch className="text-xl" />
            </button>
          </div>
        )}

        {/* Right side: Mobile Icons. Visible on tablets and mobiles. */}
        {isMounted && (
          <div className="flex lg:hidden items-center justify-end w-full gap-4">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
              aria-label="Toggle search"
            >
              <FiSearch className="text-xl" />
            </button>
            <button
              onClick={handleMobileMenuToggle}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <FiX className="text-2xl" />
              ) : (
                <FiMenu className="text-2xl" />
              )}
            </button>
          </div>
        )}
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && isMounted && (
          <motion.div
            ref={mobileMenuRef}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={mobileMenuVariants}
            className="fixed top-0 left-0 w-64 h-screen bg-white dark:bg-gray-950 shadow-2xl z-50 flex flex-col lg:hidden"
          >
            <div className="flex justify-between items-center p-5 border-b border-gray-100 dark:border-gray-800">
              {/* --- UPDATED: Left side: Animated Title --- */}
              <div className="flex-shrink-0">
                <Link href="/" onClick={handleCloseAll}>
                  <AnimatedTitle />
                </Link>
              </div>
              {/* <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                                aria-label="Close mobile menu"
                            >
                                <FiX className="text-2xl" />
                            </button> */}
            </div>

            <div className="flex-1 p-5 flex flex-col gap-2 overflow-y-auto hide-scrollbar">
              <Link
                href="/"
                className={`
                                    block py-3 px-3 rounded-lg transition-colors duration-200 flex items-center gap-3 font-medium text-lg
                                    ${
                                      isActive("/")
                                        ? "bg-blue-100 dark:bg-blue-700 text-blue-600 dark:text-blue-400"
                                        : "text-gray-800 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400"
                                    }
                                `}
                onClick={handleCloseAll}
              >
                <FiHome className="text-xl" /> Home
              </Link>
              {mainNavLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                                        block py-3 px-3 rounded-lg transition-colors duration-200 font-medium text-lg
                                        ${
                                          isActive(item.href)
                                            ? "bg-blue-100 dark:bg-blue-700 text-blue-600 dark:text-blue-400"
                                            : "text-gray-800 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400"
                                        }
                                    `}
                  onClick={handleCloseAll}
                >
                  {item.label}
                </Link>
              ))}
              <div className="relative">
                <button
                  onClick={() => setIsMoreOpen(!isMoreOpen)}
                  className={`
                                        block w-full text-left py-3 px-3 rounded-lg transition-colors duration-200 flex items-center justify-between font-medium text-lg
                                        ${
                                          isMoreOpen || isMoreLinkActive
                                            ? "bg-blue-100 dark:bg-blue-700 text-blue-600 dark:text-blue-400"
                                            : "text-gray-800 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400"
                                        }
                                    `}
                >
                  More
                  <span className="text-sm">
                    {isMoreOpen ? (
                      <FiChevronUp className="h-5 w-5 transform rotate-0 transition-transform duration-300" />
                    ) : (
                      <FiChevronDown className="h-5 w-5 transform rotate-0 transition-transform duration-300" />
                    )}
                  </span>
                </button>
                <AnimatePresence>
                  {isMoreOpen && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={dropdownVariants}
                      className="pl-6 mt-2 border-l-2 border-blue-200 dark:border-blue-700 flex flex-col gap-1"
                    >
                      {moreDropdownLinks.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`
                                                        block px-4 py-2 rounded-md transition-colors duration-200 text-base
                                                        ${
                                                          isActive(item.href)
                                                            ? "bg-blue-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400"
                                                            : "text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400"
                                                        }
                                                    `}
                          onClick={handleCloseAll}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Bar Component */}
      {isMounted && isSearchOpen && (
        <SearchBar onClose={() => setIsSearchOpen(false)} />
      )}
    </nav>
  );
};

export default Navbar;
