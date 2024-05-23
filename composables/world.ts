import hash from "object-hash";

export const useWorld = defineStore("world", () => {
	const game: Ref<Game | null> = ref(null);
	const items: Ref<Item[] | null> = ref(null);
	const locations = ref();
	const categories: Ref<Categories | null> = ref(null);
	const regions = ref();
	const initialHash = ref();

	const currentHash = computed(() => hash([game.value, items.value, locations.value, categories.value, regions.value]));

	async function init() {
		try {
			const results = await Promise.all([
				useFetch<Categories>("/categories"),
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

			initialHash.value = hash([game.value, items.value, locations.value, categories.value, regions.value]);
		} catch (error) {
			console.error(error);
		}
	}

	async function save() {
		try {
			await Promise.all([
				$fetch("/categories", { body: categories.value, method: "PUT" }),
				$fetch("/game", { body: game.value, method: "PUT" }),
				$fetch("/items", { body: items.value, method: "PUT" }),
				$fetch("/locations", { body: locations.value, method: "PUT" }),
				$fetch("/regions", { body: regions.value, method: "PUT" }),
			]);
			await init();
		} catch (error) {
			console.error(error);
		}
	}

	function addStartingItemsToBlock(blockIndex: number, items: string[]) {
		items.forEach((item) => {
			game.value?.starting_items.at(blockIndex)?.items?.push(item);
		});
	}

	function addCategoryToItem(index: number, category: string) {
		items.value?.at(index)?.category?.push(category);
	}

	function removeCategoryFromItem(index: number, category: string) {
		const item = items.value?.at(index);
		if (item) {
			const index = item.category.indexOf(category);
			if (index > -1) {
				item.category.splice(index, 1);
			}
		}
	}

	return {
		game,
		items,
		locations,
		categories,
		regions,
		initialHash,
		currentHash,
		init,
		addStartingItems: addStartingItemsToBlock,
		addCategoryToItem,
		removeCategoryFromItem,
		save,
	};
});
