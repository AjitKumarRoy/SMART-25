// FILE: src/app/blog/page.tsx
import Link from "next/link";

const dummyPosts = [
  { title: "Our AI Research Journey", slug: "ai-research-journey" },
  { title: "Recent Conference Highlights", slug: "conference-highlights" },
];

export default function BlogListPage() {
  return (
    <section className="pt-20 px-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <ul className="space-y-4">
        {dummyPosts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="text-blue-600 hover:underline"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}