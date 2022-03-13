<template>
  <div class="container">
    <section class="preview-section">
      <p class="body">単語一覧</p>
      <WordItem word="transfer" translate="移す" :mistake="false" />
      <WordItem word="transfer" translate="移す" :mistake="false" />
    </section>
  </div>
</template>

<script lang="ts" setup>
import WordItem from "@/components/WordItem.vue";
</script>

<style lang="sass" scoped>
.preview-section
	width: 60%
	max-width: 600px
	margin: 0 auto
</style>
