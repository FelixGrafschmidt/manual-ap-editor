<template>
	<Teleport to="body">
		<div class="fixed inset-0 mx-auto h-screen w-screen" @click="emit('close')">
			<div class="absolute inset-0 bg-black opacity-80"></div>
			<div class="absolute inset-0 flex items-center justify-center">
				<div @click.stop>
					<slot></slot>
				</div>
			</div>
		</div>
	</Teleport>
</template>

<script lang="ts" setup>
	const emit = defineEmits<{
		close: [];
	}>();
</script>
