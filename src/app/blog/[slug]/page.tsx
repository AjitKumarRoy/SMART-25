// FILE: src/app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";

interface BlogPostProps {
  params: { slug: string };
}

const posts: Record<string, string> = {
  "ai-research-journey": "This is our journey into Artificial Intelligence research...",
  "conference-highlights": "Key takeaways from our recent international conference...",
};

export default function BlogPostPage({ params }: BlogPostProps) {
  const content = posts[params.slug];

  if (!content) return notFound();

  return (
    <section className="pt-20 px-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{params.slug.replace(/-/g, " ")}</h1>
      <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{content}</p>
    </section>
  );
}