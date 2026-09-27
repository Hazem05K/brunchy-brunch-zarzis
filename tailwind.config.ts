import type { Config } from 'tailwindcss'

export default {
  theme: {
    extend: {
      colors: {
        navy: '#022252',
        sky: '#AFE0FE',
        cream: '#FFF5E6',
        orange: '#F4A261',
        yolk: '#E9C46A',
        mist: '#FFF5E6',
      },
      fontFamily: {
        sans: ['Manrope', 'Arial', 'Helvetica', 'sans-serif'],
        display: ['DM Serif Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        card: '0 18px 55px rgba(2, 34, 82, 0.08)',
      },
    },
  },
} satisfies Partial<Config>
