// FILE: src/app/blog/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaNewspaper, FaCalendarAlt, FaUserCircle, FaArrowRight } from "react-icons/fa"; // Using Fa for consistency

// Import dummy blog post data
import blogPosts from "@/data/blogPosts.json"; // Assuming you place blogPosts.json in src/data

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  date: string; // YYYY-MM-DD format
  author: string;
  image: string;
  excerpt: string;
}

// Animation variants for sections
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 10,
      stiffness: 100,
      duration: 0.8,
      delay: 0.1,
    },
  },
};

// Animation variants for individual blog post cards
const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 120,
    },
  },
};

// Helper to format date
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

export default function BlogListPage() {
  // Sort posts by date, newest first
  const sortedPosts = [...(blogPosts as BlogPost[])].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <motion.section
      className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-950 min-h-screen"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto z-10 relative">
        {/* Blog Header */}
        <div className="flex items-center mb-12 justify-center text-center">
          <FaNewspaper className="text-5xl text-blue-600 dark:text-blue-400 mr-4" />
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 mb-4">
              Our Research Blog
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Stay updated with the latest breakthroughs, insights, and stories from our research group.
            </p>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {sortedPosts.map((post, index) => (
            <motion.div
              key={post.id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }} // Stagger animation for each card
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col border border-gray-100 dark:border-gray-700 transform hover:scale-[1.01]"
            >
              <div className="relative w-full h-56 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 line-clamp-2">
                  <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-gray-700 dark:text-gray-300 text-base mb-4 line-clamp-3 flex-grow">
                  {post.excerpt}
                </p>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <FaCalendarAlt className="mr-2 text-blue-500 dark:text-blue-300" />
                  <span>{formatDate(post.date)}</span>
                  <FaUserCircle className="ml-4 mr-2 text-blue-500 dark:text-blue-300" />
                  <span>{post.author}</span>
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-full shadow-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300 mt-auto self-start group"
                >
                  Read More
                  <FaArrowRight className="ml-2 -mr-1 text-lg group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action / Newsletter Section */}
        <motion.div
          className="bg-blue-700 dark:bg-blue-900 text-white rounded-3xl p-8 text-center shadow-2xl"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: sortedPosts.length * 0.1 + 0.2 }} // Delay after all cards
        >
          <h2 className="text-3xl font-bold mb-4">
            Don&apos;t Miss Our Latest Research Updates!
          </h2>
          <p className="text-lg mb-6 max-w-xl mx-auto">
            Subscribe to our newsletter to receive exclusive insights, new publications, and event announcements directly in your inbox.
          </p>
          <Link
            href="/subscribe" // Link to your subscription page or form
            className="inline-flex items-center px-10 py-3 border border-white text-base font-medium rounded-full shadow-lg text-blue-700 bg-white hover:bg-blue-50 transition-colors duration-300 transform hover:scale-105"
          >
            Subscribe Now
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
