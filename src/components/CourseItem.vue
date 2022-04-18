<template>
	<div class="course is-5by3" @click="setLevel">
		<div class="is-5by3-content course-background">
			<div class="course-content is-text-on-primary is-text-left columns">
				<div class="column is-6">
					<h3 class="">{{ `Level ${level}` }}</h3>
					<p class="body caption course-caption">
						{{ detail?.description }}
					</p>
				</div>
				<div class="column is-4">
					<p>{{ `${progress?.word} / ${progress?.total}` }}</p>
				</div>
				<div class="column is-2">
					<!--todo-->
					<CircleProgress :percentage="23" :radius="30" />
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { state } from "@/composable/store";
import { toRefs } from "vue";
import { correspondWith } from "@/server/api/level";
import { computed } from "@vue/reactivity";
import { useModal } from "@/composable/useModal";
import CircleProgress from "@/components/progress/CircleProgress.vue";

const props = defineProps<{ level: number }>();

const { level } = toRefs(props);
const { closeModal } = useModal();

const detail = computed(() => {
	return correspondWith(level.value);
});

const progress = computed(() => {
	const progress = state.progress.find(({ level: l }) => l === level.value);
	const vocab = detail.value?.vocabrary;
	if (vocab === undefined || progress === undefined) return undefined;
	const d = vocab.end - vocab.start;
	return { word: progress.words, total: d };
});

const percentage = (progress: { word: number; total: number }) => {
	return (progress.word / progress.total) * 100;
};

const setLevel = () => {
	state.level = level.value;
	closeModal();
};
</script>

<style lang="sass" scoped>
@import "@/assets/variables.sass"

.course
	cursor: pointer
	//flex-shrink: 1
	border-radius: 8px
	position: relative

	&-background
		background: linear-gradient(0deg, rgba($black,0.3),rgba($black,0.3)),url("@/assets/images/book-background.jpg")
		background-size: cover
		border-radius: 4px

	&-content
		position: absolute
		bottom: 0
		left: 0
		right: 0
		display: flex
		flex-direction: row
		margin-top: auto
		background: rgba($black,0.7)
		padding: .5em

	&-caption
		max-height: calc(1.2 * 3em)
		overflow-wrap: break-word
		text-overflow: ellipsis
		overflow: hidden
</style>
