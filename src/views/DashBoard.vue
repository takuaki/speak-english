<template>
	<div class="dashboard">
		<div class="dashboard-item">
			<h4 class="is-text-on-primary display-4 dashboard-label">You Learned</h4>
			<h1 class="is-text-accent display-1 dashboard-headline">
				{{ total_words.toLocaleString() }}
				<span class="body is-text-on-primary">words</span>
			</h1>
		</div>
		<div class="dashboard-item">
			<h4 class="is-text-on-primary display-4 dashboard-label">Your grade</h4>
			<h1 class="is-text-accent display-1 dashboard-headline">
				{{ grade["en"] }}
			</h1>
		</div>
		<div class="dashboard-item">
			<h4 class="dashboard-label is-text-on-primary display-4">
				{{ `Level ${level}` }}
			</h4>
			<p class="is-text-on-primary">{{ description }}</p>
			<div class="button-group is-flex-start my-2">
				<button class="button is-accent is-large">Go Study!</button>
				<button class="button is-large">復習する</button>
			</div>
			<!--CircleProgress :progress="progress" /-->
			<div class="columns no-wrap">
				<div class="column">
					<CircleProgress :percentage="20" :radius="30" />
				</div>
				<p class="title is-text-accent column">
					27%
					<span class="body is-text-on-primary">of lesson are completed</span>
				</p>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { correspondWith } from "@/server/api/level";
//import CircleProgress from "@/components/progress/CircleProgress.vue";
import { ref, computed } from "vue";
import { state } from "@/composable/store";
import CircleProgress from "../components/progress/CircleProgress.vue";

const { learned_words: total_words, level, progress } = state;
const { description, grade, vocabrary } = correspondWith(level);
</script>

<style lang="sass" scoped>
@import "@/assets/variables"

.dashboard
	display: flex
	flex-direction: row
	justify-content: flex-start
	flex-wrap: wrap

	box-sizing: border-box
	padding: 5% 10%
	width: 100%
	background-color: $primary-color

	&-item
		flex-basis: 50%
		box-sizing: border-box
		padding: 24px 12px

	&-label
		display: block
		margin-bottom: 1.0rem

	&-headline
		text-indent: .25em
</style>
