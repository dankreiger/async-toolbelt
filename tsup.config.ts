import { defineConfig } from "tsup";

const SHARED_CONFIG = {
	dts: true,
	sourcemap: true,
	clean: true,
	shims: true,
};

const FORMATS = ["cjs", "esm"] as const;

export default defineConfig(
	FORMATS.map((format) => ({
		...SHARED_CONFIG,
		entry: ["src/index.ts"],
		minify: true,
		splitting: true,
		format,
	})),
);
