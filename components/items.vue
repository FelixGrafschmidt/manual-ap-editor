<template>
	<div>{{ items }}</div>
</template>

<script lang="ts" setup>
	defineProps<{ items: Item[] }>();
</script>
