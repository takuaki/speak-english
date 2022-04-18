import { db } from ".";
import { get, getDatabase, ref, set, child } from "firebase/database";
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

const readAt: (level: number, index: number) => Promise<QuizObject[]> = async (
	level,
	index
) => {
	const reference = ref(db, `${level}`);
	const snapshot = await get(reference);
	if (snapshot.exists()) {
		return snapshot.val();
	} else {
		return [];
	}
};

console.log(sentenses);

export { readAt, type QuizObject };
