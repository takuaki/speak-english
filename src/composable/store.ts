import { reactive } from "vue";
import { correspondWith } from "@/server/api/level";

/**
 * local store replace by vuex
 */

const state = reactive({
	learned_words: 400,
	level: 1,
	progress: 12,
});

type State = typeof state;
const stateKey: InjectionKey<State> = Symbol("state");

export { type State, state, stateKey };
