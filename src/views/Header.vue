<template>
	<header class="header has-background-primary is-text-on-primary" id="header">
		<nav class="nav">
			<div class="nav-left">
				<span>
					<Logo />
				</span>
			</div>
			<div class="nav-right">
				<div class="nav-item">
					<router-link :to="{ name: 'aboutLevel' }">Levelについて</router-link>
				</div>
				<div class="nav-item">
					<span
						v-if="user !== undefined"
						class="has-pointer user-icon"
						@click="profile(user!!)"
					>
						<p class="body is-bold user-icon-text">
							{{ user.displayName?.charAt(0).toUpperCase() || "U" }}
						</p>
					</span>
					<span
						v-else
						class="is-text-on-primary has-pointer"
						type="button"
						@click="login"
						>Login
					</span>
				</div>
			</div>
		</nav>
	</header>
</template>

<script lang="ts" setup>
import { inject, defineEmits, onMounted } from "vue";
import Logo from "@/components/icon/Logo.vue";
import type { Ref } from "vue";
import { useToggleMenu } from "@/composable/toggleMenu";
import { useRouter, RouterLink } from "vue-router";

const { toggleMenu } = useToggleMenu();
const user = inject<Ref<User>>("user");

const router = useRouter();

const emits = defineEmits<{ (e: "update:height", height?: number): void }>();

const home = () => {
	router.push({ name: "home" });
};

const login = () => {
	router.push({ name: "login" });
};

const profile = (user: User) => {
	router.push({
		name: "profile",
		params: { username: user.displayName },
	});
};

onMounted(() => {
	const header = document.querySelector("#header");
	emits("update:height", header?.clientHeight);
});
</script>

<style lang="sass" scoped>
@import "@/assets/variables.sass"

.user-icon
	display: flex
	width: 45px
	height: 45px
	border-radius: 50%
	background: white
	justify-content: center

	> .user-icon-text
			display: block
			color: $primary-color
			align-self: center
</style>
