"use client";

import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import pageData from '@/data/committeePage/committePage.json';

export const TechnicalCommitteeSection = () => {
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
        <Section id="technical" className="bg-gray-50">
            <SectionTitle>{pageData.technicalCommittee.title}</SectionTitle>
             <motion.ul 
                className="mt-12 grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2 lg:grid-cols-3"
                variants={listContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                {pageData.technicalCommittee.members.map(member => (
                    <motion.li 
                        key={member.name}
                        className="border-l-4 border-indigo-200 pl-4"
                        variants={listItemVariants}
                    >
                        <div>
                            <p className="font-bold text-gray-800">{member.name}</p>
                            <p className="text-sm text-gray-600">{member.affiliation}</p>
                        </div>
                    </motion.li>
                ))}
            </motion.ul>
        </Section>
    );
};