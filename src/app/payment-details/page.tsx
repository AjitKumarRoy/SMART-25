"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import pageData from '@/data/paymentDetailsPage/paymentPage.json';
import { FaCopy, FaCheck, FaArrowRight } from 'react-icons/fa';

// Helper component for the copy button
const CopyButton = ({ textToCopy }: { textToCopy: string }) => {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    };
    return (
        <button onClick={handleCopy} className="text-gray-400 hover:text-indigo-600 transition-colors">
            {copied ? <FaCheck className="text-green-500" /> : <FaCopy />}
        </button>
    );
};

export default function PaymentDetailsPage() {
    return (
        <>
            <motion.div
                className="bg-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {/* Section 1: Page Hero */}
                <PageHero
                    title={pageData.hero.title}
                    subtitle={pageData.hero.subtitle}
                    backgroundImage={pageData.hero.backgroundImage}
                />

                {/* Section 2: Payment Options */}
                <Section>
                    <SectionTitle>Payment Options</SectionTitle>
                    <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
                        {/* Card 1: Account Transfer */}
                        <motion.div 
                            className="rounded-xl border border-gray-200 bg-gray-50 p-8 shadow-lg"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h3 className="text-2xl font-bold text-gray-900">Bank Account Transfer</h3>
                            <div className="mt-6 space-y-4">
                                {pageData.accountDetails.map(detail => (
                                    <div key={detail.label} className="flex justify-between items-center border-b border-gray-200 pb-2">
                                        <div>
                                            <p className="text-sm text-gray-500">{detail.label}</p>
                                            <p className="font-semibold text-gray-800">{detail.value}</p>
                                        </div>
                                        <CopyButton textToCopy={detail.value} />
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Card 2: QR Code */}
                        <motion.div 
                            className="rounded-xl border border-gray-200 bg-gray-50 p-8 text-center shadow-lg"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <h3 className="text-2xl font-bold text-gray-900">Scan QR Code (UPI)</h3>
                            <div className="relative mx-auto mt-6 h-64 w-64">
                                <Image src={pageData.qrCode.image} alt="Payment QR Code" fill className="object-contain" />
                            </div>
                            <p className="mt-4 text-gray-600">{pageData.qrCode.instruction}</p>
                        </motion.div>
                    </div>
                </Section>

                {/* Section 3: Post-Payment Instructions */}
                <Section className="bg-red-50 border-y border-red-200">
                    <div className="mx-auto max-w-4xl text-center">
                        <h2 className="text-3xl font-bold text-red-800">{pageData.postPayment.title}</h2>
                        <p className="mx-auto mt-4 max-w-2xl text-lg text-red-700">
                            {pageData.postPayment.description}
                        </p>
                        <div className="mt-8">
                            <Link href={pageData.postPayment.formLink} target="_blank" className="group inline-flex items-center justify-center rounded-md bg-red-600 px-8 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-red-500">
                                Go to Final Registration Form
                                <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>
                </Section>

            </motion.div>
        </>
    );
}