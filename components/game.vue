<template>
	<div class="flex flex-col">
		<span class="text-xl">{{ game.game }}</span>
		<span>by: {{ game.creator }}</span>
		<span class="pt-4"
			>Filler Item:

			<select v-model="fillerItem" class="rounded bg-gray-600 px-2 py-1">
				<option v-for="(item, i) in items" :key="i" :value="item.name">{{ item.name }}</option>
			</select>
		</span>
		<div class="pt-4">
			<span class="font-bold">Starting Items:</span>
			<div
				class="mt-4 max-h-[50vh] flex flex-row flex-wrap gap-4 overflow-y-auto scrollbar-thumb-color-gray-9 scrollbar-track-color-gray-5 scrollbar-radius-2 scrollbar-thumb-radius-4 scrollbar-track-radius-4 scrollbar-w-4px scrollbar scrollbar-rounded"
			>
				<div v-for="(item, i) in game.starting_items" :key="i" class="h-96 w-96 gap-2 border rounded p-8">
					<div>Items {{ item.items }}</div>
					<div>Categories {{ item.item_categories }}</div>
					<div>Random {{ item.random }}</div>
					<div>Previous {{ item.if_previous_item }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	const props = defineProps<{
		game: Game;
		items: Item[];
	}>();

	const fillerItem = ref(props.game.filler_item_name);
</script>
