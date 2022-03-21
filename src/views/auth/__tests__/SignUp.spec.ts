import { describe, expect, it, MockedFunction } from "vitest";
import { mount, shallowMount } from "@vue/test-utils";
import SignUp from "../SignUp.vue";
import { wrap } from "module";

describe("SignUp", () => {
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
});
