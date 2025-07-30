import { Metadata } from 'next';
import { SpeakersPageClient } from '@/components/speakersPage/SpeakersPageClient';
import pageData from '@/data/speakersPage/speakersPage.json'; // Import data for SEO

// --- SEO for the Speakers Page ---
export async function generateMetadata(): Promise<Metadata> {
  // Extract keynote speaker names for the description
  const keynoteNames = pageData.keynoteSpeakers.map(s => s.name).join(', ');
  
  // Create a comprehensive list of all speaker names for keywords
  const allSpeakerNames = [
    ...pageData.keynoteSpeakers.map(s => s.name),
    ...pageData.invitedSpeakers.map(s => s.name),
  ];

  return {
    title: "Speakers | SMART-25 AI Conference",
    description: `Meet the keynote speakers for SMART-25, including ${keynoteNames}. See the full lineup of experts in AI and sustainable technology.`,
    keywords: ["conference speakers", "keynote speakers", "AI experts", "SMART-25 speakers", ...allSpeakerNames],
    alternates: {
      canonical: "https://smart25.org/speakers", // Use your actual domain
    },
    openGraph: {
      title: "Esteemed Speakers at the SMART-25 AI Conference",
      description: `Featuring keynote presentations from ${keynoteNames} and other global leaders.`,
      url: "https://smart25.org/speakers",
      images: [
        {
          url: 'https://smart25.org/og-image.jpg', // A dedicated OG image for this page
          width: 1200,
          height: 630,
          alt: 'Speakers at the SMART-25 Conference',
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: "Speakers | SMART-25 AI Conference",
      description: `Meet the keynote speakers for SMART-25, including ${keynoteNames}.`,
      images: ['https://smart25.org/og-image.jpg'],
    },
  };
}


// This is now a simple Server Component
export default function SpeakersPage() {
  return <SpeakersPageClient />;
}