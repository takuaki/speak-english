<template>
	<Header id="header"></Header>
	<main class="main-layout">
		<aside class="sidemenu has-background-white-ter" :class="{'hide':hideMenu}">
			<SideMenu/>
		</aside>
		<section class="main-content">
			<router-view/>
		</section>
	</main>
</template>

<script lang="ts" setup>
import Header from "@/views/Header.vue"
import SideMenu from "@/components/SideMenu.vue"
import { onMounted,ref } from "vue";
import {useToggleMenu} from "@/composable/toggleMenu"

const headerHeight = ref<number|undefined>(0)
const {hideMenu} = useToggleMenu()

onMounted(()=>{
	const header = document.querySelector("#header")
	headerHeight.value = header?.clientHeight
})


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