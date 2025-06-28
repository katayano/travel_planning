import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // FlatCompatの形式に変換
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript', 'next', 'prettier']
  }),

  // 追加のTypeScriptルールを適用
  {
    files: ["**/*.{ts,tsx}"],
    // 上でnext/typescriptを定義しているので、ここで再定義しない
    // plugins: {
    //   "@typescript-eslint": await import("@typescript-eslint/eslint-plugin"),
    // },
    languageOptions: {
      // TypeScriptのパーサーを使用
      parser: (await import("@typescript-eslint/parser")).default,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // TypeScriptの厳格なルール
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    },
  },
  // Reactルール
  {
    files: ["**/*.{jsx,tsx}"],
    rules: {
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "react/display-name": "off",
      "react/jsx-curly-brace-presence": ["warn", { props: "never", children: "never" }],
      "react/self-closing-comp": ["warn", { component: true, html: true }],
    },
  },

  // インポート順序ルール
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      "import/order": [
        "warn",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index", "object", "type"],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
    },
  },
];

export default eslintConfig;
