<template>
	<div class="box course-item" @click="link">
		<span class="icon is-text-primary is-large ">
			<slot name="icon">
				<i class="fa fa-home"></i>
			</slot>
		</span>
		<p class="body">
			<slot name="title"></slot>
		</p>
		<p class="caption">
			<slot name="caption"></slot>
		</p>
	</div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { defineProps } from "vue"

const {course} = defineProps<{course:string}>()
const router = useRouter()

const link =()=>{
	router.push(`/course/${course}`)
} 

</script>

<style lang="sass" scoped>
.course-item
	width: 200px
	display: flex
	flex-direction: column
	text-align: center
	cursor: pointer	
	
	.body
		margin: 0

	.caption
		margin-top: .5em
		word-break: keep-all
		word-wrap: break-word

</style>