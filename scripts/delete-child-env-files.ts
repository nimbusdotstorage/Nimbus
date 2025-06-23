import { getChildrenEnvFiles } from "./utils/glob-patterns";
import { unlink } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");

async function cleanChildEnvFiles(dryRun = false) {
	const envFiles = await getChildrenEnvFiles(rootDir);

	if (dryRun) {
		envFiles.forEach(file => console.log(`  📄 [DRY RUN] Would delete ${file}`));
		return;
	}

	await Promise.all(
		envFiles.map(file =>
			unlink(file)
				.then(() => console.log(`  ✅ Deleted ${file}`))
				.catch(err => console.error(`  ❌ Error deleting ${file}:`, err instanceof Error ? err.message : err))
		)
	);
}

export async function cleanChildEnv() {
	await cleanChildEnvFiles(false);
}

export async function cleanChildEnvDryRun() {
	await cleanChildEnvFiles(true);
}

async function main() {
	const isDryRun = process.argv.includes("--dry-run");
	console.log(`🚀 Starting to delete child .env files${isDryRun ? " (dry run)" : ""}`);

	if (isDryRun) {
		await cleanChildEnvDryRun();
	} else {
		await cleanChildEnv();
	}

	console.log("✨ Done!");
}

main().catch(err => console.error(err));
