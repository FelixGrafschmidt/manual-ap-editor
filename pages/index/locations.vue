<template>
	<div
		class="h-full flex flex-col overflow-y-auto scrollbar-thumb-color-gray-9 scrollbar-track-color-gray-5 scrollbar-radius-2 scrollbar-thumb-radius-4 scrollbar-track-radius-4 scrollbar-w-4px divide-y scrollbar scrollbar-rounded"
	>
		<div
			class="flex flex-row cursor-pointer items-center justify-center gap-4 px-4 py-6 hover:bg-gray-9"
			@click="
				world.locations?.unshift({
					name: '',
					category: [],
					requires: '',
				})
			"
		>
			<Icon name="fa6-solid:plus" class="h-8 w-8 cursor-pointer border rounded-full p-1" />
		</div>
		<div
			v-for="(location, i) in world.locations"
			:key="i"
			class="flex flex-row items-center justify-between gap-4 px-4 py-6 hover:bg-gray-9"
		>
			<label class="h-12 w-1/4 flex flex-col gap-1">
				<span>Name</span>
				<input
					:value="location.name"
					class="rounded bg-gray-6 px-2 py-1 focus-visible:outline-unset"
					type="text"
					@input="($event) => world.updateLocation(location, ($event.target as HTMLInputElement).value)"
				/>
			</label>
			<div class="w-1/4 flex grow flex-col gap-1">
				<div class="flex flex-row items-center gap-1">
					<span>Categories</span>
					<Icon
						name="fa-solid:edit"
						class="h-4 w-4 cursor-pointer"
						@click="
							currentLocation = i;
							newCategory = true;
						"
					/>
				</div>
				<div
					class="flex flex-row flex-wrap gap-2 overflow-y-auto py-2 scrollbar-thumb-color-gray-9 scrollbar-track-color-gray-5 scrollbar-radius-2 scrollbar-thumb-radius-4 scrollbar-track-radius-4 scrollbar-w-4px scrollbar scrollbar-rounded"
				>
					<div v-for="(category, j) in location.category" :key="j" class="w-fit flex flex-row items-center gap-2 border rounded px-2 py-1">
						<span>
							{{ category }}
						</span>
					</div>
				</div>
			</div>
			<div class="w-1/4 flex grow flex-col gap-1">
				<div class="flex flex-row items-center gap-1">
					<span>Place Items</span>
					<Icon
						name="fa-solid:edit"
						class="h-4 w-4 cursor-pointer"
						@click="
							currentLocation = i;
							newItem = true;
						"
					/>
				</div>
				<div
					class="flex flex-row flex-wrap gap-2 overflow-y-auto py-2 scrollbar-thumb-color-gray-9 scrollbar-track-color-gray-5 scrollbar-radius-2 scrollbar-thumb-radius-4 scrollbar-track-radius-4 scrollbar-w-4px scrollbar scrollbar-rounded"
				>
					<div v-for="(item, j) in location.place_item" :key="j" class="w-fit flex flex-row items-center gap-2 border rounded px-2 py-1">
						<span>
							{{ item }}
						</span>
					</div>
				</div>
			</div>
			<!-- <label class="h-12 w-1/12 flex flex-col gap-1">
				<span>Count</span>
				<input v-model="location.count" class="rounded bg-gray-6 px-2 py-1 focus-visible:outline-unset" type="number" />
			</label>
			<label class="h-12 w-1/8 flex flex-row items-end justify-start gap-1">
				<input v-model="item.progression" type="checkbox" class="[zoom:1.5] w-fit" />
				<span>Progression?</span>
			</label> -->
			<div class="h-12 w-8 flex flex-row items-end justify-center">
				<Icon name="fa6-solid:xmark" class="h-6 w-6 cursor-pointer rounded bg-red-4 p-.5" @click="world.removeLocation(location.name)" />
			</div>
		</div>
		<div
			class="flex flex-row cursor-pointer items-center justify-center gap-4 border-b px-4 py-6 hover:bg-gray-9"
			@click="
				world.locations?.push({
					name: '',
					category: [],
					requires: '',
				})
			"
		>
			<Icon name="fa6-solid:plus" class="h-8 w-8 cursor-pointer border rounded-full p-1" />
		</div>
		<Modal v-if="newCategory && world.categories" @close="newCategory = false">
			<div class="h-80vh w-80vw rounded bg-gray-7 p-8">
				<div class="flex flex-row flex-wrap gap-4">
					<div
						v-for="([name], i) in Object.entries(world.categories)"
						:key="i"
						class="cursor-pointer border rounded-full px-2 py-1"
						:class="{ 'bg-teal-7': world.locations?.at(currentLocation)?.category.includes(name) }"
						@click="
							world.locations?.at(currentLocation)?.category.includes(name)
								? world.removeCategoryFromLocation(currentLocation, name)
								: world.addCategoryToLocation(currentLocation, name)
						"
					>
						{{ name }}
					</div>
				</div>
				<div class="mt-8">
					<button class="rounded bg-teal-7 px-4 py-2" @click="newCategory = false">Done</button>
				</div>
			</div>
		</Modal>
		<Modal v-if="newItem && world.items" @close="newItem = false">
			<div class="h-80vh w-80vw rounded bg-gray-7 p-8">
				<div class="flex flex-row flex-wrap gap-4">
					<div
						v-for="(item, i) in world.items"
						:key="i"
						class="cursor-pointer border rounded-full px-2 py-1"
						:class="{ 'bg-teal-7': world.locations?.at(currentLocation)?.place_item?.includes(item.name) }"
						@click="
							world.locations?.at(currentLocation)?.place_item?.includes(item.name)
								? world.removeItemFromLocation(currentLocation, item.name)
								: world.addItemToLocation(currentLocation, item.name)
						"
					>
						{{ item.name }}
					</div>
				</div>
				<div class="mt-8">
					<button class="rounded bg-teal-7 px-4 py-2" @click="newItem = false">Done</button>
				</div>
			</div>
		</Modal>
	</div>
</template>

<script lang="ts" setup>
	const world = useWorld();

	const newCategory = ref(false);
	const newItem = ref(false);
	const currentLocation = ref(-1);
</script>
