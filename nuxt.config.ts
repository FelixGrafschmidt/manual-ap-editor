export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: ["@pinia/nuxt", "@unocss/nuxt", "@nuxt/icon", "@vueuse/nuxt", "@nuxt/eslint"],
	vite: {},
	runtimeConfig: {
		apworldPath: "",
	},
	components: {
		global: true,
		dirs: ["~/components"],
	},
	compatibilityDate: "2024-07-06",
	experimental: {
		asyncContext: true,
	},
	extends: [["github:felixgrafschmidt/ui#v1.0.8", { install: true }]],
});
