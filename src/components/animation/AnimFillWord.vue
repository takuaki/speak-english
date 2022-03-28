<template>
	<div class="fillword">
		<template v-for="(word, index) in answer" :key="index">
			<!--input
				class="subtitle is-text-accent fillword-input"
				:style="style(word.text)"
				v-if="word.space"
				v-model="word.text"
			/-->
			<AnimInput
				:class-names="'subtitle is-text-accent fillword-input'"
				v-if="word.space"
				:answer="word.text"
				@update:typeend="typeend"
			/>
			<p class="body fillword-body" v-else>{{ word.text }}</p>
		</template>
	</div>
</template>

<script lang="ts" setup>
import { toRefs, computed, onMounted } from "vue";
import AnimInput from "@/components/animation/AnimInput.vue";

type Props = {
	answer: {
		space: boolean;
		text: string;
	}[];
};

const props = defineProps<Props>();
const emits = defineEmits(["update:typeend"]);
const { answer } = toRefs(props);
//受け取ったemitを送るだけ
const typeend = () => {
	emits("update:typeend");
};
</script>

<style lang="sass" scoped>
.fillword
	position: relative
	display: flex
	flex-direction: row
	justify-content: center
	align-items: baseline

	&-input
		background-color: transparent
		border-style: none
		outline-style: none
		text-align: center
		margin: 0 .25em
	&-body
		margin: 0 .25em
</style>
