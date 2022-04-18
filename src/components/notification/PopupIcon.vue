<template>
	<div class="popup-icon" @mouseover="over(true)" @mouseleave="over(false)">
		<span class="icon material-icons-outlined is-text-warning">warning</span>
		<div class="popup-message" v-show="show">
			<p class="caption">{{ message }}</p>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, computed, toRefs } from "vue";

const props = defineProps<{ message: string }>();
const show = ref(false);

const over = (over: boolean) => {
	show.value = over;
};

const { message } = toRefs(props);
const words = computed(() => {
	return message.value.length;
});
</script>

<style lang="sass" scoped>
@import "@/assets/variables.sass"

$words: v-bind(words)
$background-color: $hover-color

.popup-icon
	position: relative

.popup-message
	width: calc(1em * $words)
	box-sizing: content-box
	position: absolute
	bottom: 35px
	left: -5px
	padding: 0.5em 1.0em
	border-radius: 4px
	text-align: start
	background-color: $background-color

	&::after
		content: ''
		position: absolute
		width: 10px
		height: 10px
		box-sizing: border-box
		border:
			bottom: 5px $background-color solid
			right: 5px $background-color solid
			top: 5px transparent solid
			left: 5px transparent solid
		transform-origin: center
		background-color: transparent
		transform: rotateZ(45deg)
		bottom: -5px
</style>
