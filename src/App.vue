<script setup lang="ts">
import { provide, ref } from "vue";
import { RouterView } from "vue-router";
import { onAuthStateChanged } from "@/server/api/authenticate";

const user = ref<User | null>();

onAuthStateChanged((value) => {
  if (value == null) {
    user.value = null;
  } else {
    const { displayName, uid } = value;
    user.value = { displayName: displayName, uid: uid };
  }
});

provide("user", user);
</script>

<template>
  <RouterView />
</template>

<style lang="sass">
@import "@/assets/_all.sass"
</style>
