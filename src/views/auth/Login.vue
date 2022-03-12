<template>
  <main class="container is-fullheight">
    <p class="is-text-right has-pointer" @click="linkSignUp">
      アカウント作成はこちら
    </p>
    <section class="box">
      <form id="login">
        <p class="title is-medium is-text-centered">Login</p>
        <fieldset form="#login">
          <FieldInput
            label="メールアドレス"
            type="email"
            v-model="email"
            icon="email"
            :error="checkEmail"
          />
          <FieldInput
            label="パスワード"
            type="password"
            v-model="password"
            icon="lock"
            :error="checkPassword"
          />
        </fieldset>
        <p class="caption is-text-right has-pointer" @click="forgetpassword">
          パスワードを忘れた方はこちら
        </p>
        <button
          type="button"
          class="button"
          @click="submit"
          :disabled="checkEmail && checkPassword"
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
import { ref } from "vue";
import { useRouter } from "vue-router";
import { signIn } from "@/server/api/authenticate";

const email = ref("");
const password = ref("");
const { checkEmail, checkPassword } = useCheckAuthInput(email, password);
const router = useRouter();

const submit = async () => {
  const result = await signIn(email, password);
  if (result.isSuccess()) {
    router.push({ name: "home" });
  } else {
    console.error(result.value);
  }
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
</style>
