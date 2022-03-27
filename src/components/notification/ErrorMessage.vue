<template>
	<div class="notification has-background-warning" v-if="message">
		<p class="is-text-centered caption">
			{{ message }}
		</p>
	</div>
</template>

<script lang="ts" setup>
import { toRefs } from "vue";
type Props = { message?: string };

const props = defineProps<Props>();
const { message } = toRefs(props);
</script>

<style lang="sass" scoped>
.container
  background-color: white
</style>
