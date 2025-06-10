import unusedImports from "eslint-plugin-unused-imports";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import prettierConfig from "eslint-config-prettier";
import nextPlugin from "@next/eslint-plugin-next";
import reactPlugin from "eslint-plugin-react";
import tseslint from "typescript-eslint";
import globals from "globals";
import js from "@eslint/js";

const reactRecommended = reactPlugin.configs.recommended;

/** @type {import('eslint').Linter.Config[]} */
const config = [
	// Base configuration
	{
		ignores: ["**/node_modules", "**/.next", "**/dist", "**/build", "**/coverage", "**/out", "**/eslint.config.js"],
	},

	// JavaScript and TypeScript
	{
		files: ["**/*.{js,jsx,ts,tsx}"],
		languageOptions: {
			ecmaVersion: "latest",
			sourceType: "module",
			parser: tseslint.parser,
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
				ecmaVersion: "latest",
				sourceType: "module",
				project: ["./**/tsconfig.json"],
				tsconfigRootDir: import.meta.dirname,
			},
			globals: {
				...globals.browser,
				...globals.node,
				...globals.es2021,
			},
		},
		plugins: {
			"@typescript-eslint": tseslint.plugin,
			"unused-imports": unusedImports,
			react: reactPlugin,
			"react-hooks": reactHooksPlugin,
		},
		settings: {
			react: {
				version: "detect",
			},
			next: {
				rootDir: ["apps/*/"],
			},
		},
	},

	// React specific rules
	{
		files: ["**/*.{jsx,tsx}"],
		settings: {
			react: {
				version: "detect",
			},
		},
		rules: {
			...reactRecommended.rules,
			...reactHooksPlugin.configs.recommended.rules,
			"react/react-in-jsx-scope": "off", // Not needed with Next.js
			"react/prop-types": "off", // Not needed with TypeScript
			"react-hooks/exhaustive-deps": "warn",
		},
	},

	// Next.js specific rules
	{
		files: ["**/*.{js,jsx,ts,tsx}"],
		plugins: {
			"@next/next": nextPlugin,
		},
		rules: {
			...nextPlugin.configs.recommended.rules,
			...nextPlugin.configs["core-web-vitals"].rules,
			"@next/next/no-html-link-for-pages": "off", // If you're using the pages directory
			"@next/next/no-img-element": "off", // If you need to use img instead of next/image
		},
	},

	// TypeScript specific rules
	{
		files: ["**/*.{ts,tsx}"],
		rules: {
			...tseslint.configs.recommended.rules,
			...tseslint.configs.stylistic.rules,
			"@typescript-eslint/no-explicit-any": "warn",
			"@typescript-eslint/explicit-function-return-type": "off",
			"@typescript-eslint/explicit-module-boundary-types": "off",
			"@typescript-eslint/no-floating-promises": "error",
			"@typescript-eslint/no-unused-vars": [
				"warn",
				{
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^_",
					caughtErrorsIgnorePattern: "^_",
				},
			],
			"unused-imports/no-unused-imports": "error",
			"unused-imports/no-unused-vars": [
				"warn",
				{
					vars: "all",
					varsIgnorePattern: "^_",
					args: "after-used",
					argsIgnorePattern: "^_",
				},
			],
		},
	},

	// General JavaScript/TypeScript rules
	js.configs.recommended,
	prettierConfig,
];

export default config;
