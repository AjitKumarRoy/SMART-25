interface SectionTitleProps {
  children: React.ReactNode;
}

export const SectionTitle = ({ children }: SectionTitleProps) => (
  <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-12">
    {children}
  </h2>
);