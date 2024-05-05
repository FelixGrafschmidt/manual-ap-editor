<template>
	<div class="h-full flex flex-col divide-y">
		<header class="h-5% w-screen flex flex-row justify-center">
			<div class="w-6xl flex flex-row justify-center">
				<h1 class="text-2xl">Manual Archipelago World Editor</h1>
			</div>
		</header>
		<main class="h-90% w-screen flex flex-grow flex-col items-center justify-start">
			<div class="h-5% w-6xl flex flex-row border-x divide-x">
				<div
					class="w-1/5 cursor-pointer py-2 text-center"
					:class="{ 'font-semibold text-gray-3 text-xl': tab === 'game', 'text-gray-5 border-b': tab !== 'game' }"
					@click="tab = 'game'"
				>
					Game
				</div>
				<div
					class="w-1/5 cursor-pointer py-2 text-center"
					:class="{ 'font-semibold text-gray-3 text-xl': tab === 'items', 'text-gray-5 border-b': tab !== 'items' }"
					@click="tab = 'items'"
				>
					Items
				</div>
				<div
					class="w-1/5 cursor-pointer py-2 text-center"
					:class="{ 'font-semibold text-gray-3 text-xl': tab === 'locations', 'text-gray-5 border-b': tab !== 'locations' }"
					@click="tab = 'locations'"
				>
					Locations
				</div>
				<div
					class="w-1/5 cursor-pointer py-2 text-center"
					:class="{ 'font-semibold text-gray-3 text-xl': tab === 'categories', 'text-gray-5 border-b': tab !== 'categories' }"
					@click="tab = 'categories'"
				>
					Categories
				</div>
				<div
					class="w-1/5 cursor-pointer py-2 text-center"
					:class="{ 'font-semibold text-gray-3 text-xl': tab === 'regions', 'text-gray-5 border-b': tab !== 'regions' }"
					@click="tab = 'regions'"
				>
					Regions
				</div>
			</div>
			<div class="h-95% w-6xl border-x p-8">
				<component :is="tab" />
			</div>
		</main>
		<footer class="h-5% w-screen flex justify-center">
			<div class="w-6xl py-2 text-center">&copy; Felix Grafschmidt {{ new Date().getFullYear() }}</div>
		</footer>
	</div>
</template>

<script lang="ts" setup>
	const world = useWorld();
	const tab = ref("game");

	try {
		await world.init();
	} catch (error) {
		console.error(error);
	}
</script>
