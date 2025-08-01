"use client";

import { motion } from 'framer-motion';
import { PageHero } from '@/components/ui/PageHero';
import pageData from '@/data/importantDatesPage/importantDates.json';
import { DatesTimelineSection } from '@/components/importantDatesPage/DatesTimelineSection';
import { DatesCtaSection } from '@/components/importantDatesPage/DatesCtaSection';

export const ImportantDatesPageClient = () => {
  return (
    <motion.div 
      className="bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <PageHero
        title={pageData.hero.title}
        subtitle={pageData.hero.subtitle}
        backgroundImage={pageData.hero.backgroundImage}
      />

      <DatesTimelineSection />
      <DatesCtaSection />
      
    </motion.div>
  );
};