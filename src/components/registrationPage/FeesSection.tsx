"use client";

import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import pageData from '@/data/registrationPage/registrationPage.json';

export const FeesSection = () => {
    return (
        <Section>
            <SectionTitle>Registration Fees</SectionTitle>
            <motion.div
                className="mx-auto mt-12 max-w-6xl"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8 }}
            >
                {/* Desktop Table */}
                <div className="hidden lg:block overflow-hidden rounded-xl border border-gray-200 shadow-lg">
                    {/* Header */}
                    <div className="grid grid-cols-5 bg-gray-100 text-center font-bold text-gray-800">
                        <div className="p-4 text-left">Category</div>
                        <div className="col-span-2 border-l border-gray-200 p-4">For Indian participants (INR)</div>
                        <div className="col-span-2 border-l border-gray-200 p-4">For Other participants (USD)</div>
                    </div>
                    <div className="grid grid-cols-5 bg-gray-50 text-center font-semibold text-gray-600">
                        <div className="p-3"></div>
                        <div className="border-l border-gray-200 p-3">Online</div>
                        <div className="border-l border-gray-200 p-3">Offline</div>
                        <div className="border-l border-gray-200 p-3">Online</div>
                        <div className="border-l border-gray-200 p-3">Offline</div>
                    </div>
                    {/* Rows */}
                    <div className="divide-y divide-gray-200">
                        {pageData.fees.map(fee => (
                            <div key={fee.category} className="grid grid-cols-5 items-center text-center">
                                <div className="p-4 text-left font-semibold text-gray-700">{fee.category}</div>
                                <div className="border-l border-gray-200 p-4 text-gray-600">{fee.indian.online}</div>
                                <div className="border-l border-gray-200 p-4 text-gray-600">{fee.indian.offline}</div>
                                <div className="border-l border-gray-200 p-4 text-gray-600">{fee.other.online}</div>
                                <div className="border-l border-gray-200 p-4 text-gray-600">{fee.other.offline}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mobile Cards */}
                <div className="block lg:hidden space-y-6">
                    {pageData.fees.map(fee => (
                        <div key={fee.category} className="rounded-lg border border-gray-200 bg-white p-6 shadow-md">
                            <h3 className="text-xl font-bold text-gray-900">{fee.category}</h3>
                            <div className="mt-4 grid grid-cols-2 gap-4">
                                <div>
                                    <p className="font-semibold text-indigo-700">Indian (INR)</p>
                                    <p className="text-gray-600">Online: {fee.indian.online}</p>
                                    <p className="text-gray-600">Offline: {fee.indian.offline}</p>
                                </div>
                                <div>
                                    <p className="font-semibold text-indigo-700">Other (USD)</p>
                                    <p className="text-gray-600">Online: {fee.other.online}</p>
                                    <p className="text-gray-600">Offline: {fee.other.offline}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                <p className="mt-6 text-center text-sm text-gray-600">
                    *{pageData.note}
                </p>
            </motion.div>
        </Section>
    );
};