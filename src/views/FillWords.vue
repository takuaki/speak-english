<template>
  <section class="container">
    <i class="fas fa-volume icon"></i>
    <!--i class="fas fa-microphone icon"></i-->
    <p class="description is-text-centered">{{ question }}</p>
    <AnswerRegion :answer="sentense" v-if="sentense" />
    <!--i class="fas fa-caret-left" @click="prev"></i-->
    <div class="button-group">
      <button class="button" type="button" @click="check">Check</button>
      <button
        class="button is-sub"
        type="button"
        @click="next"
        :disabled="!isCheck"
      >
        Next
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, provide, toRefs, onMounted } from "vue";
import type { Ref } from "vue";
///import { getQuestions } from "@/server/api/translate/translate";
import type { Questions } from "@/server/api/translate/translate";
import AnswerRegion from "../components/AnswerRegion.vue";
import { useRouter, useRoute } from "vue-router";
import { getQuestions } from "@/server/api/translate/translate";

type Props = { course: string; lesson: string };
const props = defineProps<Props>();
const { course, lesson } = toRefs(props);

const counter = ref<number | null>(null);
const isCheck = ref<boolean>(false);
const router = useRouter();
let questions: Questions.Response[] = [];

onMounted(async () => {
  questions = await getQuestions(course.value, lesson.value);
  if (questions.length > 0) counter.value = 0;
});

//questions.value = await getQuestions(course.value, lesson.value);

provide("check", isCheck);

const question: Ref<string | null> = computed(() => {
  if (counter.value === null) return null;
  return questions[counter.value].source.sentence;
});

const sentense = computed(() => {
  if (counter.value === null) return null;
  const { answer } = questions[counter.value];
  return answer.sentence.split(" ").map((word) => {
    //TODO 汚いから修正
    const space: boolean = answer.words.find((w) => w === word) !== undefined;
    return { space: space, text: word };
  });
});

const check = () => {
  isCheck.value = true;
};

/**
 *
 */
const next = () => {
  if (counter.value === null) return;
  if (counter.value < questions.length - 1) {
    counter.value += 1;
    isCheck.value = false;
  } else {
    router.push(`/course/${course}/${lesson}/review`);
  }
};
</script>

<style lang="sass" scoped></style>
