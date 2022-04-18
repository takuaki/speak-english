<template>
	<div class="container">
		<div class="profile">
			<div class="row">
				<label class="label profile-label is-text-left">ユーザー名</label>
				<p class="body profile-text is-text-left">
					{{ user?.displayName }}
				</p>
			</div>
			<div class="row">
				<label class="label profile-label is-text-left"
					>登録メールアドレス</label
				>
				<p class="body profile-text is-text-left">
					{{ user?.email }}
				</p>
				<PopupIcon :message="message" v-if="message" />
			</div>
			<div class="button-group mt-4">
				<button class="button">プロフィール変更</button>
				<button class="button" @click="logout">ログアウト</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { inject, type Ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { signOut } from "@/server/api/authenticate";
import PopupIcon from "@/components/notification/PopupIcon.vue";

const router = useRouter();
const user = inject<Ref<User>>("user");
const message = computed(() => {
	return user?.value.emailVerified ? "" : "メールが認証されていません";
});

const logout = async () => {
	await signOut();
	router.push({ name: "login" });
};
</script>

<style lang="sass" scoped>
.profile
	width: 500px
	margin: 0 auto
	
.row
	display: flex
	flex-direction: row
	align-items: center
	+ .row
		margin-top: 1.0em
	> .profile-label
		flex-basis: 30%
	> .profile-text
		flex-basis: 70%
</style>
