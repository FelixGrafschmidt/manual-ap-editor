<template>
	<div class="h-full flex flex-col divide-y">
		<header class="h-5% w-screen flex flex-row justify-center">
			<div class="w-6xl flex flex-row items-center justify-between">
				<h1 class="grow text-2xl">Manual Archipelago World Editor</h1>
				<div v-if="world.changes" class="flex flex-row items-center gap-4">
					<span class="text-red-6 font-semibold">UNSAVED CHANGES</span>
					<button
						class="rounded bg-teal-6 px-2 py-1 text-black hover:bg-teal-5"
						@click="
							() => {
								if (ctrlState) {
									world.save();
								} else {
									diffOpen = true;
								}
							}
						"
					>
						{{ ctrlState ? "Save" : "Show" }}
					</button>
				</div>
			</div>
		</header>
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
		<Modal v-if="diffOpen" @close="diffOpen = false">
			<div class="h-80vh w-80vw rounded bg-gray-7 p-8">
				<div
					class="h-11/12 max-h-full flex flex-col gap-4 overflow-y-auto py-4 scrollbar-thumb-color-gray-9 scrollbar-track-color-gray-5 scrollbar-radius-2 scrollbar-thumb-radius-4 scrollbar-track-radius-4 scrollbar-w-4px scrollbar scrollbar-rounded"
				>
					<div v-if="world.gameChanges" class="px-4">
						<span>Game</span>
						<CodeDiff
							output-format="side-by-side"
							diff-style="char"
							theme="dark"
							language="json"
							:old-string="JSON.stringify(world.initialGame)"
							:new-string="JSON.stringify(world.game)"
						/>
					</div>
					<div v-if="world.itemChanges" class="px-4">
						<span>Items</span>
						<CodeDiff
							output-format="side-by-side"
							diff-style="char"
							theme="dark"
							language="json"
							:old-string="JSON.stringify(world.initialItems)"
							:new-string="JSON.stringify(world.items)"
						/>
					</div>
					<div v-if="world.locationChanges" class="px-4">
						<span>Locations</span>
						<CodeDiff
							output-format="side-by-side"
							diff-style="char"
							theme="dark"
							language="json"
							:old-string="JSON.stringify(world.initialLocations)"
							:new-string="JSON.stringify(world.locations)"
						/>
					</div>
					<div v-if="world.categoryChanges" class="px-4">
						<span>Categories</span>
						<CodeDiff
							output-format="side-by-side"
							diff-style="char"
							theme="dark"
							language="json"
							:old-string="JSON.stringify(world.initialCategories)"
							:new-string="JSON.stringify(world.categories)"
						/>
					</div>
					<div v-if="world.regionChanges" class="px-4">
						<span>Regions</span>
						<CodeDiff
							output-format="side-by-side"
							diff-style="char"
							theme="dark"
							language="json"
							:old-string="JSON.stringify(world.initialRegions)"
							:new-string="JSON.stringify(world.regions)"
						/>
					</div>
				</div>
				<div class="mt-8 h-12">
					<button
						class="rounded bg-teal-7 px-4 py-2"
						@click="
							() => {
								world.save();
								diffOpen = false;
							}
						"
					>
						Save
					</button>
				</div>
			</div>
		</Modal>
	</div>
</template>

<script lang="ts" setup>
	import { CodeDiff } from "v-code-diff";

	const world = useWorld();
	const route = useRoute();

	const pathname = computed(() => route.name);

	const diffOpen = ref(false);

	const ctrlState = useKeyModifier("Control");

	if (import.meta.server) {
		try {
			await world.init();
		} catch (error) {
			console.error(error);
		}
	}
</script>
