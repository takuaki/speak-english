<template>
	<div class="fillword">
		<label
			class="fillword-label is-text-center"
			:class="{ 'is-hidden': collect || !check }"
			>{{ right }}</label
		>
		<div class="control">
			<input
				class="fillword-input is-text-center body"
				:class="{ 'is-wrong': !collect && check }"
				v-model="word"
				type="text"
				:disabled="check"
			/>
			<span
				:class="{ 'is-hidden': collect || !check }"
				class="strike-line"
			></span>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, toRefs, computed, watch, inject } from "vue";
import type { Ref } from "vue";

//injection
const check = inject<Ref<boolean>>("check");

type Props = { right: string };
const props = defineProps<Props>();
const { right } = toRefs(props);

const word = ref<string>("");

const collect = computed(() => {
	return right.value.toLowerCase() === word.value.toLowerCase();
});

/**Emits*/
const emits = defineEmits(["update:collect"]);
watch(word, () => {
	emits("update:collect", collect.value);
});

// css variables
const line = computed(() => {
	return right.value.length;
});
</script>

<style lang="sass" scoped>
@import "@/assets/variables.sass"

$width: calc( v-bind(line) * 1em )

.fillword
	width: $width
	display: inline-block
	margin: 0 .5em

	&-label
		display: block
		font-size: 0.8rem
		color: red

	&-input
		width: 100%
		line-height: 1.5
		outline-style: none
		background-color: transparent
		border:
			top: none
			left: none
			right: none
			bottom: 2px dashed $accent-color

		&.is-wrong
			border-color: red
			color: darkgray

.control
	position: relative

.strike-line
	position: absolute
	display: inline
	width: 100%
	height: 1px
	background-color: gray
	left: 0
	top: calc(1.2rem * 0.5 * 1.5)
</style>
