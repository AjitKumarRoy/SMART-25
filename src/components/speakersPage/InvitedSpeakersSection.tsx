"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import pageData from '@/data/speakersPage/speakersPage.json';

export const InvitedSpeakersSection = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };
    
    return (
        <Section className="bg-gray-50">
            <SectionTitle>Invited Speakers</SectionTitle>
            <motion.div 
                className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
            >
                {pageData.invitedSpeakers.map((speaker) => (
                    <motion.div key={speaker.name} className="text-center" variants={itemVariants}>
                        <div className="relative mx-auto h-40 w-40 overflow-hidden rounded-full shadow-lg">
                             <Image src={speaker.image} alt={speaker.name} fill className="object-cover" />
                        </div>
                        <h3 className="mt-4 text-xl font-bold text-gray-900">{speaker.name}</h3>
                        <p className="font-semibold text-indigo-600">{speaker.title}</p>
                        <p className="text-sm text-gray-500">{speaker.affiliation}</p>
                    </motion.div>
                ))}
            </motion.div>
        </Section>
    );
};