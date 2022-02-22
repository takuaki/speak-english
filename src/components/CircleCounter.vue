/** 
	deprecated 2022/2/20 by t.mori

*/
<template>
	<div class="circle">
		<span class="arc" v-for="i in count" :iter="i" :style="{}"></span>
		<!--p class="is-text-black">{{percentage}}%</p-->
	</div>
</template>

<script lang="ts" setup>
import { computed, defineProps,ref,toRefs,withDefaults} from "vue"

type Prop = {count:number}

const props = withDefaults(defineProps<Prop>(),{count:10})
const {count} = toRefs(props)

const counter = ref<number>(0)

const percentage = computed<number>(()=>{
	return ((counter.value/count.value)*100)
})

const classStyle = (i:number):object=>{
	return {
		transform: `rotateZ(-90deg) skew(calc())`
	}
}

</script>

<style lang="sass">

$skew : calc(360deg / v-bind(count))

.circle
	display: flex
	justify-content: center
	align-items: center
	height: 100px
	width: 100px
	border-radius: 50%
	border-style: none
	position: relative
	overflow: hidden
	background-color: blue

	&::before
		display: block
		content: ''
		width: calc(100% - 2px)
		height: calc(100% - 2px)
		border-style: none
		//background-color: white
		border-radius: 50%
		z-index: 10

	//&:after
.arc
	position: absolute
	border-style: none
	width: 50px
	height: 50px
	left: 50%
	top: 0%
	background-color: red
	transform: rotateZ(0deg) skewY(calc( 110deg - 90deg))
	//transform : rorateZ(0deg) skew(20deg)
	transform-origin: bottom left
	



	

</style>

