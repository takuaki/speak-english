<template>
  <div class="answer-region">
    <template v-for="(word, index) in answer" :key="index">
      <InputWord
        v-if="word.space"
        :right="word.text"
        @update:collect="update(index, $event)"
      />
      <TextWord v-else :text="word.text" />
    </template>
    <img src="@/assets/images/circle.svg" v-show="collect" class="right-mark" />
  </div>
</template>

<script lang="ts" setup>
import { inject, watch, ref, toRefs } from "vue";
import type { Ref } from "vue";
import InputWord from "@/components/input/InputWord.vue";
import TextWord from "@/components/TextWord.vue";

type Props = {
  answer: {
    space: boolean;
    text: string;
  }[];
};

const props = defineProps<Props>();
const { answer } = toRefs(props);
const inputs: boolean[] = Array(answer.value.length);

const update = (index: number, collect: boolean) => {
  inputs[index] = collect;
};

const check = inject<Ref<boolean>>("check", ref<boolean>(false));
const collect = ref<boolean>();

watch(check, (isCheck) => {
  if (isCheck) {
    collect.value =
      inputs.filter((v) => v).length ==
      answer.value.filter((v) => v.space).length;
  }
});

watch(answer, () => {
  collect.value = undefined;
});
</script>

<style lang="sass">
.answer-region
	position: relative
	display: flex
	flex-direction: row
	justify-content: center
	align-items: flex-end
	width: 100%
	margin: 50px auto

	.right-mark
		width: 150px
		height: 150px
		position: absolute
		top: -40px
</style>
