import { ref } from "vue";

function useModal() {
	const closed = ref(true);
	const toggleModal = () => {
		closed.value = !closed.value;
	};
	const closeModal = () => {
		closed.value = true;
	};
	const openModal = () => {
		closed.value = false;
	};
	return {
		openModal,
		closeModal,
		closed,
	};
}

export { useModal };
