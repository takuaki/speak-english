<template>
  <div class="box lesson-item has-pointer" @click="link">
    <div class="row">
      <p class="body lesson-item-body">{{ name }}</p>
      <p class="caption lesson-item-caption" v-if="progress">
        {{ `達成率 ${progress.answered}/${progress.questions}` }}
      </p>
      <!--span class="material-icons-outlined icon is-medium lesson-item-icon">quiz</span-->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from "vue-router";
import { toRefs } from "vue";

type Props = {
  info: {
    name: string;
    id: string;
    progress:
      | {
          answered: number;
          questions: number;
        }
      | undefined;
  };
};
const router = useRouter();
const route = useRoute();

const props = defineProps<Props>();
const { name, id, progress } = toRefs(props.info);

const link = () => {
  const { course } = route.params;
  router.push({
    name: "lesson",
    params: { course: course, lesson: `lesson_${id.value}` },
  });
};
</script>

<style lang="sass" scoped>
.row
	display: flex
	flex-direction: row
	flex-wrap: nowrap
	align-items: baseline

.lesson-item
	+ .lesson-item
			margin-top: 8px
	&-caption
		margin-left: auto
</style>
