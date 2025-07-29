"use client";

import { motion } from 'framer-motion';
import { PageHero } from '@/components/ui/PageHero';
import pageData from '@/data/registrationPage/registrationPage.json';
import { FeesSection } from '@/components/registrationPage/FeesSection';
import { IncludedSection } from '@/components/registrationPage/IncludedSection';
import { CancellationPolicySection } from '@/components/registrationPage/CancellationPolicySection';

export default function RegistrationPage() {
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

            <FeesSection />
            <IncludedSection />
            <CancellationPolicySection />

        </motion.div>
    );
}