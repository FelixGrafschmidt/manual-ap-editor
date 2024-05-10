<template>
	<div
		v-if="world.game && world.items"
		class="h-full flex flex-col overflow-y-auto scrollbar-thumb-color-gray-9 scrollbar-track-color-gray-5 scrollbar-radius-2 scrollbar-thumb-radius-4 scrollbar-track-radius-4 scrollbar-w-4px scrollbar scrollbar-rounded"
	>
		<span class="text-xl">{{ world.game.game }}</span>
		<span>by: {{ world.game.creator }}</span>
		<div class="flex flex-row items-center gap-2 pt-4">
			<span>Filler Item:</span>
			<select v-model="fillerItem" class="rounded bg-gray-600 px-2 py-1">
				<option v-for="(item, i) in world.items" :key="i" :value="item.name">{{ item.name }}</option>
			</select>
		</div>
		<div class="pt-4">
			<span class="font-bold">Starting Items:</span>
			<div class="mt-4 flex flex-row flex-wrap gap-4">
				<div
					v-for="(block, i) in world.game.starting_items"
					:key="i"
					class="h-82 w-82 gap-2 overflow-y-auto border rounded bg-gray-7 p-4 scrollbar-thumb-color-gray-9 scrollbar-track-color-gray-5 scrollbar-radius-2 scrollbar-thumb-radius-4 scrollbar-track-radius-4 scrollbar-w-4px scrollbar scrollbar-rounded"
				>
					<div class="flex flex-col gap-1">
						<div class="flex flex-row items-center gap-1">
							<span class="text-xl">Items</span>
							<Icon
								name="fa6-solid:plus"
								class="h-4 w-4 cursor-pointer border rounded-full p-.5"
								@click="
									currentStartingBlock = i;
									newStartingItem = true;
								"
							/>
						</div>
						<div class="flex flex-row flex-wrap gap-1">
							<div v-for="(item, j) in block.items" :key="j" class="flex flex-row items-center gap-1 border rounded px-1">
								<span>
									{{ item }}
								</span>
								<Icon name="fa6-solid:xmark" class="h-4 w-4 cursor-pointer rounded-full bg-red-4" @click="block.items?.splice(j, 1)" />
							</div>
						</div>
					</div>
					<div>Categories {{ block.item_categories }}</div>
					<div>Random {{ block.random }}</div>
					<div>Previous {{ block.if_previous_item }}</div>
				</div>
			</div>
		</div>
		<Modal v-if="newStartingItem" @close="newStartingItem = false">
			<div class="h-80vh w-80vw rounded bg-gray-7 p-8">
				<div class="flex flex-row flex-wrap gap-4">
					<div
						v-for="(item, i) in world.items"
						:key="i"
						class="cursor-pointer border rounded-full px-2 py-1"
						:class="{ 'bg-teal-7': itemsToAdd.includes(item.name) }"
						@click="itemsToAdd.includes(item.name) ? (itemsToAdd = itemsToAdd.filter((e) => e !== item.name)) : itemsToAdd.push(item.name)"
					>
						{{ item.name }}
					</div>
				</div>
				<div class="mt-8">
					<button
						class="rounded bg-teal-7 px-4 py-2"
						@click="
							world.addStartingItems(currentStartingBlock, itemsToAdd);
							newStartingItem = false;
						"
					>
						Done
					</button>
				</div>
			</div>
		</Modal>
	</div>
</template>

<script lang="ts" setup>
	const world = useWorld();

	const fillerItem = ref(world.game?.filler_item_name);
	const newStartingItem = ref(false);
	const itemsToAdd: Ref<string[]> = ref([]);
	const currentStartingBlock = ref(-1);
</script>
