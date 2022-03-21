import { ref } from "vue";

const hideMenu = ref<boolean>(false);

export const useToggleMenu = () => {
  const toggleMenu = () => {
    hideMenu.value = !hideMenu.value;
  };

  return {
    hideMenu,
    toggleMenu,
  };
};
