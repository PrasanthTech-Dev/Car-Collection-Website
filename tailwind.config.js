/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: { 950: '#07070a', 900: '#0b0b10', 800: '#111118', 700: '#1a1a24', 600: '#262633' },
        gold: { 300: '#f1d9a0', 400: '#e6c071', 500: '#d4a64a', 600: '#b88a32' },
        crimson: { 500: '#e63946' },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        float: 'float 4s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
      },
    },
  },
  plugins: [],
}
