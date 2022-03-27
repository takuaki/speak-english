<template>
  <main class="container is-fullheight">
    <section class="box">
      <form id="forgetpassword" v-if="!sendEmail">
        <p class="title is-medium is-text-centered">パスワード再発行</p>
        <fieldset form="#signup">
          <FieldInput
            label="メールアドレス"
            type="email"
            v-model="email"
            icon="email"
            :errorMessage="checkEmail"
          />
        </fieldset>
        <button type="button" class="button" @click="submit">再発行</button>
      </form>
      <div v-else>
        <p class="is-text-center body">
          {{ email }}
          <br />
          にパスワード再発行のメールを送信しました
          <br />
          メールboxをご確認ください
        </p>
        <button class="button is-primary" @click="linkLogin">
          ログイン画面へ
        </button>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import FieldInput from "@/components/input/FieldInput.vue";
import { ref } from "vue";
import { useCheckAuthInput } from "@/composable/checkAuthField";
import { sendResetPassword } from "@/server/api/authenticate";
import { useRouter } from "vue-router";

const router = useRouter();
const email = ref<string>("");
const sendEmail = ref(false);

const submit = async () => {
  sendResetPassword(email.value);
  sendEmail.value = true;
  //router.push({ name: "" });
};

const linkLogin = () => {
  router.push({ name: "login" });
};

const { checkEmail } = useCheckAuthInput(email, ref(""));
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
