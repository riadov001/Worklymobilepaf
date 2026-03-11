/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#DC2626',
          'red-dark': '#B91C1C',
          'red-light': '#EF4444',
          'red-vivid': '#F87171',
        },
        dark: {
          base: '#0A0A0A',
          surface: '#161616',
          elevated: '#1C1C1C',
          border: '#2A2A2A',
          'border-light': '#1E1E1E',
        },
        text: {
          primary: '#F0F0F0',
          secondary: '#A8A8A8',
          tertiary: '#666666',
        },
      },
      fontFamily: {
        michroma: ['Michroma', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(ellipse 1200px 800px at 50% 30%, rgba(220,38,38,0.15) 0%, transparent 70%)',
        'grid-pattern': `
          linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
        `,
      },
      backgroundSize: {
        'grid': '80px 80px',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(220,38,38,0.2)' },
          '100%': { boxShadow: '0 0 60px rgba(220,38,38,0.5)' },
        },
      },
    },
  },
  plugins: [],
};
