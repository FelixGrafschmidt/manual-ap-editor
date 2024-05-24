<template>
	<div class="h-full flex flex-col divide-y">
		<Header />
		<main class="h-90% w-screen flex flex-grow flex-col items-center justify-start">
			<div class="h-5% w-6xl flex flex-row border-x divide-x">
				<div
					class="w-1/5 cursor-pointer py-2 text-center"
					:class="{
						'font-semibold text-gray-3 text-xl': pathname === 'index-game',
						'text-gray-5 border-b': pathname !== 'index-game',
						'text-yellow-5': world.gameChanges,
					}"
					@click="navigateTo('game')"
				>
					Game
				</div>
				<div
					class="w-1/5 cursor-pointer py-2 text-center"
					:class="{
						'font-semibold text-gray-3 text-xl': pathname === 'index-items',
						'text-gray-5 border-b': pathname !== 'index-items',
						'text-yellow-5': world.itemChanges,
					}"
					@click="navigateTo('items')"
				>
					Items ({{
						world.items?.reduce((collector, current) => {
							return collector + current.count;
						}, 0)
					}})
				</div>
				<div
					class="w-1/5 cursor-pointer py-2 text-center"
					:class="{
						'font-semibold text-gray-3 text-xl': pathname === 'index-locations',
						'text-gray-5 border-b': pathname !== 'index-locations',
						'text-yellow-5': world.locationChanges,
					}"
					@click="navigateTo('locations')"
				>
					Locations ({{ world.locations?.length }})
				</div>
				<div
					class="w-1/5 cursor-pointer py-2 text-center"
					:class="{
						'font-semibold text-gray-3 text-xl': pathname === 'index-categories',
						'text-gray-5 border-b': pathname !== 'index-categories',
						'text-yellow-5': world.categoryChanges,
					}"
					@click="navigateTo('categories')"
				>
					Categories
				</div>
				<div
					class="w-1/5 cursor-pointer py-2 text-center"
					:class="{
						'font-semibold text-gray-3 text-xl': pathname === 'index-regions',
						'text-gray-5 border-b': pathname !== 'index-regions',
						'text-yellow-5': world.regionChanges,
					}"
					@click="navigateTo('regions')"
				>
					Regions
				</div>
			</div>
			<div class="h-95% w-6xl border-x">
				<NuxtPage />
			</div>
		</main>
		<footer class="h-5% w-screen flex justify-center">
			<div class="w-6xl py-2 text-center">&copy; Felix Grafschmidt {{ new Date().getFullYear() }}</div>
		</footer>
	</div>
</template>

<script lang="ts" setup>
	const world = useWorld();
	const route = useRoute();

	const pathname = computed(() => route.name);

	if (import.meta.server) {
		try {
			await world.init();
		} catch (error) {
			console.error(error);
		}
	}
</script>
