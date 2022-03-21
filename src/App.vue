<script setup lang="ts">
import { provide, ref } from "vue";
import { RouterView } from "vue-router";
import { onAuthStateChanged } from "@/server/api/authenticate";

const user = ref<User | null>();

onAuthStateChanged((value) => {
  user.value = value;
});

provide("user", user);
</script>

<template>
  <RouterView />
</template>

<style lang="sass">
@import "@/assets/_all.sass"
</style>
