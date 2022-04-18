import { describe, expect, it, beforeEach, vi } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import ErrorMessage from "@/components/notification/ErrorMessage.vue";

describe("ErrorMessage", () => {
	const message = "アラート";
	it("メッセージが表示される", () => {
		const wrapper = mount(ErrorMessage, { props: { message: message } });
		expect(wrapper.html()).toContain(message);
	});

	/*it("メッセージがないときは表示されない", () => {
    const wrapper = mount(ErrorMessage);
    expect(wrapper.html()).toContain("");
  });*/
});
