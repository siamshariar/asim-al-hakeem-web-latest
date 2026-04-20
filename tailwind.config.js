/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        xs: '1rem',
        sm: '1.5rem',
        md: '2rem',
        lg: '2rem',
        xl: '2rem',
        '2xl': '2rem',
      },
    },
    screens: {
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a1f2e',
          light: '#2a3142',
          dark: '#0f131c',
        },
        secondary: {
          DEFAULT: '#6b7280',
          light: '#9ca3af',
          dark: '#4b5563',
        },
        accent: {
          DEFAULT: '#10b981',
          secondary: '#059669',
          tertiary: '#34d399',
          light: '#6ee7b7',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
        },
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444',
        info: '#3b82f6',
      },
      fontSize: {
        'fs-4': 'calc(1.275rem + 0.3vw)',
        'xxs': '0.625rem',
      },
      fontFamily: {
        primary: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        custom1: '0px 2px 40px 0px rgba(8, 70, 78, 0.08)',
        custom2: '0px 0px 30px 0px rgba(8, 73, 81, 0.06)',
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
        'glow': '0 0 20px rgba(16, 185, 129, 0.3)',
        'glow-lg': '0 0 30px rgba(16, 185, 129, 0.4)',
        'glow-xl': '0 0 40px rgba(16, 185, 129, 0.5)',
      },
      backgroundImage: {
        services: "url('/img/services/bg.svg')",
        testimonials: "url('/img/bg/bg.svg')",
        departments: "url('/img/departments/bg.svg')",
        quoteLeft: "url('/img/bg/quote-left.svg')",
        quoteRight: "url('/img/bg/quote-right.svg')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, #1a1f2e 0%, #2a3142 100%)',
        'gradient-accent': 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'shimmer': 'shimmer 2s infinite',
        'spin-slow': 'spin 3s linear infinite',
        'bounce-slow': 'bounce 2s ease-in-out infinite',
        'gradient': 'gradient 3s ease infinite',
        'scale-up': 'scaleUp 0.3s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          from: { opacity: '0', transform: 'translateY(-30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        scaleUp: {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },
      transitionDelay: {
        '2000': '2000ms',
        '3000': '3000ms',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem', 
      },
      lineClamp: {
        7: '7',
        8: '8',
        9: '9',
        10: '10',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
