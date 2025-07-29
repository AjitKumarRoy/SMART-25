"use client";

import { motion } from 'framer-motion';
import { PageHero } from '@/components/ui/PageHero';
import { AboutVenueSection } from '@/components/venuePage/AboutVenueSection';
import { TravelInfoSection } from '@/components/venuePage/TravelInfoSection';
import { AccommodationSection } from '@/components/venuePage/AccommodationSection';
import pageData from '@/data/venuePage/venuePage.json';

export default function VenuePage() {
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

            <AboutVenueSection />
            <TravelInfoSection />
            <AccommodationSection />
            
        </motion.div>
    );
}