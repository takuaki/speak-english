<template>
	<div class="level columns is-align-flex-start is-tablet">
		<div class="column is-2">
			<span class="material-icons-outlined icon" @click="back"
				>keyboard_arrow_left</span
			>
		</div>
		<div class="column is-8 has-background-white">
			<div class="container">
				<p class="title is-text-center my-6">Levelとは？</p>
				<p class="body">
					Levelとは、通常の学習過程に沿った単語の難易度です。Levelは1～16まで分類されて、16は推定語彙力1万語に相当します。TOEICテストや英語検定の語彙力基準とも対応しています。
				</p>
				<div class="columns my-3">
					<p class="column is-4 is-text-center">
						level
						<span class="title">{{ state.level }}</span>
					</p>
					<p class="column is-4 is-text-center">
						Grade
						<span class="title">{{ grade["en"] }}</span>
					</p>
				</div>
				<div class="button-group mx-auto">
					<button class="button is-accent">Go Study</button>
					<button class="button" @click="openModal">Levelを選び直す</button>
				</div>
				<div class="my-4 level-card">
					<CourseItem :level="2" />
				</div>
				<div class="my-6">
					<p class="is-text-center subtitle">換算スコア</p>
					<p class="row-item" v-for="(key, value) in others" :key="key">
						{{ key }}
						<span class="subtitle">{{ value }}</span>
					</p>
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
		</div>
		<div class="column is-2"></div>
	</div>
</template>

<script lang="ts" setup>
import { useModal } from "@/composable/useModal";
import SelectLevel from "../SelectLevel.vue";
import { useRouter } from "vue-router";
import { correspondWith } from "@/server/api/level";
import { state } from "@/composable/store";
import CourseItem from "@/components/CourseItem.vue";

const router = useRouter();
//const w = correspondWith(state.level)
const { grade, description, others } = correspondWith(state.level);

const { openModal, closeModal, closed } = useModal();

const back = () => {
	router.back();
};
</script>

<style lang="sass" scoped>

.level
	&-card
		max-width: 600px
		margin: 0 auto
</style>
