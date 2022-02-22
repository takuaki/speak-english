<template>
	<main class="container">
		<!--cricle-progress  :percent="40" :size="100" :border-width="10" :border-bg-width="10"/-->
		<section class="translate-from">
			<p class="description is-text-left">私の父は60歳で定年を迎えました。その日は家族でファミレスでお祝いに行きました。</p>
		</section>
		<i class="fas fa-arrow-down icon"></i>
		<section class="translate-to">
			<speech-recognize/>
		</section>
	</main>
</template>

<script lang="ts" setup>
//import "vue3-circle-progress/dist/circle-progress.css"
//import CricleProgress from "vue3-circle-progress"
import SpeechRecognize from "@/components/SpeechRecognize.vue"

</script>

<style lang="sass">
.container
	padding: 10vh 10%	
	text-align: center

.vue3-circular-progressbar
	display: block
	margin: 0 auto

.icon
	font-size: 1.5rem
	color: #333
	margin: 20px auto

.description
	display: block
	margin: 2em auto 0
	word-wrap: break-word
	font-size: 1.2rem
	width: 600px
	line-height: 1.5
	padding: 1.0em 
	border-radius: 10px
	box-shadow: 1px 1px 8px 2px #ddd

	
	
</style>