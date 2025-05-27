import { FlatCompat } from "@eslint/eslintrc";
import typescriptEslintParser from "@typescript-eslint/parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

const eslintConfig = [
	...compat.extends("next/core-web-vitals", "next/typescript"),
	{
		files: ["**/*.ts", "**/*.tsx"],
		languageOptions: {
			parser: typescriptEslintParser,
			parserOptions: {
				project: "./tsconfig.json",
			},
		},
	},
	{
		rules: {
			// Async/Await rules
			"@typescript-eslint/await-thenable": "error",
			"@typescript-eslint/require-await": "error",
			"@typescript-eslint/no-floating-promises": [
				"error",
				{ ignoreVoid: false },
			],
			"@typescript-eslint/no-misused-promises": [
				"error",
				{ checksVoidReturn: false },
			],
			"@typescript-eslint/promise-function-async": "error",
			"@typescript-eslint/no-unused-vars": [
				"error",
				{ argsIgnorePattern: "^_" },
			],

			// Code quality rules
			"@typescript-eslint/return-await": ["error", "always"],
			"@typescript-eslint/consistent-type-imports": [
				"error",
				{ prefer: "type-imports" },
			],
			"@typescript-eslint/no-unnecessary-condition": "warn",
			"@typescript-eslint/no-explicit-any": "warn",
			"@typescript-eslint/explicit-function-return-type": [
				"warn",
				{ allowExpressions: true, allowTypedFunctionExpressions: true },
			],
		},
	},
];

export default eslintConfig;
