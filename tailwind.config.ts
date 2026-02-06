import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        info: 'var(--color-info)',
        'background-default': 'var(--color-background-default)',
        'button-main': 'var(--color-button-main)',
        'button-light': 'var(--color-button-light)',
        'declaration-main': 'var(--color-declaration-main)',
        'declaration-instruction': 'var(--color-declaration-instruction)',
        'declaration-help': 'var(--color-declaration-help)',
      },
    },
  },
  plugins: [],
} satisfies Config
