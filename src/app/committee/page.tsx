import { Metadata } from 'next';
import { CommitteePageClient } from '@/components/committePage/CommitteePageClient';
import pageData from '@/data/committeePage/committePage.json'; // Import data for SEO

// --- SEO for the Committee Page ---
export async function generateMetadata(): Promise<Metadata> {
  // Extract key names for the description
  const conferenceChair = pageData.chiefPatrons.members[0]?.name || '';
  // const advisoryBoardNames = pageData.generalChairs.members.slice(0, 2).map(m => m.name).join(', ');
  // --- NEW: Extract Convener names ---
  const conveners = pageData.organizers.members.map(m => m.name).join(', ');

  // Create a comprehensive list of all member names for keywords
  const allMemberNames = [
    ...pageData.chiefPatrons.members.map(m => m.name),
    ...pageData.generalChairs.members.map(m => m.name),
    ...pageData.organizers.members.map(m => m.name),
    ...pageData.technicalCommittee.members.map(m => m.name),
  ];

  return {
    title: "Committee | SMART-25 AI Conference",
    // --- UPDATED: Description now includes conveners ---
    description: `Meet the SMART-25 team, led by Conference Chair ${conferenceChair} and convened by ${conveners}. View the full organizing and technical committees.`,
    keywords: ["SMART-25 committee", "organizing committee", "technical committee", ...allMemberNames],
    alternates: {
      canonical: "https://smart25.org/committee", // Use your actual domain
    },
    openGraph: {
      title: "Meet the SMART-25 Organizing Committee",
      // --- UPDATED: OG description ---
      description: `Discover the experts organizing SMART-25, including Conference Chair ${conferenceChair} and conveners ${conveners}.`,
      url: "https://smart25.org/committee",
      images: [
        {
          url: 'https://smart25.org/og-image.jpg', // A dedicated OG image for this page
          width: 1200,
          height: 630,
          alt: 'SMART-25 Conference Committee',
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: "Organizing Committee | SMART-25 AI Conference",
      description: `Meet the team for SMART-25, including the conveners: ${conveners}.`,
      images: ['https://smart25.org/og-image.jpg'],
    },
  };
}

// This remains a simple Server Component that renders the client part
export default function CommitteePage() {
  return <CommitteePageClient />;
}