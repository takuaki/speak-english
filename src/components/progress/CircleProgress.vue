<template>
	<div class="progress"></div>
</template>

<script lang="ts">
import {
	withDefaults,
	toRefs,
	defineProps,
	onMounted,
	onBeforeMount,
} from "vue";

const props = withDefaults(defineProps<{ progress: number }>(), {
	progress: 0,
});
const { progress } = toRefs(props);
</script>

<style scoped></style>
