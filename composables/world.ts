export const useWorld = defineStore("world", () => {
	const game: Ref<Game | null> = ref(null);
	const items: Ref<Item[] | null> = ref(null);
	const locations: Ref<APLocation[] | null> = ref(null);
	const categories: Ref<Categories | null> = ref(null);
	const regions = ref();
	const initialGame: Ref<Game | null> = ref(null);
	const initialItems: Ref<Item[] | null> = ref(null);
	const initialLocations: Ref<APLocation[] | null> = ref(null);
	const initialCategories: Ref<Categories | null> = ref(null);
	const initialRegions = ref();

	const gameChanges = computed(() => {
		return JSON.stringify(game.value) !== JSON.stringify(initialGame.value);
	});
	const itemChanges = computed(() => {
		return JSON.stringify(items.value) !== JSON.stringify(initialItems.value);
	});
	const locationChanges = computed(() => {
		return JSON.stringify(locations.value) !== JSON.stringify(initialLocations.value);
	});
	const categoryChanges = computed(() => {
		return JSON.stringify(categories.value) !== JSON.stringify(initialCategories.value);
	});
	const regionChanges = computed(() => {
		return JSON.stringify(regions.value) !== JSON.stringify(initialRegions.value);
	});

	const changes = computed(() => {
		return gameChanges.value || itemChanges.value || locationChanges.value || categoryChanges.value || regionChanges.value;
	});

	async function init() {
		try {
			const results = await Promise.all([
				useFetch<Categories>("/api/categories"),
				useFetch<Game>("/api/game"),
				useFetch<Item[]>("/api/items"),
				useFetch<APLocation[]>("/api/locations"),
				useFetch("/api/regions"),
			]);

			initialCategories.value = JSON.parse(JSON.stringify(results[0].data.value));
			categories.value = results[0].data.value;
			initialGame.value = JSON.parse(JSON.stringify(results[1].data.value));
			game.value = results[1].data.value;
			initialItems.value = JSON.parse(JSON.stringify(results[2].data.value));
			items.value = results[2].data.value;
			initialLocations.value = JSON.parse(JSON.stringify(results[3].data.value));
			locations.value = results[3].data.value;
			initialRegions.value = JSON.parse(JSON.stringify(results[4].data.value));
			regions.value = results[4].data.value;
		} catch (error) {
			console.error(error);
		}
	}

	async function save() {
		try {
			await Promise.all([
				$fetch("/api/categories", { body: categories.value, method: "PUT" }),
				$fetch("/api/game", { body: game.value, method: "PUT" }),
				$fetch("/api/items", { body: items.value, method: "PUT" }),
				$fetch("/api/locations", { body: locations.value, method: "PUT" }),
				$fetch("/api/regions", { body: regions.value, method: "PUT" }),
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

	function updateCategory(category: string, key: string, value: unknown) {}

	function updateItem(item: Item, newName: string) {
		game.value?.starting_items.forEach((block) => {
			block.items = block.items?.map((name) => {
				if (name === item.name) {
					return newName;
				}
				return name;
			});
		});
		item.name = newName;
	}

	function updateLocation(location: APLocation, newName: string) {
		locations.value =
			locations.value?.map((loc) => {
				if (loc.name === location.name) {
					loc.name = newName;
				}
				return loc;
			}) || [];
	}

	function removeItem(name: string) {
		game.value?.starting_items.forEach((block) => {
			block.items = block.items?.filter((item) => item !== name);
		});
		items.value = items.value?.filter((item) => item.name !== name) || [];
	}

	function removeLocation(name: string) {
		locations.value = locations.value?.filter((loc) => loc.name !== name) || [];
	}

	return {
		game,
		items,
		locations,
		categories,
		regions,
		initialCategories,
		initialGame,
		initialItems,
		initialLocations,
		initialRegions,
		gameChanges,
		itemChanges,
		locationChanges,
		categoryChanges,
		regionChanges,
		changes,
		init,
		addStartingItems: addStartingItemsToBlock,
		addCategoryToItem,
		removeCategoryFromItem,
		save,
		updateItem,
		removeItem,
		updateLocation,
		removeLocation,
	};
});
