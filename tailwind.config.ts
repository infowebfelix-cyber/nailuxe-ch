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
        // Nailuxe brand palette
        obsidian: {
          DEFAULT: '#1A1A1A',
          light: '#2C2C2C',
          dark: '#0D0D0D',
        },
        ivory: {
          DEFAULT: '#F5F0E8',
          light: '#FAF7F2',
          dark: '#EDE6D8',
        },
        gold: {
          DEFAULT: '#C9A96E',
          light: '#D9C090',
          dark: '#A8854A',
          muted: '#C9A96E33',
        },
        rose: {
          nail: '#C4A09A',
          light: '#D4B8B3',
          dark: '#A8847D',
        },
        stone: {
          DEFAULT: '#8C8C8C',
          light: '#B0B0B0',
          dark: '#5C5C5C',
        },
      },
      fontFamily: {
        // ONE typeface across the entire site: Neue Haas Grotesk
        sans:    ["'Neue Haas Grotesk'", "'HelveticaNeue-Light'", "'Helvetica Neue'", 'Helvetica', 'Arial', 'sans-serif'],
        display: ["'Neue Haas Grotesk'", "'Helvetica Neue'", 'Helvetica', 'Arial', 'sans-serif'],
        heading: ["'Neue Haas Grotesk'", "'Helvetica Neue'", 'Helvetica', 'Arial', 'sans-serif'],
        body:    ["'Neue Haas Grotesk'", "'Helvetica Neue'", 'Helvetica', 'Arial', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 7vw, 6rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.25rem, 5vw, 4.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.75rem, 3.5vw, 3rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'fade-in-slow': 'fadeIn 1.4s ease-out forwards',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
      aspectRatio: {
        'portrait': '3 / 4',
        'wide': '16 / 9',
        'square': '1 / 1',
      },
    },
  },
  plugins: [],
}

export default config
