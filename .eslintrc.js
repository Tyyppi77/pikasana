module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/jsx-filename-extension': [1, { "extensions": [".js"] }],
    'import/no-named-as-default': 0,
    'import/no-named-as-default-member': 0,
    "indent": ["error", 4],
    "react/jsx-indent": [2, 4],
    "react/jsx-indent-props": [2, 4],
    "react/jsx-one-expression-per-line": "off",
    "react/prop-types": "off",
  },
};
