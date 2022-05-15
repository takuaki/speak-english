import { db } from "..";
import { get, getDatabase, ref, set, child, update } from "firebase/database";
import { success, failure, Success, Failure } from "@/utils/result";
import type { Result } from "@/utils/result";
import type { Database } from "firebase/database";
import { objectToString } from "@vue/shared";
import * as dayjs from "dayjs";
import * as sentenses from "@/assets/static/sentenses.json";

type QuizObject = {
	id: string;
	answer: string; //en
	source: string; //ja
	translate: { [key: string]: string };
};

const loadQuiz: (params: {
	level: number;
	start: number;
	end: number;
}) => Promise<QuizObject[]> = async (params) => {
	//
	const { level, start, end } = params;
	const reference = child(ref(db, `level`), `level_${level}`);
	const snapshot = await get(reference);
	if (!snapshot.exists()) return [];
	else {
		//TODO check json type
		const quizzes: QuizObject[] = snapshot.val();
		//TODO
		return quizzes.slice(start, end);
	}
};

const upload: (data: {
	[level: string]: QuizObject[];
}) => Promise<void> = async (data) => {
	const reference = ref(db);
	await set(reference, data);
};

const transWords: (
	words: string[]
) => Promise<{ [word: string]: string[] }> = async (words) => {
	const root = ref(db, "meanings");
	const translates: { [word: string]: string[] } = (
		await get(root)
	).exportVal();
	return Object.fromEntries(
		Object.entries(translates)
			.filter(([key, _]) => words.includes(key))
			.map(([key, value]) => [key, Object.values(value)])
	);
};

const deleteAll: () => Promise<void> = async () => {
	const reference = ref(db);
	await set(reference, null);
};

export { type QuizObject, loadQuiz, upload, deleteAll, transWords };
