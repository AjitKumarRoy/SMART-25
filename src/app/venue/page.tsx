import { Metadata } from 'next';
import { VenuePageClient } from '@/components/venuePage/VenuePageClient';
import pageData from '@/data/venuePage/venuePage.json'; // Import data for SEO

// --- SEO for the Venue Page ---
export async function generateMetadata(): Promise<Metadata> {
  const venueName = pageData.aboutVenue.name;
  const location = pageData.aboutVenue.location;

  return {
    title: `Venue | SMART-25 AI Conference`,
    description: `SMART-25 will be held at the ${venueName} in ${location}. Find details on the venue, travel, and accommodation.`,
    keywords: ["conference venue", "SMART-25 location", "Villa College", "Maldives", "how to reach", "conference accommodation"],
    alternates: {
      canonical: "https://smart25.org/venue", // Use your actual domain
    },
    openGraph: {
      title: `Conference Venue: ${venueName}`,
      description: `Explore the venue for the SMART-25 AI Conference in ${location}. Get travel directions and accommodation info.`,
      url: "https://smart25.org/venue",
      images: [
        {
          url: 'https://smart25.org/og-image.jpg', // A dedicated OG image for this page
          width: 1200,
          height: 630,
          alt: `Venue for SMART-25 Conference: ${venueName}`,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Venue: ${location} | SMART-25 AI Conference`,
      description: `SMART-25 will be held at the ${venueName}. Find travel details here.`,
      images: ['https://smart25.org/og-image.jpg'],
    },
  };
}

// This is now a simple Server Component
export default function VenuePage() {
  return <VenuePageClient />;
}