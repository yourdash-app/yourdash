/*
 * Copyright © 2022 Ewsgit
 * All rights reserved.
 * Licensed under the MIT License - https://ewsgit.github.io/devdash/copyright
 */

function withOpacityValue(variable) {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`;
    }
    return `rgb(var(${variable}) / ${opacityValue})`;
  };
}

function withOpacityHardcoded(colorData) {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(${colorData})`;
    }
    return `rgb(${colorData} / ${opacityValue})`;
  };
}

module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        branding: {
          hover: withOpacityHardcoded('251 122 91'),
          primary: withOpacityHardcoded('235 106 75'),
          active: withOpacityHardcoded('219 90 59'),
          'disabled-hover': withOpacityHardcoded('59 59 59'),
          disabled: withOpacityHardcoded('75 75 75')
        },

        text: {
          primary: withOpacityHardcoded('255 255 255'),
          secondary: withOpacityHardcoded('221 221 221'),
          'inverted-primary': withOpacityHardcoded('0 0 0'),
          'inverted-secondary': withOpacityHardcoded('34 34 34')
        },
        bg: {
          'light-primary': withOpacityHardcoded('228 228 228'),
          'light-secondary': withOpacityHardcoded('197 197 197'),
          'dark-primary': withOpacityHardcoded('140 140 140'),
          'dark-secondary': withOpacityHardcoded('81 81 81')
        },
        content: {
          light: withOpacityHardcoded('70 70 70'),
          normal: withOpacityHardcoded('54 54 54'),
          dark: withOpacityHardcoded('38 38 38'),
          border: withOpacityHardcoded('80 80 80')
        }
      },
      animation: {
        'pulse-spin': 'pulse infinite linear 4s, spin infinite linear 2s',
        'top-bottom': 'top-bottom var(--animation-duration) 0.5s infinite linear',
        'spin': 'spin var(--animation-duration) infinite linear',
        'expand-in-horizontal':
          'expand-horizontal var(--animation-duration) linear',
        'expand-in-horizontal-loop':
          'expand-horizontal var(--animation-duration) linear infinite',
        'fade-in': 'fade-in var(--animation-duration) linear forwards'
      },
      keyframes: {
        'top-bottom': {
          '0%': {
            top: '0',
            transform: 'translateY(0)'
          },
          '50%': {
            top: '100%',
            transform: 'translateY(-100%)'
          },
          '100%': {
            top: '0',
            transform: 'translateY(0)'
          }
        },
        'expand-horizontal': {
          '0%': {
            width: '0'
          },
          '100%': {
            width: '100%'
          }
        },
        'fade-in': {
          '0%': {
            opacity: '0'
          },
          '100%': {
            opacity: '1'
          }
        }
      }
    }
  },
  plugins: [
    require('tailwindcss-image-rendering')(),
    function ({ addVariant }) {
      addVariant('child', '& > *');
      addVariant('child-hover', '& > *:hover');
      addVariant('child-active', '& > *:active');
    }
  ]
};
