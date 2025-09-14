import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
	compatibilityDate: "2025-07-15",
	devtools: { enabled: true },

	modules: ["@nuxt/content", "nuxt-shiki"],
	css: ["~/assets/css/main.css"],

	vite: {
		plugins: [tailwindcss()],
	},

	app: {
		pageTransition: { name: "page", mode: "out-in" },
	},
});
