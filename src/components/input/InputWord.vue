<template>
	<div class="fillword">
		<label class="fillword-label is-text-center" :class="{'is-hidden':collect}">{{answer}}</label>
		<div class="control">
			<input class="fillword-input is-text-center" :class="{'is-wrong':!collect}" v-model="word" type="text">
			<span :class="{'is-hidden':collect}" class="strike-line"></span>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref,defineProps,withDefaults, toRefs,computed} from 'vue';

type Props = {answer:string,check:boolean}
const props = defineProps<Props>()
const {answer,check} = toRefs(props)

const word = ref<string>("")

const collect = computed(()=>{
	return !check.value ? true: answer.value==word.value
})

const line = computed(()=>{
	return answer.value.length
})


</script>

<style lang="sass" scoped>

$width: calc( v-bind(line) * 1em )

.fillword
	width: $width
	display: inline-block
	&-label
		display: block
		font-size: 0.8rem
		color: red

	&-input
		width: 100%
		line-height: 1.5
		outline-style: none
		font-size: 1.2rem
		border: 
			top: none
			left: none
			right: none
			bottom: 1px dashed black
		
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