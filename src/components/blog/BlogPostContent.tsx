// FILE: src/components/blog/BlogPostContent.tsx
"use client"; // <--- This makes it a Client Component

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { FaCalendarAlt, FaUserCircle, FaArrowLeft } from "react-icons/fa";

// Define the shape of the post data this component expects
interface BlogPostContentProps {
  post: {
    title: string;
    date: string;
    author: string;
    image: string;
    content: string; // This content will be passed from the server component
  };
}

// Animation variants for page entry
const pageVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 10,
      stiffness: 100,
      duration: 0.5,
    },
  },
};

// Helper to format date
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

export default function BlogPostContent({ post }: BlogPostContentProps) {
  return (
    <motion.div
      className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-950 min-h-screen"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-4xl mx-auto z-10 relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 border border-gray-100 dark:border-gray-700">
        {/* Back to Blog Button */}
        <Link
          href="/blog"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline font-medium mb-8 group"
        >
          <FaArrowLeft className="mr-2 text-lg group-hover:-translate-x-1 transition-transform duration-200" />
          Back to Blog
        </Link>

        {/* Featured Image */}
        <div className="relative w-full h-64 sm:h-80 lg:h-96 rounded-xl overflow-hidden mb-8 shadow-lg">
          <Image
            src={post.image}
            alt={post.title}
            layout="fill"
            objectFit="cover"
            className="rounded-xl"
          />
        </div>

        {/* Post Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-4 leading-tight">
          {post.title}
        </h1>

        {/* Post Metadata */}
        <div className="flex items-center text-md text-gray-600 dark:text-gray-400 mb-8">
          <FaCalendarAlt className="mr-2 text-blue-500 dark:text-blue-300" />
          <span>{formatDate(post.date)}</span>
          <FaUserCircle className="ml-6 mr-2 text-blue-500 dark:text-blue-300" />
          <span>{post.author}</span>
        </div>

        {/* Post Content (Markdown) */}
        <div className="prose dark:prose-invert prose-lg max-w-none text-gray-800 dark:text-gray-200 leading-relaxed">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>

        {/* Optional: Share buttons or related posts section could go here */}
      </div>
    </motion.div>
  );
}
