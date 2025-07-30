// FILE: src/components/Footer.tsx
"use client";
import Link from "next/link";
import Image from "next/image"; // Import Image component for the logo
import {
  FiMail,
  FiPhone,
  FiFacebook,
  FiTwitter,
  FiLinkedin,
  FiYoutube,
  FiInstagram,
  FiArrowUp, // For a scroll-to-top button
} from "react-icons/fi";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // For potential animations


// --- UPDATED: Contact Info Data ---
const contactInfo = {
    email: "smartconf25@gmail.com",
    phones: [
        { name: "Dr. Sindhu V", number: "+91 98841 87643" },
        { name: "Mr. T. Raja Gopala Chary", number: "+91 95020 47809" },
        { name: "Dr. S. Joe Patrick Gnanaraj", number: "+91 97903 87317" },
    ]
};



// Replace with your Google Maps embed URL (see instructions below)
  const iframeHTML = `<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3979.2583563457843!2d73.5064865!3d4.1695398!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b3f7e570b96395b%3A0xa0d4298f1f0a8031!2sVilla%20College!5e0!3m2!1sen!2sin!4v1753775302644!5m2!1sen!2sin" width="300" height="200" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;

const Footer = () => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  // Handle scroll event for scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
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

        {/* Column 1: About/Brand (Now with Logo) */}
        <div className="flex flex-col items-start text-left">
          <Link href="/" className="mb-4"> {/* Removed old flex/gap, adjusted alignment */}
            {/* Replace with your actual logo image */}
            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-blue-600 dark:border-blue-400 shadow-lg mx-auto md:mx-0">
              <Image
                src="/images/smart25-logo.jpeg" // <<< IMPORTANT: Replace with the actual path to your logo image
                alt="SMART'25 Logo"
                layout="fill"
                objectFit="contain" // Use 'contain' to ensure the whole logo is visible, or 'cover' if it should fill and potentially crop
                className="rounded-full" // Ensures the image itself respects the rounded container
              />
            </div>
          </Link>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1 border-b-2 border-blue-500 dark:border-blue-400 pb-2 inline-block">SMART&apos;25</h3>
          <p className="text-sm leading-relaxed max-w-xs mt-4"> {/* Added mt-4 for spacing */}
            SMART&apos;25 focuses on &quot;Accelerating SDGs through AI.&quot; It brings together researchers to explore AI&apos;s impact on sustainable design, resilient infrastructure, energy efficiency, and core AI/ML systems. The conference emphasizes interdisciplinary collaboration to tackle global challenges like climate change and resource scarcity, with a special focus on emerging economies.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="text-left">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-5 border-b-2 border-blue-500 dark:border-blue-400 pb-2 inline-block">Quick Links</h3>
          <ul className="space-y-3">
            {[
              { href: "/about", label: "About Us" },
              { href: "/important-dates", label: "Important Dates" },
              { href: "/call-for-papers", label: "Call for Papers" },
              { href: "/paper-submission", "label": "Paper Submission" },
              { href: "/committee", label: "Committee" },
              { href: "/speakers", label: "Speakers" },
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
        <div className="text-left">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-5 border-b-2 border-blue-500 dark:border-blue-400 pb-2 inline-block">More</h3>
          <ul className="space-y-3">
            {[
              { href: "/registration", label: "Registration" },
              { href: "/program-schedule", label: "Program Schedule" },
              { href: "/venue", label: "Venue" },
              { href: "/contact", label: "Contact" },
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
          {/* Mini Google Map (Moved below the contact info) */}
          <div className="mt-4" dangerouslySetInnerHTML={{ __html: iframeHTML }} />
        </div>

        {/* Column 4: Contact & Social */}
        <div className="text-left">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-5 border-b-2 border-blue-500 dark:border-blue-400 pb-2 inline-block">Contact Us</h3>
          <address className="not-italic space-y-3 mb-6 text-sm">
            {/* Email */}
            <p className="flex items-center gap-3">
              <FiMail className="text-blue-500 dark:text-blue-400 text-xl flex-shrink-0" />
              <a href={`mailto:${contactInfo.email}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                {contactInfo.email}
              </a>
            </p>
            {/* Phone Numbers */}
            {contactInfo.phones.map(phone => (
              <p key={phone.name} className="flex items-start gap-3">
                <FiPhone className="text-blue-500 dark:text-blue-400 text-xl flex-shrink-0 mt-0.5" />
                <span>
                  {phone.name}
                  <a href={`tel:${phone.number}`} className="block hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                    {phone.number}
                  </a>
                </span>
              </p>
            ))}
          </address>

          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-5 border-b-2 border-blue-500 dark:border-blue-400 pb-2 inline-block">Follow Us</h3>
          <div className="flex justify-start gap-5 text-2xl">
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
        <p>© {new Date().getFullYear()} SMART&apos;25. All rights reserved.</p>
        <p className="mt-1">
          Designed & Developed by {" "}
          <Link
            href="https://www.linkedin.com/in/ajitroyofficial/" 
            target="_blank"
            className="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
          >
            Ajit Kumar Roy
          </Link>
          .
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