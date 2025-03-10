import type { Config } from 'tailwindcss';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          900: '#000000',
          800: '#111827',
          700: '#18212f',
          600: '#1f2937',
          500: '#374151',
          400: '#394867',
          300: '#535c91',
          200: '#9290C3',
          100: '#D4BEE4',
          50: '#F5EFFF',
        },
        accent: {
          200: '#e0fbe2',
          300: '#d3f1df',
          500: '#85a98f',
        },
        grey: {
          /* grey */
          0: '#fff',
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          250: 'rgb(214 214 214)',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        myred: {
          200: '#F7A8C4',
          300: '#F37199',
          400: '#E53888',
        },
      },
    },
  },

  plugins: [],
} satisfies Config;
