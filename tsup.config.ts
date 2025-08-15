import childProcess from "node:child_process";
import fs from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { type Options, defineConfig } from "tsup";

const common: Options = {
	entry: ["src/index.ts"],
	treeshake: false,
	sourcemap: "inline",
	minify: true,
	clean: true,
	dts: true,
	splitting: false,
	format: ["cjs", "esm"],
	external: ["react", "react-dom"],
	injectStyle: false,
};

const getPackageName = async () => {
	try {
		const packageJson = JSON.parse(
			await readFile(path.join(__dirname, "package.json"), "utf-8"),
		);
		return packageJson.name || "package-name";
	} catch {
		return "package-name";
	}
};

const _addUseStatement = async (
	basePath: string,
	type: "server" | "client",
) => {
	const fullPath = path.join(__dirname, basePath);
	const files = fs.existsSync(fullPath) ? fs.readdirSync(fullPath) : [];
	for (const file of files) {
		if (file.endsWith(".js") || file.endsWith(".mjs")) {
			const filePath = path.join(fullPath, file);
			let content = await readFile(filePath, "utf-8");
			content = `"use ${type}";\n${content}`;
			fs.writeFileSync(filePath, content, "utf-8");
		}
	}
};

const linkSelf = async () => {
	// Don’t auto-link in CI or when explicitly disabled
	if (process.env.CI || process.env.SKIP_LINK) {
		return;
	}

	await new Promise<void>((resolve, reject) => {
		// IMPORTANT: use "npm run <script>" not "npm <script>"
		childProcess.exec("npm run link:self", (error) => {
			if (error) {
				// biome-ignore lint/suspicious/noConsole: <explanation>
				console.error("npm run link:self failed:", error);
				return reject(error);
			}
			resolve();
		});
	});
	// biome-ignore lint/suspicious/noConsoleLog: <explanation> // biome-ignore lint/suspicious/noConsole: <explanation>
	console.log(
		`\n🔗 Local link ready.\nIn another project, run:\n\n  npm link ${await getPackageName()}\n`,
	);
};

export default defineConfig({
	async onSuccess() {
		// If you need to add "use client"/"use server", uncomment:
		// await _addUseStatement('dist/react', 'client');

		await linkSelf();
	},
	...common,
});
