"use client";

import { motion } from 'framer-motion';
import pageData from '@/data/paperSubmissionPage/submissionPage.json';
import { PageHero } from '@/components/ui/PageHero';
import { SubmissionPortalsCta } from '@/components/paperSubmissionPage/SubmissionPortalCta';
import { GuidelinesSection } from '@/components/paperSubmissionPage/GuidelinesSection';
import { PublicationPartnersSection } from '@/components/paperSubmissionPage/PublicationPartnersSection';

export const PaperSubmissionPageClient = () => {
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

            <SubmissionPortalsCta />
            <GuidelinesSection />
            <PublicationPartnersSection />
            
        </motion.div>
    );
};