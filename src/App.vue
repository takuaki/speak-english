<script setup lang="ts">
import { provide,ref } from 'vue';
import { RouterView } from 'vue-router'

const user = ref<User>()
provide('user',user)

</script>

<template>
  <RouterView/>
</template>

<style lang="sass">
@import "@/assets/_all.sass"
</style>

