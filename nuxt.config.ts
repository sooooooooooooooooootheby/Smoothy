import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
	compatibilityDate: "2025-07-15",
	devtools: { enabled: true },

	modules: ["@nuxt/content"],
	css: ["~/assets/css/main.css", "~/assets/css/text.css"],

	vite: {
		plugins: [tailwindcss()],
	},

	app: {
		pageTransition: { name: "page", mode: "out-in" },
	},
});
