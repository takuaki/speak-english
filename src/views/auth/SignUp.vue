<template>
	<main class="container is-fullheight">
		<p class="is-text-right has-pointer" @click="linkLogin">ログインはこちら</p>
		<div class="signup-alert">
			<ErrorMessage :message="authError" />
		</div>
		<section class="box signup-box">
			<form id="signup">
				<p class="title is-medium is-text-centered">SignUp</p>
				<fieldset form="#signup">
					<FieldInput
						label="メールアドレス"
						type="email"
						v-model="email"
						icon="email"
						:errorMessage="checkEmail"
					/>
					<FieldInput
						label="パスワード"
						type="password"
						v-model="password"
						icon="password"
						:errorMessage="checkPassword"
					/>
				</fieldset>
				<button
					type="button"
					class="button"
					@click="submit"
					:disabled="disabled"
				>
					登録する
				</button>
			</form>
		</section>
	</main>
</template>

<script lang="ts" setup>
import FieldInput from "@/components/input/FieldInput.vue";
import ErrorMessage from "@/components/notification/ErrorMessage.vue";
import { useCheckAuthInput } from "@/composable/checkAuthField";
import { computed, ref } from "vue";
import type { Ref } from "vue";
import { signUp } from "@/server/api/authenticate";
import { useRouter } from "vue-router";
const router = useRouter();

const email = ref("");
const password = ref("");
const authError = ref("");

const { checkEmail, checkPassword } = useCheckAuthInput(email, password);
const disabled: Ref<boolean> = computed(() => {
	return !(checkEmail.value === null && checkPassword.value === null);
});

const submit = async () => {
	authError.value = "";
	if (disabled.value) return;
	const result = await signUp(email, password);
	if (result.isSuccess()) {
		router.push({ name: "username" });
	} else if (result.isFailure()) {
		switch (result.value.error) {
			case "email-already-in-use":
				authError.value = "同じメールアドレスでアカウントが存在します";
				break;
			default:
				authError.value = "新規登録でエラーが発生しました";
				break;
		}
	}
};

const linkLogin = () => {
	router.push({ name: "login" });
};
</script>

<style lang="sass" scoped>
.container
	display: flex
	flex-direction: column

.signup-box
	width: 400px
	margin: auto

.button
	margin: 1.0rem auto

.signup
	&-alert
		margin: 0 auto 20px
		width: 400px
</style>
