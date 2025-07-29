"use client";

import { motion } from 'framer-motion';
import { PageHero } from '@/components/ui/PageHero';
import cfpData from '@/data/callForPapersPage/callForPapers.json';
import { ThematicAreasSection } from '@/components/callForPapersPage/ThematicAreasSection';
import { CtaSection } from '@/components/callForPapersPage/CtaSection';

export default function CallForPapersPage() {
    return (
        <motion.div 
            className="bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Section 1: Page Hero (Already a component) */}
            <PageHero
                title={cfpData.hero.title}
                subtitle={cfpData.hero.subtitle}
                backgroundImage={cfpData.hero.backgroundImage}
            />
            
            {/* Section 2: Thematic Areas (Now a component) */}
            <ThematicAreasSection />
            <CtaSection />
        </motion.div>
    );
}