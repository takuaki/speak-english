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
				<span class="title">12</span>
			</p>
			<p class="row-right">
				Grade
				<span class="title">Master</span>
			</p>
		</div>
		<div class="button-group mx-auto">
			<button class="button is-accent">Go Study</button>
			<button class="button">Levelを選び直す</button>
		</div>
		<div class="my-6">
			<h2 class="is-text-center">換算スコア</h2>
			<div class="row w-500">
				<p class="row-left">
					TOEIC
					<span class="subtitle">900~990</span>
				</p>
				<p class="row-right">
					英語検定
					<span class="subtitle">1級相当</span>
				</p>
			</div>
		</div>
	</div>
</template>

<script lang="ts"></script>

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
</style>
