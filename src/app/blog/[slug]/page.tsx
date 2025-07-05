// FILE: src/app/blog/[slug]/page.tsx
"use client"; // <--- ADD THIS DIRECTIVE AT THE VERY TOP

import { useEffect, useState } from "react"; // Keep useState and useEffect for client-side state/effects
import { notFound } from "next/navigation"; // For handling 404
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion"; // Framer Motion now works because it's a client component
import ReactMarkdown from "react-markdown"; // For rendering Markdown content
import { FaCalendarAlt, FaUserCircle, FaArrowLeft } from "react-icons/fa"; // Icons

// Import blog post data (this data is still loaded at build time/server-side)
import blogPosts from "@/data/blogPosts.json";

// Define the shape of our blog post metadata (front matter)
interface BlogPostMetadata {
  id: number;
  title: string;
  slug: string;
  date: string; // YYYY-MM-DD format
  author: string;
  image: string;
  excerpt: string;
}

// Props for the dynamic page
interface BlogDetailPageProps {
  params: {
    slug: string;
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

// NOTE: We cannot use `fs` or `gray-matter` directly in a "use client" component.
// Instead, we'll fetch the data from the JSON, which now contains the content.
// If you *must* read Markdown files dynamically on the client, you'd need an API route.
// For simplicity and given your current setup, we'll revert to fetching from JSON that has content.
// This means your `blogPosts.json` should contain the `content` field again.
// (I will provide the updated `blogPosts.json` below as well)

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = params;
  const [post, setPost] = useState<BlogPostMetadata & { content: string } | null>(null);

  useEffect(() => {
    // Find the post based on the slug from the JSON data
    const foundPost = (blogPosts as (BlogPostMetadata & { content: string })[]).find((p) => p.slug === slug);

    if (!foundPost) {
      // If post is not found, trigger Next.js's notFound()
      notFound();
    }
    setPost(foundPost);
  }, [slug]); // Re-run if slug changes

  if (!post) {
    // This will typically not be reached if notFound() is called,
    // but good for initial render or if data takes time to load.
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
        Loading blog post...
      </div>
    );
  }

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

// NOTE: generateStaticParams cannot be exported from a "use client" component.
// If you want to use SSG with Markdown files, you would need a separate
// server-side data fetching utility or to make this component a Server Component
// and wrap the client-side parts (like motion.div) in a separate "use client" component.
// For now, we're relying on the JSON having the full content.
// export async function generateStaticParams() { /* ... */ }
