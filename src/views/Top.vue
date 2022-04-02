<template>
	<main class="top top-background is-text-invert">
		<header class="header is-fixed">
			<nav class="nav">
				<div class="nav-left">
					<Logo />
				</div>
				<div class="nav-right">
					<span class="nav-item"><a href="#howto">使いかた</a></span>
					<router-link :to="{ name: 'login' }" class="nav-item is-text-invert">
						ログイン
					</router-link>
					<button
						class="button has-background-accent nav-item"
						@click="router.push({ name: 'signup' })"
					>
						新規登録
					</button>
				</div>
			</nav>
		</header>
		<section id="top" class="container is-fullheight">
			<div class="top-contents">
				<p class="body is-text-center">{{ sentense.source }}</p>
				<AnimFillWord
					:answer="answer(sentense.answer, sentense.question)"
					@update:typeend="typeend"
					class="top-contents-fillword"
				/>
			</div>
			<button
				class="button top-button has-background-accent"
				@click="router.push({ name: 'lesson' })"
			>
				学習する
			</button>
		</section>
		<section id="howto" class="is-fullheight">
			<div class="container">
				<h1>How to Use</h1>
			</div>
		</section>
	</main>
</template>

<script lang="ts" setup>
import Logo from "@/components/icon/Logo.vue";
import { RouterLink, useRouter } from "vue-router";
import AnimFillWord from "@/components/animation/AnimFillWord.vue";
import { sentenses } from "@/assets/static/translate-examples.json";
import { timer } from "@/utils/timer";
import { ref, computed } from "vue";

const router = useRouter();

const index = ref(0);
const typeend = async () => {
	await timer(3000);
	if (index.value < sentenses.length - 1) {
		index.value += 1;
	} else {
		index.value = 0;
	}
};

const sentense = computed(() => {
	return sentenses[index.value];
});

const answer = (sentense: string, index_space: number) => {
	return sentense.split(" ").flatMap((word, index) => {
		return { text: word, space: index === index_space };
	});
};
</script>

<style lang="sass" scoped>
@import "@/assets/variables.sass"

.top
	min-height: 100vh
	width: 100%

	&-header
		padding: 20px 5% 0
		height: 60px

	&-background
		background: linear-gradient(0deg, rgba($black,0.9),rgba($black,0.9)),url("@/assets/images/book-background.jpg")
		background-size: cover
		background-attachment: fixed

	&-contents
		margin-top: 30vh
		&-fillword
			margin-top: 2.0rem

	&-button
		margin: 4.0rem auto 0
</style>
