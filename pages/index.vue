<template>
	<div class="flex flex-col divide-y">
		<header class="w-screen flex flex-row justify-center">
			<div class="w-6xl flex flex-row justify-center py-4">
				<h1 class="text-2xl">Manual Archipelago World Editor</h1>
			</div>
		</header>
		<main class="w-screen flex flex-grow flex-col items-center justify-start">
			<div class="w-6xl flex flex-row border-x divide-x">
				<div
					class="w-1/5 cursor-pointer py-2 text-center"
					:class="{ 'bg-teal-7 font-semibold text-gray-3': tab === 'game', 'text-gray-5': tab !== 'game' }"
					@click="tab = 'game'"
				>
					Game
				</div>
				<div
					class="w-1/5 cursor-pointer py-2 text-center"
					:class="{ 'bg-teal-7 font-semibold text-gray-3': tab === 'items', 'text-gray-5': tab !== 'items' }"
					@click="tab = 'items'"
				>
					Items
				</div>
				<div
					class="w-1/5 cursor-pointer py-2 text-center"
					:class="{ 'bg-teal-7 font-semibold text-gray-3': tab === 'locations', 'text-gray-5': tab !== 'locations' }"
					@click="tab = 'locations'"
				>
					Locations
				</div>
				<div
					class="w-1/5 cursor-pointer py-2 text-center"
					:class="{ 'bg-teal-7 font-semibold text-gray-3': tab === 'categories', 'text-gray-5': tab !== 'categories' }"
					@click="tab = 'categories'"
				>
					Categories
				</div>
				<div
					class="w-1/5 cursor-pointer py-2 text-center"
					:class="{ 'bg-teal-7 font-semibold text-gray-3': tab === 'regions', 'text-gray-5': tab !== 'regions' }"
					@click="tab = 'regions'"
				>
					Regions
				</div>
			</div>
			<div class="h-full w-6xl border-x p-8">
				<component :is="tab" :categories="categories" :game="game" :items="items" :locations="locations" :regions="regions" />
			</div>
		</main>
		<footer class="w-screen flex justify-center">
			<div class="w-6xl py-2 text-center">&copy; Felix Grafschmidt {{ new Date().getFullYear() }}</div>
		</footer>
	</div>
</template>

<script lang="ts" setup>
	const categories = ref<Buffer | null>(null);
	const game = ref<Buffer | null>(null);
	const items = ref<Buffer | null>(null);
	const locations = ref<Buffer | null>(null);
	const regions = ref<Buffer | null>(null);
	const tab = ref("game");
	try {
		categories.value = (await useFetch<Buffer>("/categories")).data.value;
		game.value = (await useFetch<Buffer>("/game")).data.value;
		items.value = (await useFetch<Buffer>("/items")).data.value;
		locations.value = (await useFetch<Buffer>("/locations")).data.value;
		regions.value = (await useFetch<Buffer>("/regions")).data.value;
	} catch (error) {
		console.error(error);
	}
</script>
