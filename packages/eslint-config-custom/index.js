module.exports = {
    extends: ["turbo", "prettier", "eslint:recommended", "plugin:@typescript-eslint/recommended", "@jetbrains/eslint-config/browser", "@jetbrains/eslint-config/es6", "@jetbrains/eslint-config/node", "@jetbrains/eslint-config/react"],
    rules: {
        "import/extensions": "off",
        "react/jsx-no-literals": "off",
        "react/react-in-jsx-scope": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        "import/order": "off",
        "@next/next/no-img-element": "off",
        "arrow-body-style": ["error", "always"],
        "react/jsx-curly-spacing": [2, "always"]
    }
};
