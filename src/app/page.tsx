import { Metadata } from 'next';
import { differenceInDays } from 'date-fns';

// Import Section Components
import { HeroSection } from '@/components/homePage/HeroSection';
import { AboutSection } from '@/components/homePage/AboutSection';
import { SpeakersSection } from '@/components/homePage/SpeakersSection';
import { DatesAndCtaSection } from '@/components/homePage/DatesAndCtaSection';
import { ScrollingNotification } from '@/components/ui/ScrollingNotification';
import { OrganizersSection } from '@/components/homePage/OrganizersSection';
import { VenueSection } from '@/components/homePage/VenueSection';
import { AttractionsSection } from '@/components/homePage/AttractionSection';
import { PreviousConferenceSection } from '@/components/homePage/PreviousConferenceSection';
import { FaqSection } from '@/components/homePage/FaqSection';
import { CtaSection } from '@/components/homePage/CtaSection';

// --- SEO Optimization: Updated Metadata ---
export const metadata: Metadata = {
  title: "SMART-25 AI Conference | Sustainable Tech & SDGs | Nov 14-15, 2025",
  description: "Join SMART-25, the 4th International Conference on AI for Sustainable Development Goals. Submit your paper for this premier hybrid event at Villa College, Maldives.",
  keywords: ["AI conference 2025", "sustainable technology", "SDGs", "machine learning conference", "SMART-25", "IIT Bhilai","Villa College", "St. Mother Theresa Engineering College", "international conference India", "paper submission", "AI research"],
  alternates: {
    canonical: "https://smart25.com/", // Replace with your actual domain
  },
  openGraph: {
    title: "SMART-25: Sustainable Multidisciplinary Artificial Intelligence Research for Global Transformations",
    description: "Join researchers and experts at SMART-25 to explore how AI can accelerate the UN's Sustainable Development Goals. Hybrid mode, November 14-15, 2025.",
    url: "https://smart25.com/", // Replace with your actual domain
    siteName: "SMART-25 Conference",
    images: [
      {
        url: 'https://smart25.com/og-image.jpg', 
        width: 1200,
        height: 630,
        alt: 'SMART-25 AI Conference Banner',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "SMART-25 AI Conference | Sustainable Tech & SDGs | Nov 14-15, 2025",
    description: "Join SMART-25, the 4th International Conference on AI for Sustainable Development Goals. Submit your paper for this premier hybrid event at NERIST, India.",
    images: ['https://smart25.com/og-image.jpg'], // IMPORTANT: Create and upload a Twitter-specific image
  },
};

export default function Homepage() {
   // --- SEO Optimization: JSON-LD Structured Data ---
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "SMART-25: Sustainable Multidisciplinary Artificial Intelligence Research for Global Transformations",
    "startDate": "2025-11-14T09:00",
    "endDate": "2025-11-15T17:00",
    "eventAttendanceMode": "https://schema.org/HybridEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled",
    "location": {
      "@type": "Place",
      "name": "Villa college, Maldives",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Male",
        "addressLocality": "Male",
        "addressRegion": "Male",
        "postalCode": "20373",
        "addressCountry": "MV"
      }
    },
    "description": "The 4th International Conference on AI for Sustainable Development Goals, accelerating SDGs through AI research and collaboration.",
    "organizer": {
      "@type": "Organization",
      "name": "IIT Bhilai, Villa College, Maldives and St. Mother Teresa Engineering College",
      "url": "https://www.iitbhilai.ac.in/" // Link to the primary organizer
    },
    "offers": {
      "@type": "Offer",
      "url": "https://smart25.com/registration", // Replace with your domain
      "price": "100", // Example price, update as needed
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "validFrom": "2025-07-21"
    }
  };

  // --- Dynamic Deadline Calculation ---
  const getDeadlineText = () => {
    const deadline = new Date('2025-08-01');
    const today = new Date(); // Gets the current date
    const daysLeft = differenceInDays(deadline, today);

    if (daysLeft > 1) {
      return `The abstract submission deadline is August 1, 2025. Only ${daysLeft} days left! 🗓️`;
    } else if (daysLeft === 1) {
      return `Final call! The abstract submission deadline is tomorrow. Submit your work now! ⏳`;
    } else if (daysLeft === 0) {
        return `Today is the last day to submit abstracts! Deadline: August 1, 2025. 🚨`;
    } else {
      return `Abstract submissions are now closed. Thank you for your interest!`;
    }
  };
  
  const deadlineText = getDeadlineText();
  // --- End of Dynamic Calculation ---

  return (
    <>
     {/* This script injects the structured data into the page's <head> */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    
    <div className="bg-gray-50">
      <HeroSection />
      <ScrollingNotification text={deadlineText} />
      <AboutSection />
      <OrganizersSection />
      <SpeakersSection />
      <DatesAndCtaSection/>
      <VenueSection />
      <AttractionsSection />
      <PreviousConferenceSection />
      <FaqSection />
      <CtaSection />
    </div>
    </>
  );
}