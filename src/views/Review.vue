<template>
	<div class="container">
		<section class="preview-section">
			<p class="body">単語一覧</p>
			<WordItem
				v-for="({ word, collect }, index) in list"
				:word="word"
				translate=""
				:mistake="!collect"
				:key="index"
			/>
		</section>
	</div>
</template>

<script lang="ts" setup>
import WordItem from "@/components/WordItem.vue";
import { computed, inject } from "vue";
import { useRoute } from "vue-router";
import type { Ref } from "vue";
import { useCheckScore, score } from "@/composable/checkAnswer";

const { uploadScore } = useCheckScore();
const user: User | undefined = inject("user");
const route = useRoute();
const { course, lesson } = route.params;

const list: Ref<{ word: string; collect: boolean }[]> = computed(() => {
	const array = [];
	for (const key in score.value) {
		const words = score.value[key];
		for (const word in words) {
			const collect = words[word];
			array.push({ word: word, collect: collect });
		}
	}
	return array;
});

uploadScore(user?.uid, course, lesson);
</script>

<style lang="sass" scoped>
.preview-section
	width: 60%
	max-width: 600px
	margin: 0 auto
</style>
