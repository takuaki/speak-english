<template>
  <main class="container is-fullheight">
    <p class="is-text-left has-pointer" @click="linkSignup">
      <span class="icon material-icons-outlined">arrow_back</span>
      新規登録に戻る
    </p>
    <section class="box">
      <form id="username">
        <p class="title is-medium is-text-centered">ユーザー名</p>
        <fieldset form="#username">
          <FieldInput
            label="ユーザー名"
            type="text"
            v-model="username"
            icon="person"
            :errorMessage="checkUserName"
          ></FieldInput>
        </fieldset>
        <button
          type="button"
          class="button"
          @click="submit"
          :disabled="checkUserName !== null"
        >
          この名前を使う
        </button>
      </form>
    </section>
  </main>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import FieldInput from "../../components/input/FieldInput.vue";
import { uniqueUser } from "@/server/api/admin";
import { setUserName } from "@/server/api/authenticate";
import { inject, ref, watch } from "vue";
import type { Ref } from "vue";

const router = useRouter();
const user: Ref<User> = inject("user");
const username = ref("");
const checkUserName = ref<string | null>(null);

watch(username, async (value) => {
  const unique = await uniqueUser(value);
  checkUserName.value = !unique ? "他のユーザーが使っています" : null;
});

const linkSignup = () => {
  router.push({ name: "signup" });
};
const submit = async () => {
  await setUserName(user.value, username.value);
  router.push({ name: "home" });
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
