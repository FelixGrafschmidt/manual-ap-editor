<template>
	<div
		class="h-11/12 max-h-full flex flex-col gap-4 overflow-y-auto py-4 scrollbar-thumb-color-gray-9 scrollbar-track-color-gray-5 scrollbar-radius-2 scrollbar-thumb-radius-4 scrollbar-track-radius-4 scrollbar-w-4px scrollbar scrollbar-rounded"
	>
		<div v-if="world.gameChanges" class="px-4">
			<div class="flex flex-row gap-2">
				<span class="text-lg">Game</span>
				<div class="cursor-pointer rounded bg-red-6 px-2 py-1" @click="world.revertGame">Revert changes</div>
			</div>
			<CodeDiff
				output-format="side-by-side"
				diff-style="word"
				theme="dark"
				language="json"
				:old-string="JSON.stringify(world.initialGame)"
				:new-string="JSON.stringify(world.game)"
			/>
		</div>
		<div v-if="world.itemChanges" class="px-4">
			<div class="flex flex-row gap-2">
				<span class="text-lg">Items</span>
				<div class="cursor-pointer rounded bg-red-6 px-2 py-1" @click="world.revertItems">Revert changes</div>
			</div>
			<CodeDiff
				output-format="side-by-side"
				diff-style="word"
				theme="dark"
				language="json"
				:old-string="JSON.stringify(world.initialItems)"
				:new-string="JSON.stringify(world.items)"
			/>
		</div>
		<div v-if="world.locationChanges" class="px-4">
			<div class="flex flex-row gap-2">
				<span class="text-lg">Locations</span>
				<div class="cursor-pointer rounded bg-red-6 px-2 py-1" @click="world.revertLocations">Revert changes</div>
			</div>
			<CodeDiff
				output-format="side-by-side"
				diff-style="word"
				theme="dark"
				language="json"
				:old-string="JSON.stringify(world.initialLocations)"
				:new-string="JSON.stringify(world.locations)"
			/>
		</div>
		<div v-if="world.categoryChanges" class="px-4">
			<div class="flex flex-row gap-2">
				<span class="text-lg">Categories</span>
				<div class="cursor-pointer rounded bg-red-6 px-2 py-1" @click="world.revertCategories">Revert changes</div>
			</div>
			<CodeDiff
				output-format="side-by-side"
				diff-style="word"
				theme="dark"
				language="json"
				:old-string="JSON.stringify(world.initialCategories)"
				:new-string="JSON.stringify(world.categories)"
			/>
		</div>
		<div v-if="world.regionChanges" class="px-4">
			<div class="flex flex-row gap-2">
				<span class="text-lg">Regions</span>
				<div class="cursor-pointer rounded bg-red-6 px-2 py-1" @click="world.revertRegions">Revert changes</div>
			</div>
			<CodeDiff
				output-format="side-by-side"
				diff-style="word"
				theme="dark"
				language="json"
				:old-string="JSON.stringify(world.initialRegions)"
				:new-string="JSON.stringify(world.regions)"
			/>
		</div>
		<div v-if="!world.changes" class="px-4">No changes</div>
	</div>
</template>

<script lang="ts" setup>
	import { CodeDiff } from "v-code-diff";

	const world = useWorld();
</script>
