<template>
	<input v-model="text" :class="classNames" :style="style" />
</template>

<script lang="ts" setup>
import { toRefs, ref, computed, onMounted, nextTick } from "vue";
import { timer } from "@/utils/timer";

const props = defineProps<{ answer: string; classNames: string }>();
const { answer, classNames } = toRefs(props);
const style = computed(() => {
	return { width: `${Math.ceil(answer.value.length / 2.0)}em` };
});
const text = ref("");
const emits = defineEmits(["update:typeend"]);

//TODO be randomize
const typewriter = (word: string, speed: number, delay: number) => {
	return Promise.all(
		Array.from(word).flatMap(async (char, index) => {
			await timer(speed * (index + 1) + delay);
			text.value += char;
			return char;
		})
	);
};

onMounted(() => {
	typewriter(answer.value, 150, 1000).then((_) => {
		emits("update:typeend");
	});
});
</script>
