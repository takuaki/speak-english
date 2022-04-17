import { reactive } from "vue";

/**
 * local store replace by vuex
 */

const state = reactive({
	learned_words: 400,
	level: 1,
	progress: [
		{ level: 1, words: 200 },
		{ level: 2, words: 0 },
		{ level: 3, words: 0 },
		{ level: 4, words: 0 },
		{ level: 5, words: 0 },
		{ level: 6, words: 0 },
		{ level: 7, words: 0 },
		{ level: 8, words: 0 },
		{ level: 9, words: 0 },
		{ level: 10, words: 0 },
		{ level: 11, words: 0 },
		{ level: 12, words: 0 },
		{ level: 13, words: 0 },
		{ level: 14, words: 0 },
		{ level: 15, words: 0 },
	],
});

type State = typeof state;

export { type State, state };
