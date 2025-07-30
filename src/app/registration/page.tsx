import { Metadata } from 'next';
import { RegistrationPageClient } from '@/components/registrationPage/RegistrationPageClient';
import pageData from '@/data/registrationPage/registrationPage.json'; // Import data for SEO

// --- SEO for the Registration Page ---
export async function generateMetadata(): Promise<Metadata> {
  // Automatically create a list of keywords from the fee categories
  const feeKeywords = pageData.fees.map(fee => fee.category);

  return {
    title: "Registration | SMART-25 AI Conference",
    description: `Register for the SMART-25 conference. View fees for students, academicians, and industry professionals. Early bird discounts available until 30th September.`,
    keywords: ["conference registration", "register for SMART-25", "AI conference fees", ...feeKeywords],
    alternates: {
      canonical: "https://smart25.org/registration", // Use your actual domain
    },
    openGraph: {
      title: "Register Now for the SMART-25 AI Conference",
      description: "Secure your spot at SMART-25. View detailed registration fees and see what's included with your pass.",
      url: "https://smart25.org/registration",
      images: [
        {
          url: 'https://smart25.org/og-image.jpg', // A dedicated OG image for this page
          width: 1200,
          height: 630,
          alt: 'Registration for SMART-25 Conference',
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: "Registration | SMART-25 AI Conference",
      description: `Register for the SMART-25 conference and view fees for students, academicians, and industry professionals.`,
      images: ['https://smart25.org/og-image.jpg'],
    },
  };
}

// This is now a simple Server Component
export default function RegistrationPage() {
  return <RegistrationPageClient />;
}