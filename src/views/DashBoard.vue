<template>
	<div class="dashboard columns">
		<div class="column is-half">
			<h2 class="is-text-on-primary">You Learned</h2>
			<h1 class="is-text-accent">
				{{ total_words.toLocaleString() }}
				<span class="body is-text-on-primary">words</span>
			</h1>
		</div>
		<div class="column is-half">
			<h2 class="is-text-on-primary">You are now</h2>
			<h1 class="is-text-accent">
				{{ grade["en"] }}
				<span class="body is-text-on-primary">grade</span>
			</h1>
		</div>
		<div class="column is-half">
			<h2 class="is-text-on-primary title">
				<span class="body">Level</span>
				{{ level }}
			</h2>
			<p class="is-text-on-primary">{{ description }}</p>
			<div class="button-group is-flex-start my-2">
				<button class="button is-accent">Go Study!</button>
				<button class="button">復習する</button>
			</div>
			<!--CircleProgress :progress="progress" /-->
			<p class="title is-text-accent">
				{{ `${progress}%` }}
				<span class="body is-text-on-primary">of lesson are completed</span>
			</p>
		</div>
		<div class="column is-half">//TODO</div>
	</div>
</template>

<script lang="ts" setup>
import { correspondWith } from "@/server/api/level";
//import CircleProgress from "@/components/progress/CircleProgress.vue";
import { ref, inject, type InjectionKey } from "vue";
import { state } from "@/composable/store";

const { learned_words: total_words, level, progress } = state;
const { description, grade, vocabrary } = correspondWith(level);
</script>

<style lang="sass" scoped>
@import "@/assets/variables"

.dashboard
	box-sizing: border-box
	padding: 5% 10%
	width: 100%
	background-color: $primary-color

.columns
	display: flex
	flex-direction: row
	flex-wrap: wrap
	align-items: center

	.column
		padding: 12px
		box-sizing: border-box
		&.is-half
			flex-basis: 50%
</style>
