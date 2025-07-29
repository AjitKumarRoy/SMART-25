"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { Section } from '@/components/ui/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import venueData from '@/data/homePage/venue.json';

export const VenueSection = () => {
  // Animation for the content to fade and slide in
  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: 'easeOut' } 
    },
  };

  return (
    <Section id="venue" className="bg-indigo-50">
      <SectionTitle>SMART'25 Venue</SectionTitle>
      <motion.div
        className="grid items-center gap-12 md:grid-cols-2"
        variants={contentVariants}
        initial="hidden"
        whileInView="visible" // Triggers animation when the section scrolls into view
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Image Column */}
        <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-lg">
          <Image
            src={venueData.imageSrc}
            alt={venueData.name}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        
        {/* Text Content Column */}
        <div>
          <h3 className="mb-3 text-3xl font-bold text-gray-800">
            {venueData.name}
          </h3>
          <p className="mb-6 leading-relaxed text-gray-600">
            {venueData.description}
          </p>
          <Link
            href={venueData.link}
            className="group inline-flex items-center gap-2 font-semibold text-indigo-600 transition-colors hover:text-indigo-800"
          >
            Explore Venue
            <FaArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </motion.div>
    </Section>
  );
};