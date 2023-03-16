// eslint-disable-next-line import/no-commonjs
module.exports = {
  root: true,
  extends: ['@jetbrains', '@jetbrains/eslint-config/browser', '@jetbrains/eslint-config/es6', '@jetbrains/eslint-config/node', '@jetbrains/eslint-config/react'],
  rules: {
    '@typescript-eslint/no-var-requires': 'off', '@next/next/no-img-element': 'off'
  }
};
