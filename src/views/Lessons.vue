<template>
  <div class="container">
    <section class="lesson-section">
      <div v-if="learning">
        <p>学習中のコース</p>
        <LessonItem :info="learning"></LessonItem>
      </div>
      <p>コース一覧</p>
      <div>
        <LessonItem
          v-for="lesson in lessons"
          :info="lesson"
          :key="lesson.name"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import LessonItem from "@/components/LessonItem.vue";
import { getCourse } from "@/server/api/course/course";
import { inject, toRefs, ref } from "vue";
import type { Ref } from "vue";

const props = defineProps<{ course: string }>();
const { course: name } = toRefs(props);

const user = inject<Ref<User>>("user");
const uid = user?.value?.uid;

//const lessons = ref<Props[]>([]);
const course = await getCourse(name.value);

const learning = course.lessons.find(({ progress }) => {
  const { questions, answered } = progress;
  return questions !== answered && answered !== 0;
});

const lessons = course.lessons;
</script>

<style lang="sass" scoped>
.lesson-section
	width: 60%
	max-width: 600px
	margin: 0 auto
</style>
