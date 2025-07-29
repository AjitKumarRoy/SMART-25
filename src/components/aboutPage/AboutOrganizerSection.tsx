"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import organizerDetailsData from '@/data/aboutPage/aboutPage.json';

export const AboutOrganizersSection = () => {
  // Animation variants for the grid container to stagger its children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // Animation variants for each card
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <Section>
      <SectionTitle>About the Organizers</SectionTitle>
      
      <motion.div
        className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {organizerDetailsData.organizerDetails.map((organizer) => (
          <motion.div
            key={organizer.name}
            className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
            variants={cardVariants}
          >
            {/* College Image */}
            <div className="relative h-56 w-full overflow-hidden">
              <Image
                src={organizer.imageSrc}
                alt={organizer.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            
            {/* College Info */}
            <div className="flex flex-grow flex-col p-6">
              <h3 className="text-xl font-bold text-gray-900">{organizer.name}</h3>
              <p className="mt-1 text-sm font-medium text-indigo-600">{organizer.location}</p>
              <p className="mt-4 flex-grow text-gray-600">{organizer.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
};