import { describe, expect, it, afterEach, vi } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import {
  createRouter,
  createWebHistory,
  useRoute,
  type Router,
} from "vue-router";
import SignUp from "@/views/auth/SignUp.vue";
import { failure } from "@/utils/result";
import type { AuthError } from "firebase/auth";
import type { SignUpError } from "@/server/api/authenticate";
import { wrap } from "module";

vi.mock("@/server/api/authenticate", () => ({
  signUp: vi.fn(async () =>
    failure<string, { error: SignUpError }>({ error: "email-already-in-use" })
  ),
}));

describe("SignUp", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("項目を入力したらボタンがアクティブになる", async () => {
    const wrapper = mount(SignUp);
    await wrapper.find("input[type=email].input").setValue("abc123@gmail.com");
    await wrapper.find("input[type=password].input").setValue("abcdef123456");
    //await wrapper.find("input[type=text].input").setValue("username");
    const disabled = wrapper.find("button.button").attributes("disabled");
    expect(disabled).toBe(undefined);
  });

  it("メールアドレスエラー", async () => {
    const wrapper = mount(SignUp);
    await wrapper.find("input[type=email].input").setValue("abc123");
    await wrapper.find("input[type=password].input").setValue("abcdef123456");
    //await wrapper.find("input[type=text].input").setValue("username");
    const disabled = wrapper.find("button.button").attributes("disabled");
    expect(disabled).toBe("");
  });

  it("アカウントが存在する場合はエラー表示", async () => {
    const wrapper = mount(SignUp);
    await wrapper
      .find("input[type=email].input")
      .setValue("alreadyexist@gmail.com");
    await wrapper.find("input[type=password].input").setValue("abcdef123456");
    await wrapper.find("button.button").trigger("click");
    await flushPromises();
    const notification = wrapper.find(".notification");
    expect(notification.html()).toContain(
      "同じメールアドレスでアカウントが存在します"
    );
  });
});
