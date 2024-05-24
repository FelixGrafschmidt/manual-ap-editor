<template>
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
		<Modal v-if="diffOpen" @close="diffOpen = false">
			<div class="h-80vh w-80vw rounded bg-gray-7 p-8">
				<Diffs />
				<div class="mt-8 flex flex-row items-center gap-4">
					<button
						v-if="world.changes"
						class="h-8 rounded bg-teal-7 px-2 py-1"
						@click="
							() => {
								world.save();
								diffOpen = false;
							}
						"
					>
						Save
					</button>
					<button
						class="h-8 rounded bg-gray-9 px-2 py-1"
						@click="
							() => {
								diffOpen = false;
							}
						"
					>
						Close
					</button>
				</div>
			</div>
		</Modal>
	</header>
</template>

<script lang="ts" setup>
	const world = useWorld();
	const ctrlState = useKeyModifier("Control");

	const diffOpen = ref(false);
</script>
