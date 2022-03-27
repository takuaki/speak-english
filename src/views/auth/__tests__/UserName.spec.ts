import { afterEach, describe, expect, it, vi } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import UserName from "../UserName.vue";
import { uniqueUser } from "@/server/api/admin";

vi.mock("@/server/api/admin", () => ({
  uniqueUser: vi.fn(() => Promise.resolve(false)),
}));

describe("UserName", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("名前が重複したらエラーが発生", async () => {
    const wrapper = mount(UserName);
    await wrapper.find("input[type=text].input").setValue("user");
    await flushPromises();
    const errorText = wrapper.find("label.label").text();
    expect(errorText).toBe("他のユーザーが使っています");
    //expect(vi.isMockFunction(mockSeachUser)).toBe(true);
  });
});
