    // tailwind.config.js
    /** @type {import('tailwindcss').Config} */
    module.exports = {
      darkMode: 'class', // <--- THIS IS ESSENTIAL for theme toggling
      content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
      ],
      theme: {
        extend: {
          fontFamily: {
            jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
          },
          colors: {
            // Keep this 'brown' definition if you use `bg-brown-600` in UpcomingEvents.tsx
            // Otherwise, you can remove this 'brown' block.
            brown: {
              50: '#fdf8f6',
              100: '#f2e8e5',
              200: '#eaddd7',
              300: '#dcd0c0',
              400: '#b5a4a2',
              500: '#8e7975',
              600: '#7c6a67',
              700: '#6a5b58',
              800: '#584c4a',
              900: '#463d3c',
            },
          },
          keyframes: {
            blob: {
              '0%': { transform: 'translate(0px, 0px) scale(1)' },
              '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
              '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
              '100%': { transform: 'translate(0px, 0px) scale(1)' },
            },
            scrollUp: {
              '0%': { transform: 'translateY(0%)' },
              '100%': { transform: 'translateY(-100%)' },
            },
          },
          animation: {
            blob: 'blob 7s infinite cubic-bezier(0.6, 0.4, 0.4, 0.8)',
            scrollUp: 'scrollUp var(--animation-duration) linear infinite',
          },
        },
      },
      plugins: [require('@tailwindcss/typography')], // <--- THIS LINE IS CRUCIAL
    };
    