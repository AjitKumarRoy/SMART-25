"use client";

import { motion } from 'framer-motion';
import pageData from '@/data/venuePage/venuePage.json';
import { PageHero } from '@/components/ui/PageHero';
import { AboutVenueSection } from '@/components/venuePage/AboutVenueSection';
import { TravelInfoSection } from '@/components/venuePage/TravelInfoSection';
import { AttractionsSection } from '@/components/homePage/AttractionSection';
// Note: The AccommodationSection is commented out as it was in your original code.

export const VenuePageClient = () => {
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
            {/* <AccommodationSection /> */}
            <AttractionsSection />
            
        </motion.div>
    );
};