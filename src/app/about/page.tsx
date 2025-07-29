"use client";

import { motion } from 'framer-motion';
import aboutData from '@/data/aboutPage/aboutPage.json';
import { PageHero } from '@/components/ui/PageHero';
import { JointlyOrganizedSection } from '@/components/aboutPage/JointlyOrganizedSection';
import { Scope } from '@/components/aboutPage/Scope';
import { AboutOrganizersSection } from '@/components/aboutPage/AboutOrganizerSection';
import { StudentAwardSection } from '@/components/aboutPage/StudentAwardSection';


export default function AboutPage() {
    return (
        <motion.div 
            className="bg-gray-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* 2. Use the new PageHero, passing data as props */}
            <PageHero
                title={aboutData.hero.title}
                subtitle={aboutData.hero.subtitle}
                backgroundImage={aboutData.hero.backgroundImage}
            />
            
            <JointlyOrganizedSection />
            <Scope />
            <AboutOrganizersSection />
            <StudentAwardSection />
            {/* You can continue to add your other page sections here */}

        </motion.div>
    );
}