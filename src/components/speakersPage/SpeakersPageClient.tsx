"use client";

import { motion } from 'framer-motion';
import { PageHero } from '@/components/ui/PageHero';
import pageData from '@/data/speakersPage/speakersPage.json';
//import { KeynoteSpeakersSection } from '@/components/speakersPage/KeynoteSpeakersSection';
import { InvitedSpeakersSection } from '@/components/speakersPage/InvitedSpeakersSection';
import { SpeakersCtaSection } from '@/components/speakersPage/SpeakersCtaSection';

export const SpeakersPageClient = () => {
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
            
            {/* <KeynoteSpeakersSection /> */}
            <InvitedSpeakersSection />
            <SpeakersCtaSection />

        </motion.div>
    );
}