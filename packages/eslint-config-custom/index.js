// eslint-disable-next-line import/no-commonjs
module.exports = {
    extends: ["turbo", "prettier", "eslint:recommended", "plugin:@typescript-eslint/recommended"],
    rules: {
        "import/extensions": "off",
        "react/jsx-no-literals": "off",
        "react/react-in-jsx-scope": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        "import/order": "off",
        "@next/next/no-img-element": "off",
        "arrow-body-style": ["error", "always"],
        "react/jsx-curly-spacing": "off",
        "import/no-unresolved": "off",
    },
    settings: {
        "import/resolver": {
            node: {
                extensions: [".js", ".jsx", ".ts", ".tsx"],
            },
        },
    },
};
