import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import prettierPlugin from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";
import unusedImports from "eslint-plugin-unused-imports";

export default [
  {
    files: ["**/*.ts"],

    languageOptions: {
      parser: tsparser, // ใช้ parser ของ TypeScript

      parserOptions: {
        project: "./tsconfig.json", // เปิด type-aware lint (ฉลาดขึ้น แต่ช้าขึ้นนิดนึง)
        tsconfigRootDir: import.meta.dirname, // ให้ ESLint หา tsconfig ได้ถูก path
      },
    },

    plugins: {
      "@typescript-eslint": tseslint, // plugin สำหรับ rule ของ TypeScript
      prettier: prettierPlugin, // ใช้ Prettier ตรวจ format ผ่าน ESLint
      "unused-imports": unusedImports, // ลบ import / ตัวแปรที่ไม่ได้ใช้
    },

    rules: {
      ...tseslint.configs.recommended.rules, // rule แนะนำพื้นฐานของ TypeScript ESLint

      "prettier/prettier": "error", // บังคับ format ตาม Prettier

      // =========================
      // JavaScript safety rules
      // =========================

      "prefer-const": "error", // ถ้าไม่เปลี่ยนค่าให้ใช้ const แทน let
      "no-var": "error", // ห้ามใช้ var (กัน scope เพี้ยน)
      eqeqeq: "error", // บังคับใช้ === แทน ==
      "no-unreachable": "error", // โค้ดหลัง return จะ error
      "no-duplicate-imports": "error", // ห้าม import ซ้ำไฟล์เดียวกัน
      curly: "error", // บังคับใส่ {} ใน if/for
      "no-console": "warn", // เตือนเวลาใช้ console (เหมาะกับ production)

      // =========================
      // TypeScript safety rules
      // =========================

      "@typescript-eslint/no-misused-promises": "error", // กันใช้ async ผิด context (เช่น React handler)
      "@typescript-eslint/no-explicit-any": "warn", // เตือนการใช้ any (ลด type safety)
      "@typescript-eslint/no-floating-promises": "error", // บังคับให้จัดการ promise เสมอ
      "@typescript-eslint/await-thenable": "error", // ห้าม await ของที่ไม่ใช่ promise

      // =========================
      // Unused code cleanup
      // =========================
      "unused-imports/no-unused-imports": "error", // ลบ import ที่ไม่ได้ใช้
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all", // ตรวจตัวแปรทั้งหมด
          varsIgnorePattern: "^_", // ถ้าขึ้นต้นด้วย _ จะไม่เตือน
          args: "after-used", // argument ที่ไม่ได้ใช้ต้องอยู่ท้าย ๆ
          argsIgnorePattern: "^_", // parameter ที่ขึ้นต้นด้วย _ จะไม่เตือน
        },
      ],
    },
    // Note: flat config (`eslint.config.js`) does not support `extends`.
    // eslint-config-prettier is intentionally omitted here to avoid the
    // "extends" flat-config error. If you rely on prettier's config
    // to disable conflicting rules, migrate to legacy config or include
    // the necessary rule disabling manually.
    ignores: ["dist", "node_modules"],
  },
];
