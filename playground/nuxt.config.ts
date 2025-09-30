import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
	modules: ["../src/module", "nuxt-shiki", "@nuxt/content"],
	nuxtSmoothy: {},
	devtools: { enabled: true },

	css: ["~/assets/css/main.css"],

	vite: {
		plugins: [tailwindcss()],
	},
});
