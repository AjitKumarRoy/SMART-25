"use client";

import { motion, Variants } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import pageData from '@/data/committeePage/committePage.json';

export const OrganizingCommitteeSection = () => {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };
    
    return (
        <Section>
            <SectionTitle>{pageData.organizingCommittee.title}</SectionTitle>
            <motion.div
                className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                {pageData.organizingCommittee.subcommittees.map(committee => (
                    <motion.div 
                        key={committee.name}
                        className="rounded-lg border border-gray-200 bg-white p-6 shadow-md"
                        variants={itemVariants}
                    >
                        <h3 className="text-xl font-bold text-indigo-700">{committee.name}</h3>
                        <ul className="mt-4 space-y-2">
                            {committee.members.map(member => (
                                <li key={member} className="text-gray-600">{member}</li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </motion.div>
        </Section>
    );
};