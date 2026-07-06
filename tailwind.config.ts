<<<<<<< HEAD
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E8F5F0',
          100: '#C5E6D6', 
          200: '#9ED5B9',
          300: '#6CC39B',
          400: '#45B584',
          500: '#0A6E57',
          600: '#085F4B',
          700: '#064F3F',
          800: '#053F32',
          900: '#032F26',
        },
        secondary: {
          50: '#FDF8ED',
          100: '#F9EED1',
          200: '#F5E6C8',
          300: '#F0D7A3',
          400: '#E4C07A',
          500: '#D4A853',
          600: '#B88E3F',
          700: '#9A7430',
          800: '#7C5C24',
          900: '#5E451B',
        },
        accent: '#F5E6C8',
        background: '#F8F6F2',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #0A6E57 0%, #1A936F 100%)',
        'gradient-gold': 'linear-gradient(135deg, #D4A853 0%, #F5E6C8 100%)',
        'gradient-hero': 'linear-gradient(135deg, #0A6E57 0%, #085F4B 50%, #064F3F 100%)',
      },
      backdropBlur: {
        glass: '16px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'pulse-subtle': 'pulseSubtle 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
export default config
=======
module.exports = {

  content: [

    './pages/**/*.{js,ts,jsx,tsx}',

    './components/**/*.{js,ts,jsx,tsx}',

  ],

  theme: {

    extend: {},

  },

  plugins: [],

};
>>>>>>> 380df23ce009fbc0877bf92a43e148d857e57871
