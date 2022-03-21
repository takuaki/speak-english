<template>
  <main class="container is-fullheight">
    <p class="is-text-right has-pointer" @click="linkLogin">ログインはこちら</p>
    <section class="box">
      <form id="signup">
        <p class="title is-medium is-text-centered">ユーザー登録</p>
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
          <!--FieldInput
            label="ユーザー名"
            type="text"
            v-model="displayName"
            icon="user"
            :error="true"
          /-->
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
import { useCheckAuthInput } from "@/composable/checkAuthField";
import { computed, ref } from "vue";
import type { Ref } from "vue";
import { signUp } from "@/server/api/authenticate";
import { useRouter } from "vue-router";
const router = useRouter();

const email = ref("");
const password = ref("");

const { checkEmail, checkPassword } = useCheckAuthInput(email, password);
const disabled: Ref<boolean> = computed(() => {
  return !(checkEmail.value === null && checkPassword.value === null);
});

const submit = async () => {
  if (disabled.value) return;
  const result = await signUp(email, password);
  if (result.isSuccess()) {
    router.push({ name: "username" });
  } else if (result.isFailure()) {
    console.error(result.value);
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

.box
	width: 400px
	margin: auto

.button
	margin: 1.0rem auto
</style>
