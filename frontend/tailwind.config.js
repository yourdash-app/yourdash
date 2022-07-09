/*
 *   Copyright (c) 2022 Ewsgit
 *   All rights reserved.

 *   Permission is hereby granted, free of charge, to any person obtaining a copy
 *   of this software and associated documentation files (the "Software"), to deal
 *   in the Software without restriction, including without limitation the rights
 *   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *   copies of the Software, and to permit persons to whom the Software is
 *   furnished to do so, subject to the following conditions:
 
 *   The above copyright notice and this permission notice shall be included in all
 *   copies or substantial portions of the Software.
 
 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *   SOFTWARE.
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
  content: ["./pages/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        //homepage brand colors
        branding: {
          hover: withOpacityHardcoded("251 122 91"),
          primary: withOpacityHardcoded("235 106 75"),
          active: withOpacityHardcoded("219 90 59"),
          "disabled-hover": withOpacityHardcoded("59 59 59"),
          disabled: withOpacityHardcoded("75 75 75"),
        },

        text: {
          primary: withOpacityHardcoded("255 255 255"),
          secondary: withOpacityHardcoded("221 221 221"),
          "inverted-primary": withOpacityHardcoded("0 0 0"),
          "inverted-secondary": withOpacityHardcoded("34 34 34"),
        },

        bg: {
          "light-primary": withOpacityHardcoded("207 207 207"),
          "light-secondary": withOpacityHardcoded("238 238 238"),
          "dark-primary": withOpacityHardcoded("111 111 111"),
          "dark-secondary": withOpacityHardcoded("170 170 170"),
        },

        // content (navbar, cards, general ui)
        content: {
          light: withOpacityHardcoded("70 70 70"),
          normal: withOpacityHardcoded("54 54 54"),
          dark: withOpacityHardcoded("38 38 38"),
          border: withOpacityHardcoded("80 80 80"),
        },
      },
      animation: {
        "pulse-spin": "pulse infinite linear 4s, spin infinite linear 2s",
        "top-bottom": "top-bottom 2s 0.5s infinite linear",
        "spin-slower": "spin 2s infinite linear",
      },
      keyframes: {
        "top-bottom": {
          "0%": {
            top: "0",
            transform: "translateY(0)",
          },
          "50%": {
            top: "100%",
            transform: "translateY(-100%)",
          },
          "100%": {
            top: "0",
            transform: "translateY(0)",
          },
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-image-rendering")(),
    function({ addVariant }) {
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
      addVariant("child-active", "& > *:active");
      addVariant("body", "body");
    },
  ],
};
