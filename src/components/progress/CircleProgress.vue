<template>
	<div id="circleProgress">
		<!--span class="percentage is-text-white">{{ `${percentage}%` }}</span-->
		<div class="outer-circle">
			<div class="inner-circle">
				<!--span class="percentage is-text-white">{{ `${percentage}%` }}</span-->
			</div>
		</div>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			version="1.1"
			:style="{ width: `${radius * 2}px`, height: `${radius * 2}px` }"
		>
			<!--defs>
				<linearGradient id="GradientColor">
					<stop offset="0%" stop-color="#e91e63" />
					<stop offset="100%" stop-color="#673ab7" />
				</linearGradient>
			</defs-->
			<circle :cx="center" :cy="center" :r="r" stroke-linecap="round" />
		</svg>
	</div>
</template>

<script lang="ts" setup>
import { withDefaults, toRefs, ref } from "vue";

const props = withDefaults(
	defineProps<{ percentage: number; radius?: number }>(),
	{
		percentage: 0,
		radius: 50,
	}
);

const width = ref(10);
const { percentage, radius } = toRefs(props);

const center = radius.value;
const r = radius.value - width.value / 2;
</script>

<style scoped lang="sass">
@import "@/assets/variables.sass"

$percentage: calc(v-bind(percentage) * 0.01)
$radius: calc(v-bind(radius) * 1px)
$inner-radius: calc( calc(v-bind(radius) - v-bind(width)) * 1px )

#circleProgress
	height: calc($radius * 2)
	width: calc($radius * 2)
	position: relative
	display: flex
	justify-content: center
	align-items: center

=circle($radius:50px,$background-color: white)
	display: flex
	justify-content: center
	align-items: center
	height: calc($radius * 2)
	width: calc($radius * 2)
	background-color: $background-color
	border-radius: 50%
	border-width: 0

.outer-circle
	+circle($radius)
.inner-circle
	//$inner-radius: calc($radius - )
	+circle($inner-radius,$primary-color)

.percentage
	font-weight: 600

svg
	position: absolute
	top: 0
	left: 0

circle
	fill: none
	//stroke: url(#GradientColor)
	stroke: $accent-color
	stroke-width: 11px
	stroke-dasharray: 248
	animation: anim 2s linear forwards
	transform: rotate(-90deg)
	transform-origin: center

@keyframes anim
	100%
		stroke-dashoffset: calc(248 - 248 * $percentage)

/*.shadow
	&-left,&-right
		background-color: $primary-color
		width: 50px
		height: 100px
		display: inline-block

	&-left
		transform-origin: center right
		//@if $radius < 90

	&-right
		transform-origin: center left
		$degree: calc($radius * 1deg)
		transform: rotateZ($degree)
</style>
