"use client";

import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { FaFilePdf, FaDownload } from 'react-icons/fa';

interface DownloadItem {
  title: string;
  description: string;
  link: string;
}

export const ScheduleDownloads = ({ downloads }: { downloads: DownloadItem[] }) => {
  return (
    <Section className="bg-gray-50 mb-20">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Download Full Schedules</h2>
            <p className="text-gray-600 mt-2">Get the detailed PDF agendas for offline and online tracks.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {downloads.map((item, index) => (
            <motion.a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-indigo-300 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex-shrink-0 h-14 w-14 flex items-center justify-center rounded-full bg-red-50 text-red-500 group-hover:bg-red-100 transition-colors">
                <FaFilePdf className="text-2xl" />
              </div>
              
              <div className="ml-5 flex-grow">
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{item.description}</p>
              </div>

              <div className="ml-4 text-gray-400 group-hover:text-indigo-600">
                <FaDownload />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </Section>
  );
};