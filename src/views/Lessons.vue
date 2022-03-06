<template>
	<div class="container">
		<section class="lesson-section">
			<div v-if="learning">
				<p>学習中のコース</p>
				<LessonItem :info="learning"></LessonItem>
			</div>
			<p>コース一覧</p>
			<div>
				<LessonItem v-for="lesson in lessons" :info="lesson"></LessonItem>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import LessonItem from "@/components/LessonItem.vue"
import {course as getCourse} from "@/server/api/course/course"
import { inject } from "vue";

const {course:name} = defineProps<{course:string}>()
console.log(name)

const user = inject<User>('user')
const course = getCourse(name,user?.uid)
const learning = course.lessons.find(({questions,answered})=>{
	return questions != answered && answered !=0
})

const lessons = course.lessons


</script>

<style lang="sass" scoped>
.lesson-section
	width: 60%
	max-width: 600px
	margin: 0 auto


</style>