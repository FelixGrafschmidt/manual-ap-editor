export const useWorld = defineStore("world", () => {
	const game: Ref<Game | null> = ref(null);
	const items: Ref<Item[] | null> = ref(null);
	const locations = ref();
	const categories = ref();
	const regions = ref();

	async function init() {
		try {
			categories.value = (await useFetch("/categories")).data.value;
			game.value = (await useFetch<Game>("/game")).data.value;
			items.value = (await useFetch<Item[]>("/items")).data.value;
			locations.value = (await useFetch("/locations")).data.value;
			regions.value = (await useFetch("/regions")).data.value;
		} catch (error) {
			console.error(error);
		}
	}

	return { game, items, locations, categories, regions, init };
});
