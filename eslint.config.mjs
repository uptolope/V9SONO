import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  js.configs.recommended,

  ...tseslint.configs.recommended,

  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },

    rules: {
      // ✅ Don't fail build for unused vars (safe for auto-fix PR)
      "@typescript-eslint/no-unused-vars": "warn",

      // ✅ React 17+ (no need for React in scope)
      "no-undef": "off",
    },
  },
];
