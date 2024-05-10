export const useWorld = defineStore("world", () => {
	const game: Ref<Game | null> = ref(null);
	const items: Ref<Item[] | null> = ref(null);
	const locations = ref();
	const categories = ref();
	const regions = ref();

	async function init() {
		try {
			const results = await Promise.all([
				useFetch("/categories"),
				useFetch<Game>("/game"),
				useFetch<Item[]>("/items"),
				useFetch("/locations"),
				useFetch("/regions"),
			]);

			categories.value = results[0].data.value;
			game.value = results[1].data.value;
			items.value = results[2].data.value;
			locations.value = results[3].data.value;
			regions.value = results[4].data.value;
		} catch (error) {
			console.error(error);
		}
	}

	function addStartingItemsToBlock(blockIndex: number, items: string[]) {
		items.forEach((item) => {
			game.value?.starting_items.at(blockIndex)?.items?.push(item);
		});
	}

	return { game, items, locations, categories, regions, init, addStartingItems: addStartingItemsToBlock };
});
