"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import aboutData from '@/data/aboutPage/aboutPage.json';
import Link from 'next/link';


export const JointlyOrganizedSection = () => {
  // Animation variants for the logo items
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const title = aboutData.jointlyOrganized.conferenceTitle;

  return (
    <Section>
      <div className="text-center">
        <SectionTitle>{aboutData.jointlyOrganized.title}</SectionTitle>

        {/* Logos Section */}
        <motion.div
          className="mt-8 flex flex-wrap items-start justify-center gap-8 md:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {aboutData.jointlyOrganized.logos.map(logo => (
            <motion.div
              key={logo.alt}
              className="flex w-32 flex-col items-center gap-4"
              variants={itemVariants}
            >
              <div className="relative h-24 w-24 rounded-full bg-white p-3 shadow-md ring-2 ring-gray-200 md:h-32 md:w-32">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  className="rounded-full object-contain"
                  sizes="(max-width: 768px) 6rem, 8rem"
                />
              </div>
              <p className="text-center font-semibold text-gray-700">
                {logo.alt}
              </p>
            </motion.div>
          ))}
        </motion.div>
        
        {/* --- NEW CONFERENCE TITLE BLOCK --- */}
        <motion.div 
          className="mx-auto mt-16 max-w-4xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={containerVariants} // Use stagger for the lines
        >
          <motion.p variants={itemVariants} className="text-sm uppercase tracking-widest text-gray-500">{title.line1}</motion.p>
          <motion.h3 variants={itemVariants} className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">{title.line2}</motion.h3>
          <motion.p variants={itemVariants} className="text-lg italic text-gray-600">{title.line3}</motion.p>
          <motion.p variants={itemVariants} className="mt-4 text-sm uppercase tracking-widest text-gray-500">{title.line4}</motion.p>
          <motion.h2 variants={itemVariants} className="mt-2 text-4xl font-extrabold sm:text-5xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            {title.line5}
          </motion.h2>
        </motion.div>

        {/* --- NEW TITLE SPONSOR SECTION --- */}
        <motion.div
          className="mt-12 flex flex-col items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p className="text-sm font-bold uppercase tracking-widest text-gray-500">Title Sponsor</p>
          <Link href="https://www.konnifel.com/" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-105">
            <div className="relative h-20 w-48">
              <Image 
                src="/images/sponsors/konnifel.png" 
                alt="Konnifel Logo" 
                fill 
                className="object-contain"
                sizes="200px"
              />
            </div>
          </Link>
        </motion.div>

        {/* Highlights Container */}
        <div className="mt-16 flex flex-col items-center justify-center gap-6 md:flex-row">
          <motion.div 
            className="rounded-full bg-indigo-100 px-6 py-4 text-indigo-800 shadow-inner"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ type: 'spring', stiffness: 100, delay: 0.4 }}
          >
            <p className="text-base font-bold tracking-wide md:text-lg">
              {aboutData.jointlyOrganized.theme}
            </p>
          </motion.div>
          <motion.div 
            className="rounded-full bg-teal-100 px-6 py-4 text-teal-800 shadow-inner"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ type: 'spring', stiffness: 100, delay: 0.5 }}
          >
            <p className="text-base font-bold tracking-wide md:text-lg">
              {aboutData.jointlyOrganized.conferenceDates}
            </p>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};