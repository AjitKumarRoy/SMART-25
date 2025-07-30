"use client";

import { motion } from 'framer-motion';
import { PageHero } from '@/components/ui/PageHero';
import pageData from '@/data/programSchedulePage/programSchedule.json';
import { ComingSoon } from '@/components/ui/ComingSoon';
//import { ScheduleTabs } from '@/components/schedulePage/ScheduleTabs'; 

export const SchedulePageClient = () => {
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

      {/* <ScheduleTabs /> */}
      
      <ComingSoon
        title="Schedule to be Announced"
        message="The detailed program schedule for the conference is being finalized and will be updated soon."
      />
      
    </motion.div>
  );
}