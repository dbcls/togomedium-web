/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  semi: true,
  trailingComma: "es5",
  singleQuote: false,
  tabWidth: 2,
  printWidth: 100,
  plugins: [
    "prettier-plugin-tailwindcss",
    "./node_modules/@typespec/prettier-plugin-typespec/dist/index.js",
  ],
  tailwindFunctions: ["clsx"],
  singleAttributePerLine: true,
  overrides: [{ files: "*.tsp", options: { parser: "typespec" } }],
};
export default config;
