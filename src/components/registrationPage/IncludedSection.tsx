"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import pageData from '@/data/registrationPage/registrationPage.json';
import { FaCheckCircle, FaTicketAlt } from 'react-icons/fa';

export const IncludedSection = () => {
    return (
        <Section className="bg-indigo-50">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
                <div>
                    <SectionTitle>What's Included</SectionTitle>
                    <motion.ul
                        className="mt-8 space-y-4"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                    >
                        {pageData.included.map(item => (
                            <motion.li key={item} className="flex items-start gap-3"
                                variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
                            >
                                <FaCheckCircle className="mt-1 h-5 w-5 flex-none text-green-500" />
                                <span className="text-lg text-gray-700">{item}</span>
                            </motion.li>
                        ))}
                    </motion.ul>
                </div>
                {/* CTA Box */}
                <div className="rounded-xl bg-indigo-600 p-12 text-center shadow-2xl">
                    <h3 className="text-3xl font-bold text-white">Secure Your Spot Today!</h3>
                    <div className="mt-8">
                        <Link href="/payment-details" className="group inline-flex items-center justify-center rounded-md bg-white px-8 py-3 text-lg font-semibold text-indigo-600 shadow-lg transition-transform duration-300 hover:scale-105">
                            Register Now
                            <FaTicketAlt className="ml-2 transition-transform group-hover:rotate-12" />
                        </Link>
                    </div>
                </div>
            </div>
        </Section>
    );
};