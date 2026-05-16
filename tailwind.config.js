/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        soft: '0 18px 45px rgba(8, 47, 73, 0.12)'
      }
    }
  },
  plugins: []
};
