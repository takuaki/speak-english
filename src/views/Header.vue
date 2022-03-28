<template>
	<header class="header has-background-primary is-text-on-primary" id="header">
		<nav class="nav">
			<div class="nav-left">
				<span>
					<Logo />
				</span>
				<!--span
					class="icon white is-medium material-icons-outlined"
					type="button"
					@click="toggleMenu()"
				>
					menu
				</span-->
				<!--span
					class="material-icons-outlined icon white is-medium"
					type="button"
					@click="home"
				>
					home
				</span-->
			</div>
			<div class="nav-right">
				<span
					v-if="user !== undefined"
					class="has-pointer"
					@click="profile(user!!)"
				>
					<p class="body is-text-primary">
						{{ user.displayName?.charAt(0).toUpperCase() || "U" }}
					</p>
				</span>
				<span
					v-else
					class="is-text-primary has-pointer"
					type="button"
					@click="login"
					>Login
				</span>
			</div>
		</nav>
	</header>
</template>

<script lang="ts" setup>
import {
	inject,
	defineProps,
	toRefs,
	defineEmits,
	watch,
	ref,
	onMounted,
} from "vue";
import Logo from "@/components/logo/Logo.vue";
import type { Ref } from "vue";
import { useToggleMenu } from "@/composable/toggleMenu";
import { useRouter } from "vue-router";

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

.header
	width: 80%
	padding: 12px 10%
	position: sticky
	top: 0

</style>
