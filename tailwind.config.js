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
          green: '#00C389',
          'green-light': '#10B981',
          'green-glow': '#34D399',
          navy: '#0A111E',
          'navy-surface': '#0F1A2E',
          'navy-card': '#13213A',
          'navy-border': 'rgba(255, 255, 255, 0.08)',
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
        'glow-emerald': '0 0 25px -4px rgba(0, 195, 137, 0.35)',
        'glow-subtle': '0 0 40px -10px rgba(0, 195, 137, 0.15)',
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
