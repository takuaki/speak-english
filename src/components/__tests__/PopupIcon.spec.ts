import { describe, expect, it, beforeEach, vi } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import PopupIcon from "@/components/notification/PopupIcon.vue";

describe("PopupIcon", () => {
	const message = "表示用メッセージ";

	it("メッセージが表示される", () => {
		const wrapper = mount(PopupIcon, {
			props: {
				message: message,
			},
		});
		expect(wrapper.html()).toContain(message);
	});

	it("ホバーしたらメッセージが表示される", async () => {
		const wrapper = mount(PopupIcon, { props: { message: message } });
		await wrapper.trigger("mouseover");
		await flushPromises();
		const display = wrapper.find(".popup-message").isVisible();
		expect(display).toBeTruthy();
	});

	it("ホバーアウトしたらメッセージが表示されない", async () => {
		const wrapper = mount(PopupIcon, { props: { message: message } });
		await wrapper.trigger("mouseleave");
		await flushPromises();
		const display = wrapper.find(".popup-message").isVisible();
		expect(display).toBeFalsy();
	});
});
