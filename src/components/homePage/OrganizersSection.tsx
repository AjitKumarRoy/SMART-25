import { Section } from '@/components/ui/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ScrollableCard } from '@/components/ui/ScrollableCard';
import organizersData from '@/data/homePage/organizers.json';

export const OrganizersSection = () => {
  return (
    <Section id="organizers">
      <SectionTitle>Organizing Institutions</SectionTitle>

      {/* --- NEW PARAGRAPH --- */}
      <p className="mx-auto -mt-8 mb-12 max-w-3xl text-center text-lg text-gray-600">
        Indian Institute Of Technology Bhilai, Villa College (Maldives) and  St. Mother Theresa Engineering College is jointly organizing this SMART-25 international conference.
      </p>

      {/* Responsive Container: Stacks vertically on mobile, row on large screens */}
      <div className="flex flex-col items-center justify-center gap-10 lg:flex-row lg:items-stretch">
        {organizersData.map((organizer) => (
          <ScrollableCard
            key={organizer.title}
            title={organizer.title}
            description={organizer.description}
            imageSrc={organizer.imageSrc}
          />
        ))}
      </div>
    </Section>
  );
};