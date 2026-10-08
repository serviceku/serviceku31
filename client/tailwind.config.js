/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          primary: '#0F172A',
          secondary: '#1E293B',
          accent: '#D4AF37',
          blue: '#0284C7',
          light: '#FAF8F5'
        }
      }
    },
  },
  plugins: [],
}
