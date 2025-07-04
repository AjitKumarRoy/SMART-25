// FILE: src/components/Footer.tsx
"use client";
import Link from "next/link";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiFacebook,
  FiTwitter,
  FiLinkedin,
  FiYoutube,
  FiInstagram,
  FiArrowUp, // For a scroll-to-top button
} from "react-icons/fi";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // For potential animations

const Footer = () => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  // Handle scroll event for scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) { // Show button after scrolling 300px down
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative bg-gradient-to-r from-gray-50 dark:from-gray-900 to-gray-100 dark:to-gray-950 py-12 border-t border-gray-200 dark:border-gray-800 font-jakarta text-gray-700 dark:text-gray-300">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">

        {/* Column 1: About/Brand */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <Link href="/" className="flex items-center gap-2 mb-4">
            {/* Replace with your actual logo or text branding */}
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">AMDCG</span>
            <span className="text-xl font-semibold text-gray-800 dark:text-gray-200">IIT Bhilai</span>
          </Link>
          <p className="text-sm leading-relaxed max-w-xs">
            Advancing research and innovation in cutting-edge fields at IIT Bhilai.
            Committed to excellence and impactful contributions.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-5 border-b-2 border-blue-500 dark:border-blue-400 pb-2 inline-block">Quick Links</h3>
          <ul className="space-y-3">
            {[
              { href: "/about", label: "About Us" },
              { href: "/team", label: "Our Team" },
              { href: "/research", label: "Research Areas" },
              { href: "/publications", label: "Publications" },
              { href: "/events", label: "Events" },
              { href: "/blog", label: "Blog" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="relative text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 transform scaleX-0 group-hover:scaleX-100 transition-transform origin-left duration-300"></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: More Links */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-5 border-b-2 border-blue-500 dark:border-blue-400 pb-2 inline-block">More</h3>
          <ul className="space-y-3">
            {[
              { href: "/facilities", label: "Facilities" },
              { href: "/gallery", label: "Gallery" },
              { href: "/careers", label: "Careers" },
              { href: "/privacy", label: "Privacy Policy" }, // Example additional link
              { href: "/terms", label: "Terms of Service" }, // Example additional link
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="relative text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 transform scaleX-0 group-hover:scaleX-100 transition-transform origin-left duration-300"></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Contact & Social */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-5 border-b-2 border-blue-500 dark:border-blue-400 pb-2 inline-block">Contact Us</h3>
          <address className="not-italic space-y-3 mb-6 text-sm">
            <p className="flex items-center justify-center md:justify-start gap-3">
              <FiMapPin className="text-blue-500 dark:text-blue-400 text-xl" />
              Naya Raipur, Chhattisgarh 493661, India
            </p>
            <p className="flex items-center justify-center md:justify-start gap-3">
              <FiMail className="text-blue-500 dark:text-blue-400 text-xl" />
              <a href="mailto:info@iitbhilai.ac.in" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                info@iitbhilai.ac.in
              </a>
            </p>
            <p className="flex items-center justify-center md:justify-start gap-3">
              <FiPhone className="text-blue-500 dark:text-blue-400 text-xl" />
              <a href="tel:+917712977400" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                +91 77129 77400
              </a>
            </p>
          </address>

          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-5 border-b-2 border-blue-500 dark:border-blue-400 pb-2 inline-block">Follow Us</h3>
          <div className="flex justify-center md:justify-start gap-5 text-2xl">
            <a
              href="https://facebook.com/iitbhilai"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 transform hover:-translate-y-1"
            >
              <FiFacebook />
            </a>
            <a
              href="https://twitter.com/iitbhilai"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 transform hover:-translate-y-1"
            >
              <FiTwitter />
            </a>
            <a
              href="https://linkedin.com/school/iit-bhilai"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 transform hover:-translate-y-1"
            >
              <FiLinkedin />
            </a>
            <a
              href="https://youtube.com/c/iitbhilai"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 transform hover:-translate-y-1"
            >
              <FiYoutube />
            </a>
            <a
              href="https://instagram.com/iitbhilai"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 transform hover:-translate-y-1"
            >
              <FiInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-gray-200 dark:border-gray-800 mt-10 pt-6 text-center text-sm text-gray-600 dark:text-gray-400 px-6">
        <p>&copy; {new Date().getFullYear()} AMDCG – IIT Bhilai. All rights reserved.</p>
        <p className="mt-1">
          Made with ❤️ for the future of research.
        </p>
      </div>

      {/* Scroll-to-Top Button */}
      <AnimatePresence>
        {showScrollToTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-all duration-300 ease-in-out"
            aria-label="Scroll to top"
          >
            <FiArrowUp className="text-xl" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;