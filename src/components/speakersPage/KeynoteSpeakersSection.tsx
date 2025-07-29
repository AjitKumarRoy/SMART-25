"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import pageData from '@/data/speakersPage/speakersPage.json';
import { FaLinkedin } from 'react-icons/fa';

export const KeynoteSpeakersSection = () => {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.2 },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    return (
        <Section>
            <SectionTitle>Keynote Speakers</SectionTitle>
            <motion.div
                className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
            >
                {pageData.keynoteSpeakers.map((speaker) => (
                    <motion.div 
                        key={speaker.name} 
                        className="flex flex-col gap-6 rounded-xl border border-gray-200 bg-white p-6 shadow-lg sm:flex-row"
                        variants={itemVariants}
                    >
                        <div className="relative h-40 w-40 flex-shrink-0 self-center overflow-hidden rounded-full sm:self-start">
                            <Image src={speaker.image} alt={speaker.name} fill className="object-cover" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900">{speaker.name}</h3>
                            <p className="mt-1 font-semibold text-indigo-600">{speaker.title}</p>
                            <p className="text-sm text-gray-500">{speaker.affiliation}</p>
                            <p className="mt-4 text-gray-700">{speaker.bio}</p>
                            <Link href={speaker.profileLink} target="_blank" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-indigo-700 hover:underline">
                                View Profile <FaLinkedin />
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </Section>
    );
};