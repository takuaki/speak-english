<template>
	<div class="line-progress">
		<span class="line-progress-start"></span>
		<!--span class="line-progress-"></span-->
	</div>
</template>

<script lang="ts" setup>
import { toRefs } from "vue";

const props = defineProps<{ percentage: number }>();
const { percentage } = toRefs(props);
</script>

<style lang="sass" scoped>
@import "@/assets/variables.sass"

$percentage : calc(v-bind(percentage) * 1%)

.line-progress
	width: 100%
	height: 2px
	display: inline-flex
	flex-direction: row
	flex-wrap: nowrap
	align-items: center
	background-color: $black-ter
	&-start
		height: inherit
		flex-basis: $percentage
		background: $accent-color
	/*&:after
		flex-basis: calc(100% - $percentage)
		background: gray
</style>
