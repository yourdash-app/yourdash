/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./src/**/*.tsx"], theme: {
    extend: {
      colors: {
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
        }, base: {
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
        }, container: {
          bg: "rgb(var(--container-bg) / <alpha-value>)",
          fg: "rgb(var(--container-fg) / <alpha-value>)",
          border: "rgb(var(--container-border) / <alpha-value>)",
        }, button: {
          bg: "rgb(var(--button-bg) / <alpha-value>)",
          fg: "rgb(var(--button-fg) / <alpha-value>)",
          border: "rgb(var(--button-border) / <alpha-value>)",
          hover: {
            bg: "rgb(var(--button-hover-bg) / <alpha-value>)",
            fg: "rgb(var(--button-hover-fg) / <alpha-value>)",
            border: "rgb(var(--button-hover-border) / <alpha-value>)",
          },
          active: {
            bg: "rgb(var(--button-active-bg) / <alpha-value>)",
            fg: "rgb(var(--button-active-fg) / <alpha-value>)",
            border: "rgb(var(--button-active-border) / <alpha-value>)",
          },
        },
      },
    },
  }, plugins: [function({ addVariant }) {
    addVariant("child", "& > *");
    addVariant("child-hover", "& > *:hover");
    addVariant("child-active", "& > *:active");
  }],
};
