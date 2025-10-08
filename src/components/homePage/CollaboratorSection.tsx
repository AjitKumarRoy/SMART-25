"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import collaboratorsData from '@/data/homePage/collaborators.json';

export const CollaboratorsSection = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut' }
    },
  };

  // Check how many collaborators there are
  const isSingleItem = collaboratorsData.length === 1;

  return (
    <Section id="collaborators" className="bg-white">
      <SectionTitle>In Collaboration With</SectionTitle>
      
      <motion.div
        // --- THIS CLASS IS NOW DYNAMIC ---
        className={`mt-12 ${isSingleItem 
          ? 'flex justify-center' 
          : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'
        }`}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {collaboratorsData.map((collaborator) => (
          <motion.div 
            key={collaborator.name} 
            variants={itemVariants}
            // Conditionally set a max-width for the single item
            className={isSingleItem ? 'w-full max-w-sm' : ''}
          >
            <Link 
              href={collaborator.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-8 rounded-xl border border-gray-200 bg-gray-50 ..."
            >
              <div className="relative h-24 w-full">
                <Image
                  src={collaborator.logoSrc}
                  alt={`${collaborator.name} logo`}
                  fill
                  className="object-contain"
                  sizes="33vw"
                />
              </div>
              <div className="text-center mt-4">
                <p className="font-semibold text-gray-700 ...">
                  {collaborator.name}
                </p>
                <p className="text-sm font-medium text-indigo-500">
                  {collaborator.type}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
};