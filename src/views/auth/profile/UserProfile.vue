<template>
	<div class="profile">
		<div class="row">
			<label class="label profile-label is-text-left">ユーザー名</label>
			<p class="body profile-text is-text-left">
				{{ user?.displayName }}
			</p>
		</div>
		<div class="row">
			<label class="label profile-label is-text-left">登録メールアドレス</label>
			<p class="body profile-text is-text-left">
				{{ user?.email }}
			</p>
		</div>
		<div>
			<button class="button" @click="logout">ログアウト</button>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { inject, type Ref } from "vue";
import { signOut } from "@/server/api/authenticate";

const user: Ref<User> = inject("user");

const logout = () => {
	signOut();
};
</script>

<style lang="sass" scoped>
.profile
	width: 500px
	margin: 50px auto 0

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
