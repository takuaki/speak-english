<template>
	<section class="container">
		<i class="fas fa-volume icon"></i>
		<!--i class="fas fa-microphone icon"></i-->
		<p class="description is-text-centered">{{question}}</p>
		<AnswerRegion :answer="sentense"/>
		<!--i class="fas fa-caret-left" @click="prev"></i-->
		<div class="button-group">
			<button class="button" type="button" @click="check">Check</button>
			<button class="button is-sub" type="button" @click="next" :disabled="!isCheck">Next</button>		
		</div>
	</section>
</template>

<script setup lang="ts">
import {ref,computed, provide} from "vue"
import {getQuestions} from "@/server/api/translate/translate"
import type {Questions} from "@/server/api/translate/translate"
import AnswerRegion from '../components/AnswerRegion.vue'
import { useRouter,useRoute } from "vue-router"

const questions :ReadonlyArray<Questions.Response> = getQuestions()
const counter = ref(0)
const isCheck  = ref<boolean>(false)
const router = useRouter()
const route = useRoute()
const {course,lesson} = route.params

provide("check",isCheck)

const question = computed(()=>{
	return questions[counter.value].source.sentence
})

const sentense = computed(()=>{
	const {answer} = questions[counter.value]
	return answer.sentence.split(' ').map(word=>{
		//TODO 汚いから修正
		const space:boolean = answer.words.find((w)=>w==word) != undefined
		return{space: space,text:word}
	})
})

const check = ()=>{
	isCheck.value = true
}

/**
 * 
 */
const next = ()=>{
	if(counter.value<questions.length-1){
		counter.value +=1
		isCheck.value = false
	}else{
		router.push(`/course/${course}/${lesson}/review`)
	}
}

</script>

<style lang="sass" scoped>


	
</style>