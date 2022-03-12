<template>
  <div class="box lesson-item has-pointer" @click="link">
    <div class="row">
      <p class="body lesson-item-body">{{ name }}</p>
      <p class="caption lesson-item-caption">
        {{ `達成率 ${answered}/${questions}` }}
      </p>
      <!--span class="material-icons-outlined icon is-medium lesson-item-icon">quiz</span-->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from "vue-router";
import { toRefs } from "vue";

const router = useRouter();
const route = useRoute();

type Props = {
  info: {
    name: string;
    id: string;
    questions: number;
    answered: number;
  };
};

const props = defineProps<Props>();
const { name, questions, answered, id } = toRefs(props.info);
const link = () => {
  const { course } = route.params;
  router.push(`${course}/${id}`);
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
