module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
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
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/no-empty-function": 0,
    "vue/no-setup-props-destructure": 0,

    "semi": ["error", "never"],
    "quotes": [ "error", "double" ],
    "vue/no-unused-vars": "warn",
    "vue/require-v-for-key": "off",
    "vue/experimental-script-setup-vars": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error"
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
}
