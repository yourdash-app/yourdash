// noinspection DuplicatedCode

/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./src/**/*.tsx", "./src/**/*.ts"],
  theme: {
    extend: {
      screens: {
        "3xl": "1600px",
      },
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        theme: {
          50: "rgb(var(--theme-50) / <alpha-value>)",
          100: "rgb(var(--theme-100) / <alpha-value>)",
          200: "rgb(var(--theme-200) / <alpha-value>)",
          300: "rgb(var(--theme-300) / <alpha-value>)",
          400: "rgb(var(--theme-400) / <alpha-value>)",
          500: "rgb(var(--theme-500) / <alpha-value>)",
          600: "rgb(var(--theme-600) / <alpha-value>)",
          700: "rgb(var(--theme-700) / <alpha-value>)",
          800: "rgb(var(--theme-800) / <alpha-value>)",
          900: "rgb(var(--theme-900) / <alpha-value>)",
        },
        base: {
          50: "rgb(var(--base-50) / <alpha-value>)",
          100: "rgb(var(--base-100) / <alpha-value>)",
          200: "rgb(var(--base-200) / <alpha-value>)",
          300: "rgb(var(--base-300) / <alpha-value>)",
          400: "rgb(var(--base-400) / <alpha-value>)",
          500: "rgb(var(--base-500) / <alpha-value>)",
          600: "rgb(var(--base-600) / <alpha-value>)",
          700: "rgb(var(--base-700) / <alpha-value>)",
          800: "rgb(var(--base-800) / <alpha-value>)",
          900: "rgb(var(--base-900) / <alpha-value>)",
        },
        container: {
          bg: "rgb(var(--container-bg) / <alpha-value>)",
          fg: "rgb(var(--container-fg) / <alpha-value>)",
          border: "rgb(var(--container-border) / <alpha-value>)",
          secondary: {
            bg: "rgb(var(--container-secondary-bg) / <alpha-value>)",
            fg: "rgb(var(--container-secondary-fg) / <alpha-value>)",
            border: "rgb(var(--container-secondary-border) / <alpha-value>)",
          },
          tertiary: {
            bg: "rgb(var(--container-tertiary-bg) / <alpha-value>)",
            fg: "rgb(var(--container-tertiary-fg) / <alpha-value>)",
            border: "rgb(var(--container-tertiary-border) / <alpha-value>)",
          },
        },
        button: {
          bg: "rgb(var(--button-bg) / <alpha-value>)",
          fg: "rgb(var(--button-fg) / <alpha-value>)",
          hover: {
            bg: "rgb(var(--button-hover-bg) / <alpha-value>)",
            fg: "rgb(var(--button-hover-fg) / <alpha-value>)",
          },
          active: {
            bg: "rgb(var(--button-active-bg) / <alpha-value>)",
            fg: "rgb(var(--button-active-fg) / <alpha-value>)",
          },
        },
        input: {
          bg: "rgb(var(--input-bg) / <alpha-value>)",
          fg: "rgb(var(--input-fg) / <alpha-value>)",
          hover: {
            bg: "rgb(var(--input-hover-bg) / <alpha-value>)",
            fg: "rgb(var(--input-hover-fg) / <alpha-value>)",
          },
          active: {
            bg: "rgb(var(--input-active-bg) / <alpha-value>)",
            fg: "rgb(var(--input-active-fg) / <alpha-value>)",
          },
        },
      },
      borderRadius: {
        "button-rounding": "var(--button-rounding)",
        "input-rounding": "var(--input-rounding)",
        "container-rounding": "var(--container-rounding)",
        "container-secondary-rounding": "var(--container-secondary-rounding)",
        "container-tertiary-rounding": "var(--container-tertiary-rounding)",
      },
    },
  },
  plugins: [
    ({ addVariant }) => {
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
      addVariant("child-active", "& > *:active");
    },
    require("@tailwindcss/container-queries"),
  ],
};
