<template>
	<div class="flex-row has-pointer" @click="click">
		<span class="material-icons-outlined icon is-medium"> repeat </span>
		<p class="body">Fill in..|</p>
	</div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
const router = useRouter();
const click = () => {
	router.push({ name: "home" });
};
</script>

<style lang="sass" scoped>
@import "@/assets/variables.sass"

.flex-row
	display: inline-flex
	flex-direction: row
	align-items: center
	>*
		margin:0
		color: $white !important
</style>
