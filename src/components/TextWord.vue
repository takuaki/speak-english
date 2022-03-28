<template>
	<p class="display body">{{ text }}</p>
</template>

<script lang="ts" setup>
import { toRefs } from "vue";

const props = defineProps<{ text: string }>();
const { text } = toRefs(props);
</script>

<style lang="sass" scoped>
.display
	display: inline-block
	margin: 0px .3em
</style>
