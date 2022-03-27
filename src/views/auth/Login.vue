<template>
  <main class="container is-fullheight">
    <p class="is-text-right has-pointer" @click="linkSignUp">
      アカウント作成はこちら
    </p>
    <div class="login-alert">
      <ErrorMessage :message="authError" />
    </div>
    <section class="box login-box">
      <form id="login">
        <p class="title is-medium is-text-centered">Login</p>
        <fieldset form="#login">
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
            icon="lock"
            :errorMessage="checkPassword"
          />
        </fieldset>
        <p class="caption is-text-right has-pointer" @click="forgetpassword">
          パスワードを忘れた方はこちら
        </p>
        <button
          type="button"
          class="button"
          @click="submit"
          :disabled="disabled"
        >
          ログイン
        </button>
      </form>
    </section>
  </main>
</template>

<script lang="ts" setup>
import FieldInput from "@/components/input/FieldInput.vue";
import { useCheckAuthInput } from "@/composable/checkAuthField";
import { ref, type Ref, computed } from "vue";
import { useRouter } from "vue-router";
import { signIn } from "@/server/api/authenticate";
import ErrorMessage from "../../components/notification/ErrorMessage.vue";

const email = ref("");
const password = ref("");
const authError = ref("");
const router = useRouter();

const { checkEmail, checkPassword } = useCheckAuthInput(email, password);
const disabled: Ref<boolean> = computed(() => {
  return !(checkEmail.value === null && checkPassword.value === null);
});

const submit = async () => {
  authError.value = "";
  if (disabled.value) return;
  const result = await signIn(email, password);

  result.flatMap(
    ({ error }) => {
      switch (error) {
        case "user-not-found":
          authError.value = "アカウントが存在しません";
          break;
        case "unknown":
          authError.value = "ログイン出来ませんでした";
          break;
      }
    },
    (_) => {
      router.push({ name: "home" });
    }
  );
};

const linkSignUp = () => {
  router.push({ name: "signup" });
};

const forgetpassword = () => {
  router.push({ name: "forgetpassword" });
};
</script>

<style lang="sass" scoped>
.container
	display: flex
	flex-direction: column

.box
	width: 400px
	margin: auto

.button
	margin: 1.0rem auto

.login
	&-alert
		margin: 0 auto 20px
		width: 400px
</style>
