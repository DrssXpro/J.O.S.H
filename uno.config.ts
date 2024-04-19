import { defineConfig, presetUno } from "unocss";

export default defineConfig({
	presets: [presetUno()],
	shortcuts: {
		"config-items-layout": "grid grid-cols-2 gap-2"
	}
});
