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
import { inject, watch, ref, toRefs, onUpdated } from "vue";
import type { Ref } from "vue";
import InputWord from "@/components/input/InputWord.vue";
import TextWord from "@/components/TextWord.vue";
import { useCheckScore } from "@/composable/checkAnswer";
import { useRoute } from "vue-router";
import { stringify } from "@firebase/util";

type Props = {
  counter: number | null;
  answer: {
    space: boolean;
    text: string;
  }[];
};

const { course, lesson } = useRoute().params;

const props = defineProps<Props>();
const { answer, counter } = toRefs(props);
//const num = answer.value.filter((v) => v.space).length;
const inputs: boolean[] = Array(answer.value.length);
const { fillScore } = useCheckScore();

const update = (index: number, collect: boolean) => {
  inputs[index] = collect;
};

const check = inject<Ref<boolean>>("check", ref<boolean>(false));
const collect = ref<boolean>();

watch(check, (isCheck) => {
  if (isCheck) {
    //全部合っているかcheck
    collect.value =
      inputs.filter((v) => v).length ===
      answer.value.filter((v) => v.space).length;

    //wordを記録する
    const quiz = `${lesson}_${counter.value}`;
    //TODO map+filterを綺麗に書く
    fillScore(
      quiz,
      answer.value
        .map(({ space, text }, index) => {
          if (space) return { word: text, collect: inputs[index] };
          else return { word: "", collect: false };
        })
        .filter((v) => v.word !== "")
    );
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
