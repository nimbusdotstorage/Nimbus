export function fileSize(size: unknown) {
	let num = typeof size === "number" ? size : Number(size);
	if (typeof num !== "number" || isNaN(num) || num < 0) {
		return "--";
	}

	const units = ["B", "KB", "MB", "GB", "TB"];
	let idx = 0;
	while (num >= 1024 && idx < units.length - 1) {
		num /= 1024;
		idx++;
	}
	// Only apply Math.floor if it's not 'B' (Bytes)
	return `${idx === 0 ? num : Math.floor(num)} ${units[idx]}`;
}
