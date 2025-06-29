import { glob } from "glob";

export const ROOT_ENV_GLOB_PATTERN = ".env{,.development,.test,.production,.staging}{,.local}";
export const CHILDREN_ENV_GLOB_PATTERN = `*/**/${ROOT_ENV_GLOB_PATTERN}`;
export const PACKAGE_JSON_GLOB_PATTERN = "**/package.json";

export function getFiles(globPattern: string, rootDir: string): Promise<string[]> {
	return glob(globPattern, {
		cwd: rootDir,
		nodir: true,
		absolute: true,
		dot: true,
		ignore: ["**/node_modules/**", "**/dist/**", "**/build/**", "**/coverage/**", "**/out/**"],
	});
}

export function getPackageJsonFiles(rootDir: string): Promise<string[]> {
	return getFiles(PACKAGE_JSON_GLOB_PATTERN, rootDir);
}

export function getChildrenEnvFiles(rootDir: string): Promise<string[]> {
	return getFiles(CHILDREN_ENV_GLOB_PATTERN, rootDir);
}

export function getRootEnvFiles(rootDir: string): Promise<string[]> {
	return getFiles(ROOT_ENV_GLOB_PATTERN, rootDir);
}
