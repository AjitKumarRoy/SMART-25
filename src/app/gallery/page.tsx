// FILE: src/app/gallery/page.tsx
import { UnderConstructionSection } from "@/components/UnderConstructionSection";

export default function GalleryPage() {
  return (
    <section className="pt-20 px-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Gallery</h1>
      <p className="text-gray-700 dark:text-gray-300">
        Explore highlights from our group activities including seminars, field visits, and lab sessions.
      </p>

      <UnderConstructionSection />
    </section>
  );
}
