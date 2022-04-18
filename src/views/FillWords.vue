<template>
	<section class="container">
		<div class="w-600 mx-auto my-4">
			<LineProgress :percentage="20" class="mb-4" />
			<p class="description is-text-centered fillword-description">
				{{ question }}
			</p>
		</div>
		<AnswerRegion :answer="sentense" :counter="counter" v-if="sentense" />
		<div class="button-group">
			<button class="button" type="button" @click="check">Check</button>
			<button class="button" type="button" @click="next" :disabled="!isCheck">
				Next
			</button>
		</div>
	</section>
</template>

<script setup lang="ts">
import { ref, computed, provide, toRefs, onMounted } from "vue";
import type { Ref } from "vue";
import AnswerRegion from "../components/AnswerRegion.vue";
import LineProgress from "@/components/progress/LineProgress.vue";
import { useRouter } from "vue-router";

type Props = { course: string; lesson: string };
const props = defineProps<Props>();
const { course, lesson } = toRefs(props);

const counter = ref<number | null>(null);
const isCheck = ref<boolean>(false);
const router = useRouter();
const questions = ref<string[]>();

provide("check", isCheck);

onMounted(async () => {
	/*questions = await getQuestions(course.value, lesson.value);
	if (questions.length > 0) counter.value = 0;*/
});

//questions.value = await getQuestions(course.value, lesson.value);

const question: Ref<string | null> = computed(() => {
	return "I am boy";
});

const sentense = computed(() => {
	return [
		{ space: false, text: "I" },
		{ space: false, text: "am" },
		{ space: true, text: "boy" },
	];
});

const check = () => {
	isCheck.value = true;
};

const next = () => {
	//
};
</script>

<style lang="sass" scoped>

.description
	display: block
	word-wrap: break-word
	font-size: 1.5rem
	line-height: 1.5
	padding: 1.5em 1.0em
	border-radius: 10px
	box-shadow: 1px 1px 8px 2px #ddd
	background: white
</style>
