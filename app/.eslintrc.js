module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier/@typescript-eslint",
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    "no-console": 0,
    "@typescript-eslint/ban-types": 0,
    "@typescript-eslint/explicit-module-boundary-types": 0,

    "semi": ["error", "never"],
    "quotes": [ "error", "double" ],
    "no-unused-vars": "warn",
    "vue/no-unused-vars": "warn",
    "vue/require-v-for-key": "off",
    "vue/experimental-script-setup-vars": "off"
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)",
      ],
      env: {
        mocha: true,
      },
    },
  ],
};
