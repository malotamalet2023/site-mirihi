import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'mirihi-blue-1': '#2099D8',
        'mirihi-blue-2': '#239CCE',
        'mirihi-blue-3': '#27A6C2',
        'mirihi-teal': '#25B7AB',
        'mirihi-green-1': '#5BBE77',
        'mirihi-green-2': '#7EC44E',
        'mirihi-lime-1': '#8DD228',
        'mirihi-lime-2': '#ABD22A',
        'mirihi-text-black': '#000000',
        'mirihi-text-grey': '#57565A',
        'mirihi-text-dark-blue': '#104D6C',
        'mirihi-text-light-blue': '#1873A2',
      },
      backgroundImage: {
        'gradient-mirihi-blue': 'linear-gradient(135deg, #2099D8, #27A6C2)',
        'gradient-mirihi-teal': 'linear-gradient(135deg, #25B7AB, #27A6C2)',
        'gradient-mirihi-green': 'linear-gradient(135deg, #5BBE77, #7EC44E)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        slideUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(40px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-20px)',
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
