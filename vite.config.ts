import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import WindiCSS from "vite-plugin-windicss";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url))
		}
	},
	plugins: [react(), WindiCSS()]
});
