<template>
	<Header v-on:update:height="updateHeight"></Header>
	<main class="main-layout">
		<aside
			class="sidemenu has-background-white-ter"
			:class="{ hide: hideMenu }"
		>
			<SideMenu />
		</aside>
		<section class="main-content has-background">
			<RouterView />
		</section>
	</main>
</template>

<script lang="ts" setup>
import Header from "@/views/Header.vue";
import SideMenu from "@/components/SideMenu.vue";
import { ref } from "vue";
import { useToggleMenu } from "@/composable/toggleMenu";
import { RouterView } from "vue-router";

const headerHeight = ref<number | undefined>(0);
const { hideMenu } = useToggleMenu();

const updateHeight = (height?: number) => {
	headerHeight.value = height;
};
</script>

<style lang="sass">

$headerHeight : calc( v-bind(headerHeight) * 1px)


.main-layout
	display: flex
	flex-direction: row
	justify-content: center
	flex-wrap: nowrap
	width: 100%

	.sidemenu
		position: sticky
		top: $headerHeight
		height: calc(100vh - $headerHeight )
		flex-basis: 20%
		flex-grow: 0
		flex-shrink: 1
		transition-property: display
		transition-delay: 500ms

		&.hide
			display: none

	.main-content
		flex-basis: 80%
		flex-grow: 1
</style>
