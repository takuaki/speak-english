<template>
	<Header></Header>
	<main class="main-layout has-background">
		<aside class="aside">
			<ul class="menu">
				<li class="menu-item" @click="router.push({ name: 'profile' })">
					プロフィール
				</li>
				<li class="menu-item" @click="router.push({ name: 'setting/study' })">
					学習設定
				</li>
			</ul>
		</aside>
		<section class="section main-content">
			<div class="container">
				<RouterView></RouterView>
			</div>
		</section>
	</main>
</template>

<script lang="ts" setup>
import { inject } from "vue";
import type { Ref } from "vue";
import { RouterView, useRouter } from "vue-router";
import Header from "@/views/Header.vue";

const user: Ref<User> = inject("user");
const props = defineProps<{ username: string }>();
const router = useRouter();
</script>

<style lang="sass" scoped>
.main-layout
	display: flex
	flex-direction: row
	justify-content: center
	flex-wrap: nowrap
	width: 100%

.aside
	flex-basis: 20%
	flex-grow: 0
.main-content
	flex-basis: 80%
	flex-grow: 1
</style>
