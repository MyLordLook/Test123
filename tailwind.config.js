/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      colors: {
        luxury: {
          bg: '#FAFAF8',
          dark: '#1a1a1a',
          muted: '#888888',
          border: '#e8e8e8',
          cream: '#F5F0E8',
          accent: '#2a2a2a',
        },
      },
      letterSpacing: {
        editorial: '-0.02em',
        label: '0.15em',
        wide: '0.1em',
      },
    },
  },
  plugins: [],
};
