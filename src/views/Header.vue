<template>
  <header class="header has-background-primary">
    <nav class="nav">
      <div class="nav-left">
        <span
          class="icon white is-medium material-icons-outlined"
          type="button"
          @click="toggleMenu()"
        >
          menu
        </span>
        <span
          class="material-icons-outlined icon white is-medium"
          type="button"
          @click="home"
        >
          home
        </span>
      </div>
      <div class="nav-right">
        <div v-if="user">
          <span
            class="icon white is-medium material-icons-outlined"
            type="button"
            @click="profile"
          >
            account_circle
          </span>
        </div>
        <span
          v-else
          class="is-text-white has-pointer"
          type="button"
          @click="login"
          >Login
        </span>
      </div>
    </nav>
  </header>
</template>

<script lang="ts" setup>
import { inject, defineProps, toRefs, defineEmits, watch, ref } from "vue";
import type { Ref } from "vue";
import { useToggleMenu } from "@/composable/toggleMenu";
import { useRouter } from "vue-router";

const { toggleMenu } = useToggleMenu();
const user = inject<Ref<User>>("user");

const router = useRouter();

const home = () => {
  router.push("/");
};

const login = () => {
  router.push("/login");
};

const profile = () => {
  router.push(`profile/${user?.value?.uid}`);
};
</script>

<style lang="sass" scoped>

.header
	width: 80%
	padding: 12px 10%
	position: sticky
	top: 0

.nav
	display: flex
	flex-direction: row
	justify-items: center
	align-items: center
	flex-wrap: nowrap

	.icon + .icon
		margin-left: .5rem

	&-left
		margin-right: auto

	&-right
		margin-left: auto
</style>
