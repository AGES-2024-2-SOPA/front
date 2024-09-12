/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-txt-primary)',
        secondary: 'var(--color-txt-secondary)',
        accent: 'var(--color-accent)',
        background: 'var(--color-background)',
        border: 'var(--color-border-shadow)',
      },

      boxShadow: {
        even: '0 0px 5px rgba(0, 0, 0, 0.15)', //shadow in all directions
      },
    },
  },
  plugins: [],
}

