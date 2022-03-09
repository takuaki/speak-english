<template>
  <main class="container is-fullheight">
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

const email = ref("");
const password = ref("");
const { checkEmail, checkPassword } = useCheckAuthInput(email, password);
const router = useRouter();

const submit = (_: any) => {};

const forgetpassword = (_: any) => {
  router.push({ name: "forgetpasswd" });
};
</script>

<style lang="sass" scoped>
.container
	display: flex

.box
	width: 400px
	margin: auto

.button
	margin: 1.0rem auto
</style>
