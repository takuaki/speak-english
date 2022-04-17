<script setup lang="ts">
import { inject, provide, ref, type InjectionKey } from "vue";
import { RouterView } from "vue-router";
import { onAuthStateChanged } from "@/server/api/authenticate";

const user = ref<User | null>();

onAuthStateChanged((value) => {
	user.value = value;
});

provide<User | null>("user", user);
</script>

<template>
	<RouterView />
</template>

<style lang="sass">
@import "@/assets/_all.sass"
</style>
