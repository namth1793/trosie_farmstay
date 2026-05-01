/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f0f7ee',
          100: '#dce8d6',
          200: '#b5d1a9',
          300: '#80ae6e',
          400: '#578c43',
          500: '#3d7130',
          600: '#2d5a24',
          700: '#25481e',
          800: '#1e3a19',
          900: '#1B3418',
        },
        gold: {
          DEFAULT: '#C9A85B',
          light: '#DFC07E',
          dark: '#9E7E3B',
        },
        cream: {
          DEFAULT: '#F5F0E8',
          dark: '#EDE5D5',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Be Vietnam Pro"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
