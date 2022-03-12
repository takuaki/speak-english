<template>
	<div class="box word-review has-pointer">
		<span
			class="icon is-medium has-pointer material-icons-outlined is-circled has-background-white-ter"
			>keyboard_voice</span
		>
		<div class="word-review-contents">
			<p class="body">{{ word }}</p>
			<P>{{ translate }}</P>
		</div>
		<p class="body word-review-eval">{{ text }}</p>
		<input
			type="checkbox"
			class="input word-review-checkbox"
			:checked="checked"
		/>
	</div>
</template>

<script lang="ts" setup>
import { toRefs, ref } from "vue"

type Props = {
	word: string
	translate: string
	mistake: boolean
}

const props = defineProps<Props>()
const { word, translate, mistake } = toRefs(props)

const checked = ref<boolean>(mistake.value)
const text = mistake.value ? "BAD" : "GOOD"
</script>

<style lang="sass" scoped>

.word-review
	margin: 0 auto
	display: flex
	flex-direction: row
	justify-content: space-between
	align-items: center
	+ .word-review
			margin-top: 12px

	&-contents
		margin-right: auto
		margin-left: 30px
		> p
				margin: .5em 0
	&-eval
		margin-right: .5em
	&-checkbox
		width: 16px
		height: 16px
		vertical-align: baseline
</style>
