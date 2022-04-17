import { computed } from "vue";
import type { Ref, ComputedRef } from "vue";

/**
 * @param email
 * @param password medium strong password
 * @param userName at least 4 letters
 */
export function useCheckAuthInput(
	email: Ref<string>,
	password: Ref<string>
	//userName: Ref<string>
) {
	const emailChecker = RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
	const passwordChecker = RegExp("(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}");
	//const userChecker = RegExp("[a-z0-9]{4,12}");
	const checkEmail: ComputedRef<string | null> = computed(() => {
		if (email.value === "") return null;
		return emailChecker.test(email.value) ? null : "不正な値です";
	});

	const checkPassword: ComputedRef<string | null> = computed(() => {
		if (password.value === "") return null;
		return passwordChecker.test(password.value) ? null : "不正な値です";
	});

	return {
		checkEmail,
		checkPassword,
	};
}
