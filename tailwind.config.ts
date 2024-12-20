import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: { raleway: 'var(--font-raleway)' },
      colors: {
        blue: {
          100: 'hsl(var(--color-blue-100))',
          150: 'hsl(var(--color-blue-150))',
          250: 'hsl(var(--color-blue-250))',
          300: 'hsl(var(--color-blue-300))',
          400: 'hsl(var(--color-blue-400))',
          500: 'hsl(var(--color-blue-500))',
          600: 'hsl(var(--color-blue-600))',
          700: 'hsl(var(--color-blue-700))',
          800: 'hsl(var(--color-blue-800))',
          900: 'hsl(var(--color-blue-900))',
          1000: 'hsl(var(--color-blue-1000))',
        },
        gray: {
          100: 'hsl(var(--color-gray-100))',
          200: 'hsl(var(--color-gray-200))',
          350: 'hsl(var(--color-gray-350))',
          400: 'hsl(var(--color-gray-400))',
          500: 'hsl(var(--color-gray-500))',
          600: 'hsl(var(--color-gray-600))',
          700: 'hsl(var(--color-gray-700))',
          800: 'hsl(var(--color-gray-800))',
          900: 'hsl(var(--color-gray-900))',
          1000: 'hsl(var(--color-gray-1000))',
        },
        pink: {
          100: 'hsl(var(--color-pink-100))',
          200: 'hsl(var(--color-pink-200))',
          300: 'hsl(var(--color-pink-300))',
          400: 'hsl(var(--color-pink-400))',
          500: 'hsl(var(--color-pink-500))',
          600: 'hsl(var(--color-pink-600))',
          700: 'hsl(var(--color-pink-700))',
          800: 'hsl(var(--color-pink-800))',
          900: 'hsl(var(--color-pink-900))',
          1000: 'hsl(var(--color-pink-1000))',
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        'card-grid':
          '0 1px 10px hsla(0, 0%, 0%, 0.07), 0 20px 25px hsla(0, 0%, 0%, 0.09)',
        'card-list':
          '0 1px 3px hsla(0, 0%, 0%, 0.1), 0 1px 2px hsla(0, 0%, 0%, 0.06)',
      },
      maxWidth: {
        section: '1400px',
      },
      keyframes: ({ theme }) => ({
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'shake-dollar': {
          '0%, 50%': {
            transform: 'rotate(10deg)',
          },
          '25%, 75%': {
            transform: 'rotate(-10deg)',
          },
          '100%': {
            fill: theme('colors.green.300'),
          },
        },
        appear: {
          from: {
            opacity: '0',
          },
          to: {
            opacity: '1',
          },
        },
      }),
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'shake-dollar': 'shake-dollar 300ms ease-in-out forwards',
        appear: 'appear 150ms linear forwards',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
