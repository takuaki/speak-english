<template>
	<div id="slider">
		<transition-group class="slides-group" tag="div">
			<CourseItem class="slide" :level="current - 1" key="prev" />
			<CourseItem class="slide current" :level="current" key="current" />
			<CourseItem class="slide" :level="current + 1" key="next" />
		</transition-group>
		<div class="slider-lower">
			<button class="button is-rounded" @click="prev" :disabled="current <= 1">
				<span class="icon material-icons-outlined">arrow_back_ios</span>
				戻る
			</button>
			<button class="button is-rounded" @click="next" :disabled="false">
				次へ
				<span class="icon material-icons-outlined">arrow_forward_ios</span>
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CourseItem from "@/components/CourseItem.vue";

const current = ref(1);
const prev = () => {
	current.value -= 1;
};
const next = () => {
	current.value += 1;
};
</script>

<style scoped lang="sass">

.slides-group
	display: flex
	flex-direction: row
	justify-content: space-around
	align-items: center

	.slide
		flex-basis: 25%
		text-align: center
		color: white
		&.current
			flex-basis: 40%


.slider-lower
	display: block
	text-align: center
	margin-top: 20px
	> .button
			display: inline-block
			+ .button
					margin-left: 150px
</style>
