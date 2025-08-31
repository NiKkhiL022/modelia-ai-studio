/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        modelia: {
          50: '#faf7ff',
          100: '#f3ecff',
          200: '#e9dcff',
          300: '#d6bfff',
          400: '#bc94ff',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7c2d12',
          800: '#6b21a8',
          900: '#581c87',
          950: '#3b0764',
        },
        gradient: {
          from: '#e879f9',
          via: '#a855f7',
          to: '#3b82f6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'modelia-gradient':
          'linear-gradient(135deg, #e879f9 0%, #a855f7 50%, #3b82f6 100%)',
        'modelia-subtle':
          'linear-gradient(135deg, #faf7ff 0%, #f3ecff 50%, #e9dcff 100%)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        gradient: 'gradient 8s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}
