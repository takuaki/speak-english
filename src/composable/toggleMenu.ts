import { ref } from "vue";

const hideMenu = ref<boolean>(true);

export const useToggleMenu = () => {
	const toggleMenu = () => {
		hideMenu.value = !hideMenu.value;
	};

	return {
		hideMenu,
		toggleMenu,
	};
};
