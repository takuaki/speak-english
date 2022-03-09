<template>
  <label class="label">{{ label }}</label>
  <div class="control is-rounded has-icons-left is-medium">
    <input
      class="input"
      v-model="input"
      :type="type"
      @focusin="focusin"
      @focusout="focusout"
    />
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
  error: boolean;
};

const props = defineProps<Props>();
const { label, icon, type, modelValue, error } = toRefs(props);
const input = ref(modelValue.value);
//const focus = ref<boolean>(false)

const emits = defineEmits(["modelValue"]);
watch(input, () => {
  emits("modelValue", input.value);
});

const focusin = (_: any) => {};

const focusout = (_: any) => {};
</script>
