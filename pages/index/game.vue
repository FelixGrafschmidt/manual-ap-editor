<template>
	<div
		v-if="world.game && world.items"
		class="h-full flex flex-col overflow-y-auto p-8 scrollbar-thumb-color-gray-9 scrollbar-track-color-gray-5 scrollbar-radius-2 scrollbar-thumb-radius-4 scrollbar-track-radius-4 scrollbar-w-4px scrollbar scrollbar-rounded"
	>
		<span class="text-xl">{{ world.game.game }}</span>
		<span>by: {{ world.game.creator }}</span>
		<div class="flex flex-col pt-4">
			<label class="h-12 flex flex-row items-center gap-1 gap-2">
				<span>Filler Item:</span>
				<input v-model="world.game.filler_item_name" class="rounded bg-gray-6 px-2 py-1 focus-visible:outline-unset" type="text" />
			</label>
			<span v-if="world.items.find((item) => item.name === world.game?.filler_item_name)" class="text-red-6 font-semibold">
				Your filler item may not be one of your regular items. Please change this.</span
			>
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
								name="fa-solid:edit"
								class="h-4 w-4 cursor-pointer"
								@click="
									currentStartingBlock = i;
									newStartingItem = true;
								"
							/>
						</div>
						<div class="flex flex-row flex-wrap gap-2">
							<div v-for="(item, j) in block.items" :key="j" class="flex flex-row items-center gap-1 border rounded px-1 px-2 py-1">
								<span>
									{{ item }}
								</span>
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
						:class="{ 'bg-teal-7': world.game.starting_items?.at(currentStartingBlock)?.items?.includes(item.name) }"
						@click="
							world.game.starting_items?.at(currentStartingBlock)?.items?.includes(item.name)
								? world.removeStartingItem(currentStartingBlock, item.name)
								: world.addStartingItem(currentStartingBlock, item.name)
						"
					>
						{{ item.name }}
					</div>
				</div>
				<div class="mt-8">
					<button class="rounded bg-teal-7 px-4 py-2" @click="newStartingItem = false">Done</button>
				</div>
			</div>
		</Modal>
	</div>
</template>

<script lang="ts" setup>
	const world = useWorld();

	const newStartingItem = ref(false);
	const currentStartingBlock = ref(-1);
</script>
