<template>
	<div class="menu">
		<slot></slot>
	</div>
</template>

<script lang="ts" setup>
import { inject } from "vue";
import type { Ref } from "vue";
</script>

<style lang="sass" scoped>
.menu
	list-style: none
</style>
