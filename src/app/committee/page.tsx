"use client";

import { motion } from 'framer-motion';
import { PageHero } from '@/components/ui/PageHero';
import pageData from '@/data/committeePage/committePage.json'; // Corrected path
import { ChiefPatronsSection } from '@/components/committePage/CheifPatronsSection';
import { GeneralChairsSection } from '@/components/committePage/GeneralChairsSection';
import { TechnicalCommitteeSection } from '@/components/committePage/TechnicalCommitteeSection';
import { Organizers } from '@/components/committePage/Organizers';

export default function CommitteePage() {
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

            <ChiefPatronsSection />
            <GeneralChairsSection />
            <Organizers />
            <TechnicalCommitteeSection />
            
        </motion.div>
    );
}