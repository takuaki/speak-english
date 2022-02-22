<template>
	<div class="recognize-text">
		<textarea class="textarea no-resize" v-model="script"></textarea>
		<i class="fas fa-microphone-alt circle" :class="{'is-active':active}" @click="startRecord"></i>
</div>
</template>

<script setup>
import {ref} from "vue"

/**
 * TODO chromeでしか動作しないので、修正する
 */
const active = ref(false)
const script = ref("")

const SpeechRecognition = window.speechRecognition || webkitSpeechRecognition
var recognition = new SpeechRecognition()
recognition.continuous = false
recognition.lang = 'en-US'
recognition.interimResults = true

const startRecord = ()=>{
	recognition.start()
	active.value = true
}

recognition.onspeechend = ()=>{
	recognition.stop()
	active.value = false
}

recognition.onresult = function(event){
	const {transcript,confidence} = event.results[0][0]
	script.value = transcript
}

</script>

<style lang="sass" scoped>
@import "@/assets/variables.sass"
@import "@/assets/utils.sass"

.circle
	display: block
	margin:  auto
	width: 80px
	height: 80px
	border-radius: 50%
	box-shadow: 0 0 4px 4px #ccc
	background-color: white
	border-color: $main-color
	font-size: 2.0rem
	line-height: 80px
		
	&.is-active
		background-color: $primary-color
		color: white

.textarea
	width: 600px
	height: 5.0rem
	padding: 1.0em 
	border-radius: 10px
	border-color: #ccc
	box-shadow: 1px 1px 8px 2px #ddd
	text-align: left
	line-height: 1.5
	outline-style: none

	&.no-resize
		resize: none

</style>