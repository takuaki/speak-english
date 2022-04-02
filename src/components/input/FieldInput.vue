<template>
	<label v-if="!errorMessage" class="label">{{ label }}</label>
	<label v-else-if="errorMessage" class="label is-error">{{
		errorMessage
	}}</label>
	<div class="control is-rounded has-icons-left is-medium">
		<input class="input" v-model="input" :type="type" @focusout="focusout" />
		<span class="icon icon-left material-icons-outlined">{{ icon }}</span>
	</div>
</template>

<script lang="ts" setup>
import { ref, toRefs, watch } from "vue";

type Props = {
	label: string;
	icon: string;
	type: "email" | "text" | "password";
	modelValue: string;
	errorMessage: string | null;
};

const props = defineProps<Props>();
const { label, icon, type, modelValue, errorMessage } = toRefs(props);
const input = ref(modelValue.value);

const emits = defineEmits(["update:modelValue", "update:focusout"]);
watch(input, (value) => {
	emits("update:modelValue", value);
});

const focusout = (e: FocusEvent) => {
	emits("update:focusout", e);
};
</script>
