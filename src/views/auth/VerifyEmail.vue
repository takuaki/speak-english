<template>
  <main class="container is-fullheight">
    <section class="box">
      <form id="signup">
        <p class="title is-medium is-text-centered">SignUp</p>
        <fieldset form="#signup">
          <FieldInput
            label="メールアドレス"
            type="email"
            v-model="email"
            icon="email"
            :error="checkEmail"
          />
        </fieldset>
      </form>
    </section>
  </main>
</template>

<script lang="ts" setup>
import FieldInput from "@/components/input/FieldInput.vue";
import { useCheckAuthInput } from "@/composable/checkAuthField";
import { ref } from "vue";

const email = ref("");

const { checkEmail } = useCheckAuthInput(email, ref(""));
</script>

<style lang="sass" scoped></style>
