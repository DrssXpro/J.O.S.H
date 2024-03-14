import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import viteCompression from "vite-plugin-compression";
import WindiCSS from "vite-plugin-windicss";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url))
		}
	},
	plugins: [
		react(),
		WindiCSS(),
		// 压缩
		viteCompression({
			verbose: true,
			disable: false,
			threshold: 10240,
			algorithm: "gzip",
			ext: ".gz"
		})
	]
});
