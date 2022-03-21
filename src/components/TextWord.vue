<template>
	<p class="display">{{text}}</p>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

const {text} = defineProps<{text:string}>()

</script>

<style lang="sass" scoped>
.display
	display: inline-block
	font-size: 1.2rem
	margin: 0px .3em


</style>

