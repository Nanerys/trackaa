/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        trackaa: {
          // Darkened, rich emerald & forest greens
          green: '#047857', // Rich deep emerald
          'green-dark': '#065F46',
          'green-accent': '#059669',
          'green-light': '#10B981',
          'green-glow': 'rgba(5, 150, 105, 0.4)',
          
          // Rich deep navy blue
          navy: '#0F1E36',
          'navy-deep': '#0B1526',
          'navy-surface': '#15243E',
          'navy-card': '#192C4D',
          'navy-accent': '#1E3A8A',
          
          // Backgrounds
          'dark-bg': '#111827', // Lightened dark mode background (elevated titanium slate)
          'dark-surface': '#162032',
          'dark-card': '#1E293B',
          
          'light-bg': '#F8FAFC',
          'light-grain': '#F1F5F9',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"Inter"',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
      },
      boxShadow: {
        'glass-sm': '0 2px 10px 0 rgba(0, 0, 0, 0.05)',
        'glass-md': '0 8px 30px 0 rgba(0, 0, 0, 0.08)',
        'glass-lg': '0 20px 50px 0 rgba(0, 0, 0, 0.15)',
        'glow-emerald': '0 0 25px -4px rgba(5, 150, 105, 0.45)',
        'glow-navy': '0 0 30px -5px rgba(30, 58, 138, 0.35)',
        'glow-subtle': '0 0 40px -10px rgba(5, 150, 105, 0.2)',
      },
      borderRadius: {
        'apple-sm': '10px',
        'apple-md': '14px',
        'apple-lg': '20px',
        'apple-xl': '28px',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
