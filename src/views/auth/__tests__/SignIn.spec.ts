import { describe, expect, it, afterEach, vi } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import { failure } from "@/utils/result";
import type { SignInError } from "@/server/api/authenticate";
import SignIn from "@/views/auth/Login.vue";

vi.mock("@/server/api/authenticate", () => ({
  signIn: vi.fn(async () =>
    failure<string, { error: SignInError }>({ error: "user-not-found" })
  ),
}));

describe("SignIn", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it("項目を入力したらボタンがアクティブになる", async () => {
    const wrapper = mount(SignIn);
    await wrapper.find("input[type=email].input").setValue("abc123@gmail.com");
    await wrapper.find("input[type=password].input").setValue("abcdef123456");
    //await wrapper.find("input[type=text].input").setValue("username");
    const disabled = wrapper.find("button.button").attributes("disabled");
    expect(disabled).toBe(undefined);
  });

  it("メールアドレスエラー", async () => {
    const wrapper = mount(SignIn);
    await wrapper.find("input[type=email].input").setValue("abc123");
    await wrapper.find("input[type=password].input").setValue("abcdef123456");
    //await wrapper.find("input[type=text].input").setValue("username");
    const disabled = wrapper.find("button.button").attributes("disabled");
    expect(disabled).toBe("");
  });

  it("ユーザーが存在しない場合はエラー表示", async () => {
    const wrapper = mount(SignIn);
    await wrapper
      .find("input[type=email].input")
      .setValue("alreadyexist@gmail.com");
    await wrapper.find("input[type=password].input").setValue("abcdef123456");
    await wrapper.find("button.button").trigger("click");
    await flushPromises();
    const notification = wrapper.find(".notification");
    expect(notification.html()).toContain("アカウントが存在しません");
  });
});
