<template>
	<main>
		<section class="container">
			<i class="fas fa-volume icon"></i>
			<!--i class="fas fa-microphone icon"></i-->
			<div class="box">
				<p class="description">{{question}}</p>
			</div>
			<div class="answer-region">
				<AnswerRegion :answer="sentense"/>
			</div>
			<!--i class="fas fa-caret-left" @click="prev"></i-->
			<div class="button-group">
				<button class="button" type="button" @click="check">Check</button>
				<button class="button is-sub" type="button" @click="next" :disabled="!isCheck">Next</button>		
			</div>
		</section>
	</main>
</template>

<script setup lang="ts">
import {onMounted, ref,onUnmounted,computed, provide} from "vue"
import {getQuestions} from "@/server/api/translate/translate"
import type {Questions} from "@/server/api/translate/translate"
import AnswerRegion from '../components/AnswerRegion.vue'

const questions :ReadonlyArray<Questions.Response> = getQuestions()
const counter = ref(0)
const isCheck  = ref<boolean>(false)
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

const next = ()=>{
	counter.value += 1
	isCheck.value = false
}

</script>

<style lang="sass" scoped>

.answer-region
	margin: 50px auto

	
</style>