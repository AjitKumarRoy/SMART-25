// FILE: src/components/team/TeamMemberModal.tsx
"use client";

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaTimes, // Close icon
  FaGlobe, // Website
  FaLinkedin, // LinkedIn
  FaTwitter, // Twitter
  FaGithub, // GitHub
  FaGraduationCap, // Used for Google Scholar
  FaLink // Used for ResearchGate
} from 'react-icons/fa'; // Using Fa for social icons

// Define the shape of a single team member (matching team.json)
interface TeamMember {
  id: string;
  name: string;
  title: string;
  category: string;
  image: string;
  bio: string;
  socialLinks: {
    website?: string | null;
    researchGate?: string | null;
    googleScholar?: string | null;
    linkedin?: string | null;
    twitter?: string | null;
    github?: string | null;
  };
  contributions: Array<{
    project: string;
    role: string;
    years: string;
    description: string;
  }>;
  workingStatus: string;
  yearsWorked: string;
}

interface TeamMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: TeamMember | null;
}

const socialIconMap: { [key: string]: React.ElementType } = {
  website: FaGlobe,
  linkedin: FaLinkedin,
  twitter: FaTwitter,
  github: FaGithub,
  googleScholar: FaGraduationCap, // Changed to FaGraduationCap
  researchGate: FaLink, // Changed to FaLink
};

export default function TeamMemberModal({ isOpen, onClose, member }: TeamMemberModalProps) {
  if (!member) return null; // Don't render if no member is selected

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[100]" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white dark:bg-gray-900 p-6 text-left align-middle shadow-xl transition-all border border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-full p-2"
                  onClick={onClose}
                  aria-label="Close"
                >
                  <FaTimes className="h-6 w-6" />
                </button>

                <div className="flex flex-col md:flex-row gap-6">
                  {/* Left Column: Image and Basic Info */}
                  <div className="flex flex-col items-center md:items-start text-center md:text-left md:w-1/3">
                    <div className="relative w-40 h-40 rounded-full overflow-hidden mb-4 border-4 border-blue-600 dark:border-blue-400 shadow-lg">
                      <Image
                        src={member.image}
                        alt={member.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full"
                      />
                    </div>
                    <Dialog.Title as="h3" className="text-2xl font-bold leading-6 text-gray-900 dark:text-gray-100 mb-1">
                      {member.name}
                    </Dialog.Title>
                    <p className="text-md text-blue-600 dark:text-blue-400 mb-2">{member.title}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{member.bio}</p>

                    {/* Social Links */}
                    <div className="flex flex-wrap gap-3 mt-4 justify-center md:justify-start">
                      {Object.entries(member.socialLinks).map(([key, value]) => {
                        if (value) {
                          const Icon = socialIconMap[key];
                          return (
                            <Link
                              key={key}
                              href={value}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-800 hover:text-blue-600 dark:hover:text-blue-200 transition-colors duration-200 shadow-sm"
                              aria-label={`${member.name}'s ${key}`}
                            >
                              {Icon && <Icon className="w-5 h-5" />}
                            </Link>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>

                  {/* Right Column: Contributions and Status */}
                  <div className="md:w-2/3 mt-6 md:mt-0">
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 border-b pb-2 border-gray-200 dark:border-gray-700">
                      Contributions to the Group
                    </h4>
                    {member.contributions.length > 0 ? (
                      <ul className="space-y-4 max-h-64 overflow-y-auto custom-scrollbar pr-2">
                        {member.contributions.map((contribution, index) => (
                          <li key={index} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                            <p className="text-lg font-medium text-blue-700 dark:text-blue-300 mb-1">{contribution.project}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Role: {contribution.role}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Years: {contribution.years}</p>
                            <p className="text-base text-gray-800 dark:text-gray-200">{contribution.description}</p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-600 dark:text-gray-400">No specific contributions listed yet.</p>
                    )}

                    <div className="mt-6 border-t pt-4 border-gray-200 dark:border-gray-700">
                      <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Working Status:</p>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        member.workingStatus === 'Current'
                          ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                      }`}>
                        {member.workingStatus}
                      </span>
                      <p className="text-gray-600 dark:text-gray-400 mt-2">Years with Group: {member.yearsWorked}</p>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
