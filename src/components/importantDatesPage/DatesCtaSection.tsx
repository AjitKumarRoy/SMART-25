import Link from 'next/link';
import { FaArrowRight, FaTicketAlt } from 'react-icons/fa';
import { Section } from '@/components/ui/Section';
import pageData from '@/data/importantDatesPage/importantDates.json';

export const DatesCtaSection = () => {
  return (
    <Section className="bg-gray-50">
      <div className="mx-auto max-w-4xl rounded-xl bg-white p-12 text-center shadow-lg border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">{pageData.cta.title}</h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-gray-600">
          {pageData.cta.subtitle}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href={pageData.cta.submitLink} className="group inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-md transition-all duration-300 hover:bg-indigo-500 hover:scale-105 sm:w-auto">
            Submit Your Paper <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link href={pageData.cta.registerLink} className="group inline-flex w-full items-center justify-center rounded-md border-2 border-gray-300 px-6 py-3 text-base font-semibold text-gray-700 transition-all duration-300 hover:border-indigo-600 hover:bg-indigo-50 sm:w-auto">
            Register Now <FaTicketAlt className="ml-2 transition-transform group-hover:rotate-12" />
          </Link>
        </div>
      </div>
    </Section>
  );
};