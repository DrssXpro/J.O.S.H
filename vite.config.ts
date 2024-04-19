import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import viteCompression from "vite-plugin-compression";
import react from "@vitejs/plugin-react";
import UnoCSS from "unocss/vite";

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url))
		}
	},
	plugins: [
		react(),
		UnoCSS(),
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
