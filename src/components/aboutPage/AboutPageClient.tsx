"use client";

import { motion } from 'framer-motion';
import aboutData from '@/data/aboutPage/aboutPage.json';
import { PageHero } from '@/components/ui/PageHero';
import { JointlyOrganizedSection } from '@/components/aboutPage/JointlyOrganizedSection';
import { AboutOrganizersSection } from '@/components/aboutPage/AboutOrganizerSection';
import { AboutSponsor } from './AboutSponsor';
import { StudentAwardSection } from '@/components/aboutPage/StudentAwardSection';


export const AboutPageClient = () => {
    return (
        <motion.div 
            className="bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <PageHero
                title={aboutData.hero.title}
                subtitle={aboutData.hero.subtitle}
                backgroundImage={aboutData.hero.backgroundImage}
            />
            
            <JointlyOrganizedSection />
            
            {/* <Scope />  This component was in your import list but not used, I've left it out */}
            <AboutOrganizersSection />
            <AboutSponsor />
            <StudentAwardSection />

        </motion.div>
    );
}