export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: ["@pinia/nuxt", "@unocss/nuxt", "nuxt-icon", "@vueuse/nuxt", "@nuxt/eslint"],
	vite: {},
	runtimeConfig: {
		apworldPath: "",
	},
	components: {
		global: true,
		dirs: ["~/components"],
	},
	experimental: {
		asyncContext: true,
	},
});
