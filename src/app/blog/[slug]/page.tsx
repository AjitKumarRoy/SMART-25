// FILE: src/app/blog/[slug]/page.tsx
// This is a Server Component by default, perfect for reading local files.
import path from "path";
import { promises as fs } from "fs"; // Use promises version for async/await
import matter from "gray-matter"; // For parsing front matter
import { notFound } from "next/navigation";

// Import the new Client Component
import BlogPostContent from "@/components/blog/BlogPostContent";

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

// Function to get all possible slugs for static generation
// This runs at build time to pre-render all blog post pages
export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'src', 'posts');
  const filenames = await fs.readdir(postsDirectory);

  // Filter for .md files and extract slugs
  const slugs = filenames
    .filter(filename => filename.endsWith('.md'))
    .map(filename => ({
      slug: filename.replace(/\.md$/, ''),
    }));

  return slugs;
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = params;

  const postsDirectory = path.join(process.cwd(), 'src', 'posts');
  const filePath = path.join(postsDirectory, `${slug}.md`);

  let postData: (BlogPostMetadata & { content: string }); // Combined type for data and content

  try {
    // Read the Markdown file content
    const fileContent = await fs.readFile(filePath, 'utf-8');
    // Parse the front matter and content
    const { data, content } = matter(fileContent);
    postData = { ...(data as BlogPostMetadata), content };
  } catch (error) {
    console.error(`Failed to read or parse blog post for slug: ${slug}`, error);
    notFound(); // If file not found or parsing fails, show 404
  }

  // Pass the fetched data to the Client Component
  return <BlogPostContent post={postData} />;
}
