import type { KnipConfig } from "knip";

const localAndScripts = ["*.{ts,js}", "scripts/**/*.{ts,js}"];
const indexEntry = "src/index.{ts,js}";
const project = "**/*.{ts,js}";
const ignoreBinaries = ["fly"];
const ignoreTsconfigDependencies = ["@deploy-fly-bun-hono-nextjs/tsconfig"];

const config: KnipConfig = {
	workspaces: {
		".": {
			entry: localAndScripts,
			project: localAndScripts,
			ignoreDependencies: ignoreTsconfigDependencies,
		},

		"apps/server": {
			entry: indexEntry,
			project,
			ignoreBinaries,
		},

		// https://knip.dev/reference/plugins/next#_top
		"apps/web": {
			ignoreBinaries,
			ignoreDependencies: ["tailwindcss", "tw-animate-css", "eslint", "eslint-config-next", "postcss"],
		},

		"packages/config": {
			ignore: ["src/utils/*"],
		},

		"packages/tsconfig": {
			entry: "base.json",
		},
	},
};

export default config;
