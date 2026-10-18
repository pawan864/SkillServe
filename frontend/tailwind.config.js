/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        skillserve: {
          primary: '#4F46E5',         // Royal Indigo
          'primary-hover': '#4338CA',
          'primary-light': '#EEF2FF',
          accent: '#FF5B35',          // Electric Coral Orange
          'accent-hover': '#EA4B26',
          'accent-light': '#FFF1EE',
          dark: '#0F172A',            // Slate 900
          surface: '#F8FAFC',         // Crisp Slate 50
          card: '#FFFFFF',
          border: '#E2E8F0',
          muted: '#64748B'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'brand': '0 4px 20px -2px rgba(79, 70, 229, 0.12)',
        'brand-hover': '0 12px 28px -4px rgba(79, 70, 229, 0.22)',
        'accent': '0 4px 15px rgba(255, 91, 53, 0.25)',
      }
    },
  },
  plugins: [],
}
