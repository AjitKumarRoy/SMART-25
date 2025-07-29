"use client";

import { motion } from 'framer-motion';
import { 
    FaRobot, 
    FaBuilding, 
    FaBolt, 
    FaBroadcastTower, 
    FaAtom, 
    FaCogs, 
    FaWrench, 
    FaPlug 
} from 'react-icons/fa';
import { Section } from '@/components/ui/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import cfpData from '@/data/callForPapersPage/callForPapers.json';

// The icon map is now encapsulated within the component that uses it
const iconMap: { [key: string]: React.ReactElement } = {
    FaRobot: <FaRobot className="h-8 w-8 text-white" />,
    FaCogs: <FaCogs className="h-8 w-8 text-white" />,
    FaBuilding: <FaBuilding className="h-8 w-8 text-white" />,
    FaBroadcastTower: <FaBroadcastTower className="h-8 w-8 text-white" />,
    FaBolt: <FaBolt className="h-8 w-8 text-white" />,
    FaAtom: <FaAtom className="h-8 w-8 text-white" />,
    FaWrench: <FaWrench className="h-8 w-8 text-white" />,
    FaPlug: <FaPlug className="h-8 w-8 text-white" />,
};

export const ThematicAreasSection = () => {
    return (
        <Section id="topics" className="bg-gray-50">
            <SectionTitle>Conference Themes and Topics</SectionTitle>
            <motion.div 
                className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={{
                    visible: { transition: { staggerChildren: 0.15 } }
                }}
            >
                {cfpData.thematicAreas.map((area) => (
                    <motion.div 
                        key={area.theme} 
                        className="rounded-xl border border-gray-200 bg-white p-8 shadow-lg"
                        variants={{
                            hidden: { opacity: 0, y: 50 },
                            visible: { opacity: 1, y: 0 }
                        }}
                    >
                        <div className="flex items-center gap-4">
                            <div className="flex h-16 w-16 flex-none items-center justify-center rounded-full bg-indigo-600">
                                {iconMap[area.icon]}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">{area.theme}</h3>
                        </div>
                        <ul className="mt-6 list-disc space-y-2 pl-5 text-gray-600">
                            {area.topics.map((topic) => (
                                <li key={topic}>{topic}</li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </motion.div>
        </Section>
    );
};