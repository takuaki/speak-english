<template>
	<main class="top top-background is-text-invert">
		<header class="top-header header">
			<nav class="nav">
				<div class="nav-left">
					<Logo />
				</div>
				<div class="nav-right">
					<!--span class="nav-item"><a href="#">教材について</a></span-->
					<router-link :to="{ name: 'login' }" class="nav-item is-text-invert">
						無料で試す
					</router-link>
				</div>
			</nav>
		</header>
		<div class="container">
			<div class="top-contents">
				<p class="body is-text-center">{{ sentense.source }}</p>
				<AnimFillWord
					:answer="answer(sentense.answer, sentense.question)"
					@update:typeend="typeend"
					class="top-contents-fillword"
				/>
			</div>
			<button class="button top-button has-background-accent">学習する</button>
		</div>
	</main>
</template>

<script lang="ts" setup>
import Logo from "@/components/logo/Logo.vue";
import { RouterLink } from "vue-router";
import AnimFillWord from "@/components/animation/AnimFillWord.vue";
import script from "@/assets/static/translate-examples.json";
import { timer } from "@/utils/timer";
import { ref, computed } from "vue";

const index = ref(0);
const typeend = async () => {
	await timer(3000);
	if (index.value < script.sentenses.length - 1) {
		index.value += 1;
	} else {
		index.value = 0;
	}
};

const sentense = computed(() => {
	return script.sentenses[index.value];
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
