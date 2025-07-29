// FILE: src/app/layout.tsx
import "@/styles/globals.css";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
// Removed direct imports for Navbar, Footer, InitialLoader, NotificationBar, BannerSection
// as they are now managed by AppContentWrapper
import { LoadingProvider } from "@/context/LoadingContext"; // Keep LoadingProvider
import AppContentWrapper from "@/components/AppContentWrapper"; // Import the new wrapper component

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: '--font-plus-jakarta-sans' });

export const metadata = {
  title: "SMART'25",
  description: "4th International Conference on Sustainable Multidisciplinary Artificial Intelligence Research for Global Transformations - 2025",

   // --- ADD THIS LINE FOR THE APPLE MOBILE WEB APP TITLE ---
  appleWebApp: {
    title: "smart'25",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${plusJakartaSans.variable}`}>
      <body>
        {/* Wrap the entire AppContentWrapper with LoadingProvider */}
        <LoadingProvider>
          <AppContentWrapper>{children}</AppContentWrapper>
        </LoadingProvider>
      </body>
    </html>
  );
}
