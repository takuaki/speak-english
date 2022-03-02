<template>
	<main class="container">
		<i class="fas fa-volume icon"></i>
		<!--i class="fas fa-microphone icon"></i-->
		<div class="box">
			<p class="description">{{trains_text}}</p>
		</div>
		<div class="answer-region">
			<InputWord answer="translate" :check="true"/>		
		</div>
	</main>
</template>

<script lang="ts" setup>
import InputWord from '@/components/input/InputWord.vue'

const trains_text = "私はジェーソンです。私の家族を紹介させてください"

</script>

<style lang="sass" scoped>

.answer-region
	margin-top: 50px
	
</style>