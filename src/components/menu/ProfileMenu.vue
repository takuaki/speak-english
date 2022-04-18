<template>
	<aside class="aside">
		<ul class="menu">
			<li class="menu-title">プロフィール</li>
			<li class="menu-item" @click="router.push({ name: 'profile' })">
				アカウント
			</li>
			<li class="menu-item" @click="router.push({ name: 'setting/study' })">
				学習設定
			</li>
		</ul>
	</aside>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
</script>


