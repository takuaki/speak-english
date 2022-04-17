<template>
	<div class="container">
		<!--span class="icon "></span-->
		<div class="content is-text-center">
			<h1>Levelとは？</h1>
			<p class="is-wrap w-500">
				Levelとは、通常の学習過程に沿った単語の難易度です。Levelは1～16まで分類されて、16は推定語彙力1万語に相当します。TOEICテストや英語検定の語彙力基準とも対応しています。
			</p>
		</div>
		<div class="row w-500 mt-6 mb-4">
			<p class="row-left">
				level
				<span class="title">{{ state.level }}</span>
			</p>
			<p class="row-right">
				Grade
				<span class="title">{{ grade["en"] }}</span>
			</p>
		</div>
		<div class="button-group mx-auto">
			<button class="button is-accent">Go Study</button>
			<button class="button" @click="openModal">Levelを選び直す</button>
		</div>
		<div class="my-6" v-if="others">
			<h2 class="is-text-center">換算スコア</h2>
			<div class="row w-500">
				<p class="row-item" v-for="(key, value) in others" :key="key">
					{{ key }}
					<span class="subtitle">{{ value }}</span>
				</p>
			</div>
		</div>
	</div>
	<div class="modal" :class="{ 'is-close': closed }">
		<div class="modal-close">
			<span
				class="material-icons-outlined has-pointer is-text-on-primary"
				@click="closeModal"
				>close</span
			>
		</div>
		<div class="modal-container">
			<SelectLevel />
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useModal } from "@/composable/useModal";
import SelectLevel from "../SelectLevel.vue";
import { correspondWith } from "@/server/api/level";
import { state } from "@/composable/store";

const { grade, description, others } = correspondWith(state.level);

const { openModal, closeModal, closed } = useModal();
</script>

<style lang="sass" scoped>
.w-500
	width: 500px
	margin: auto

.row
	margin: auto
	display: flex
	flex-direction: row
	justify-content: space-around
	align-items: center
	> .row-item
			flex-basis: 50%
</style>
