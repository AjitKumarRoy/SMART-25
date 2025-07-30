import { Metadata } from 'next';
import { ContactPageClient } from '@/components/contactPage/ContactPageClient';
import pageData from '@/data/contactPage/contactPage.json'; // Import data for SEO

// --- SEO for the Contact Page ---
export async function generateMetadata(): Promise<Metadata> {
  // Automatically create a list of keywords from the contact persons
  const contactNames = pageData.contactPersons.map(person => person.name);

  return {
    title: "Contact Us | SMART-25 AI Conference",
    description: `Contact the SMART-25 organizing committee. For general queries, email ${pageData.generalQuery.email}. Reach out to our contact persons for specific inquiries.`,
    keywords: ["contact SMART-25", "conference contact", "AI conference email", ...contactNames],
    alternates: {
      canonical: "https://smart25.org/contact", // Use your actual domain
    },
    openGraph: {
      title: "Contact the SMART-25 Organizing Team",
      description: `Get in touch with the organizers of the SMART-25 AI Conference. Find contact details and send us a message.`,
      url: "https://smart25.org/contact",
      images: [
        {
          url: 'https://smart25.org/og-image.jpg', // A dedicated OG image for this page
          width: 1200,
          height: 630,
          alt: 'Contact SMART-25 Conference',
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: "Contact Us | SMART-25 AI Conference",
      description: `Get in touch with the organizers of the SMART-25 AI Conference.`,
      images: ['https://smart25.org/og-image.jpg'],
    },
  };
}


// This is now a simple Server Component
export default function ContactPage() {
  return <ContactPageClient />;
}