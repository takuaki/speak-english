<template>
	<main class="container">
		<i class="fas fa-volume icon"></i>
		<!--i class="fas fa-microphone icon"></i-->
		<div class="box">
			<p class="description">{{trains_text}}</p>
		</div>
		<div class="answer-region">
			<template v-for="word in sentense">
				<InputWord v-if="word.space" :answer="word.text" :check="check"/>	
				<TextWord v-else :text="word.text"/>
			</template>
		</div>
		<button class="button" type="button" @click="next">Check</button>
	</main>
</template>

<script lang="ts" setup>
import {ref} from "vue"
import InputWord from '@/components/input/InputWord.vue'
import TextWord from '@/components/TextWord.vue'

const trains_text = "私はエンジニアです、私の家族も皆エンジニアです。"

const sentense:{space:boolean,text:string}[] = [
	{space:false,text:'I\'m'},
	{space:true,text:'engineer'},
	{space:false,text:'everyone in my family is also'},
	{space:true,text:'engineer'}
]

const check  = ref<boolean>(false)

const next = ()=>{
	check.value = true
}

</script>

<style lang="sass" scoped>

.answer-region
	margin: 50px auto

	
</style>