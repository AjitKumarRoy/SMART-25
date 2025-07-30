import { Metadata } from 'next';
import { ImportantDatesPageClient } from '@/components/importantDatesPage/ImportantDatesPageClient';

// --- SEO for the Important Dates Page ---
export const metadata: Metadata = {
  title: "Important Dates & Deadlines | SMART-25 AI Conference",
  // UPDATED: Description now includes key dates
  description: "Key deadlines for SMART-25: Abstract submission by Aug 15, 2025; Full paper by Sep 30; Final registration by Oct 15. Conference is Nov 21-22, 2025.",
  alternates: {
    canonical: "https://smart25.org/important-dates", // Use your actual domain
  },
  openGraph: {
    title: "Key Deadlines for the SMART-25 AI Conference",
    // UPDATED: OG description includes more detail
    description: "Plan your participation for SMART-25. Abstract submission closes Aug 15, 2025, full paper deadline is Sep 30, and final registration is Oct 15, 2025.",
    url: "https://smart25.org/important-dates",
    images: [
      {
        url: 'https://smart25.org/og-image.jpg', // A dedicated OG image for this page
        width: 1200,
        height: 630,
        alt: 'Important Dates for SMART-25 Conference',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Important Dates & Deadlines | SMART-25 AI Conference",
     // UPDATED: Twitter description is concise and includes dates
    description: "Key deadlines for SMART-25: Abstract submission by Aug 15, Full paper by Sep 30, Registration by Oct 15. Join us Nov 21-22, 2025!",
    images: ['https://smart25.org/og-image.jpg'],
  },
};

// This is now a simple Server Component
export default function ImportantDatesPage() {
  return <ImportantDatesPageClient />;
}