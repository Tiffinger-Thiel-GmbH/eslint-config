module.exports = {
  extends: [
    "plugin:@typescript-eslint/recommended",
    "standard-with-typescript",

    // Has to be the last:
    "plugin:prettier/recommended"
  ],
  parserOptions: {
    project: "./tsconfig.json"
  },
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  },
  overrides: [
    {
      files: ["src/*.d.ts"],
      rules: {
        "@typescript-eslint/triple-slash-reference": "off"
      }
    }
  ],
  ignorePatterns: ['.eslintrc.js', '.prettierrc.js'],
}
