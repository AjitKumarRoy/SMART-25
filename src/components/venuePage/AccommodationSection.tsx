"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import pageData from '@/data/venuePage/venuePage.json';
import { FaArrowRight } from 'react-icons/fa';

export const AccommodationSection = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1, 
            transition: { staggerChildren: 0.15 } 
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
    };
    
    return (
        <Section>
            <SectionTitle>Nearby Accommodation</SectionTitle>
            <motion.div 
                className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true, amount: 0.2 }}
                variants={containerVariants}
            >
                {pageData.accommodation.map(hotel => (
                    <motion.div 
                        key={hotel.name} 
                        className="rounded-xl border border-gray-200 bg-white p-6 shadow-md"
                        variants={itemVariants}
                    >
                        <h3 className="text-xl font-bold text-gray-900">{hotel.name}</h3>
                        <p className="mt-1 text-sm font-semibold text-indigo-600">{hotel.distance}</p>
                        <Link href={hotel.link} target="_blank" className="group mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gray-700 hover:text-indigo-600">
                            Visit Website <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                        </Link>
                    </motion.div>
                ))}
            </motion.div>
        </Section>
    );
};