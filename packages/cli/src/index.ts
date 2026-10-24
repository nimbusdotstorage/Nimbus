#!/usr/bin/env bun
import { readFileSync } from "node:fs";
import { Command } from "commander";

const API = process.env.NIMBUS_API_URL || "http://localhost:1284";
const TOKEN = process.env.NIMBUS_TOKEN || "";

const headers = () => ({
	Authorization: `Bearer ${TOKEN}`,
	"Content-Type": "application/json",
});

const program = new Command();
program.name("nimbus").description("Nimbus CLI — manage files from the terminal").version("0.1.0");

program
	.command("list")
	.description("List files")
	.option("-p, --parent <id>", "Parent folder ID")
	.action(async opts => {
		const url = new URL(`${API}/files`);
		if (opts.parent) url.searchParams.set("parentId", opts.parent);
		const res = await fetch(url.toString(), { headers: headers() });
		const data = await res.json();
		console.log(JSON.stringify(data, null, 2));
	});

program
	.command("upload <file>")
	.description("Upload a file")
	.option("-p, --parent <id>", "Parent folder ID")
	.action(async (file, opts) => {
		const form = new FormData();
		form.append("file", new Blob([readFileSync(file)]), file.split("/").pop());
		if (opts.parent) form.append("parentId", opts.parent);
		const res = await fetch(`${API}/files/upload`, {
			method: "POST",
			headers: { Authorization: `Bearer ${TOKEN}` },
			body: form,
		});
		const data = await res.json();
		console.log(JSON.stringify(data, null, 2));
	});

program
	.command("download <fileId>")
	.description("Download a file")
	.option("-o, --output <path>", "Output path", "./downloaded")
	.action(async (fileId, opts) => {
		const res = await fetch(`${API}/files/download?fileId=${fileId}`, { headers: headers() });
		const buf = await res.arrayBuffer();
		await Bun.write(opts.output, buf);
		console.log(`Downloaded to ${opts.output}`);
	});

program
	.command("delete <fileId>")
	.description("Delete a file")
	.action(async fileId => {
		const res = await fetch(`${API}/files?fileId=${fileId}`, {
			method: "DELETE",
			headers: headers(),
		});
		const data = await res.json();
		console.log(JSON.stringify(data, null, 2));
	});

program.parse();
