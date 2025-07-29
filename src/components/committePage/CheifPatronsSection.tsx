"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import pageData from '@/data/committeePage/committePage.json';

export const ChiefPatronsSection = () => {
    const listContainerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    const listItemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 },
    };

    return (
        <Section id="chiefPatron" className="bg-gray-50">
            <SectionTitle>{pageData.chiefPatrons.title}</SectionTitle>
            <motion.div
                className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2 lg:mx-auto lg:max-w-4xl"
                variants={listContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                {pageData.chiefPatrons.members.map(patron => (
                    <motion.div 
                        key={patron.name} 
                        className="flex flex-col items-center text-center sm:flex-row sm:text-left"
                        variants={listItemVariants}
                    >
                        <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-full shadow-lg">
                            <Image src={patron.image} alt={patron.name} fill className="object-cover" />
                        </div>
                        <div className="mt-4 sm:ml-6 sm:mt-0">
                            <h3 className="text-2xl font-bold text-gray-900">{patron.name}</h3>
                            <p className="text-md font-semibold text-indigo-600">{patron.affiliation}</p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </Section>
    );
};