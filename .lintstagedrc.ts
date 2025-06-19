import { type Configuration } from "lint-staged";

const config: Configuration = {
	// Lint and fix Next.js files
	"apps/web/**/*.{ts,tsx,js,jsx}": () => "bun run --cwd=apps/web lint --fix",

	// Lint and fix TypeScript and JavaScript files
	"**/*.{ts,tsx,js,jsx}": ["oxlint --fix", "eslint --fix --no-warn-ignored", "prettier --write --list-different"],

	// Format JSON and YAML files
	"**/*.{json,md,yml,yaml}": ["prettier --write --list-different"],
};

export default config;
