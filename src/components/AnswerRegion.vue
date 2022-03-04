<template>
	<template v-for="(word,index) in answer" :key="index">
		<InputWord v-if="word.space" :right="word.text" @update:collect="update(index,$event)"/>
		<TextWord v-else :text="word.text"/>
	</template>
</template>

<script lang="ts" setup>
import { defineProps,ref, toRef, toRefs ,defineEmits, watch} from 'vue';
import type { Ref } from 'vue';
import InputWord from '@/components/input/InputWord.vue'
import TextWord from '@/components/TextWord.vue'

type Props = {
	answer:{
		space:boolean,
		text:string,
	}[]
}

const {answer}= defineProps<Props>()

const emits = defineEmits([/*'judge',*/])

const update = (index:number,$event:boolean)=>{
	
}

</script>