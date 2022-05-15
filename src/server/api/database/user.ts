import { db } from "..";
import { get, ref, set, child, update } from "firebase/database";
import dayjs from "dayjs";

/**
 * post test data
 * {
 * 	quiz_id:{
 * 		translate: false,//間違い
 *    bus: true//正解
 *  },
 * 	...
 * }
 * @returns number
 */
const submitAnswer: (
	uid: string,
	level: number,
	answer: {
		[quiz_id: string]: {
			[word: string]: boolean;
		};
	}
) => Promise<void> = async (uid, level, answer) => {
	const root = ref(db, `user/${uid}`);
	const snap = await get(child(root, `quizzes/level_${level}`));
	if (!snap.exists()) {
		//quizzes キーを追加する
		await set(child(root, `quizzes/level_${level}`), {});
	} else {
		//TODO snap.exportValの型check
		const val: { [id: string]: { [word: string]: number } } = snap.exportVal();
		//回答のquizが混ざっていればアップデートする
		const updateVal = _updateCount(val, answer);
		await update(child(root, `quizzes/level_${level}`), updateVal);
		await updateMyWordList(uid, answer);
		await updateLastQuiz(uid, answer);
	}
};

const updateLastQuiz: (
	uid: string,
	answer: {
		[quiz_id: string]: {
			[word: string]: boolean;
		};
	}
) => Promise<void> = async (uid, answer) => {
	const last_quiz_id = Object.keys(answer).reverse()[0];
	if (last_quiz_id !== undefined) {
		const root = ref(db, `use/${uid}`);
		await update(root, { last_quiz: last_quiz_id });
	}
};

const updateMyWordList = async (
	uid: string,
	//words: { [word: string]: boolean }
	answer: { [quiz_id: string]: { [word: string]: boolean } }
) => {
	const words = Object.fromEntries(
		Object.entries(answer)
			.map(([_, obj]) => {
				return Object.entries(obj).map(([word, mistake]) => {
					return [word, mistake];
				});
			})
			.flat()
	);
	const root = ref(db, `user/${uid}/words`);
	const snap = await get(root);
	if (!snap.exists()) {
		await set(root, {});
	} else {
		const target = (await get(root)).exportVal();
		update(root, _udpateMyWordList(target, words));
	}
};

const getProgress: (uid: string) => Promise<object> = async (uid) => {
	//const quizzes = (await get(ref(db, `user/${uid}/quizzes`))).exportVal();
	//const snap = await get(ref(db, "level"));

	await _getPogress(uid, "level_1");
	/*snap.forEach((child) => {
		const level = child.key; // level_1,...
		if (level === null) return;

		if (level !== null && level in quizzes) {
			quizzes[level];
		}
	});

	const snapshot = await get(root);
	if (snapshot.exists()) {
		const quizzes: {
			[level: string]: { [id: string]: { [word: string]: boolean } };
		} = snapshot.exportVal();
	} else {
		//TODO
	}*/
	return {};
};

const _getPogress: (uid: string, level: string) => Promise<object> = async (
	uid,
	level
) => {
	const snap = await get(ref(db, `level/${level}`));
	const sentences:{answer:string,id:string,souce:string,translate:}[] = snap.val()

	console.log(snap.val());
	return {};
};

const getMyLevel: (uid: string) => Promise<number> = async (uid) => {
	const root = ref(db, `user/${uid}/current_level`);
	return (await get(root)).val();
};

const getMyWordList = async (uid: string) => {
	const root = ref(db, `user/${uid}/words`);
	return (await get(root)).exportVal();
};

const deleteDataForTest = async () => {
	await set(ref(db), null);
};

const setDataForTest = async (obj: object) => {
	await set(ref(db), obj);
};

const getDataForTest = async (uid: string) => {
	const snapshot = await get(child(ref(db), `user/${uid}`));
	return snapshot.exists() ? snapshot.exportVal() : null;
};

const _udpateMyWordList = (
	target: { [word: string]: { date: string; mistake: number } },
	answer: { [word: string]: boolean }
) => {
	const now = dayjs().format();
	return Object.fromEntries(
		[...new Set([...Object.keys(target), ...Object.keys(answer)])].map(
			(key) => {
				// targetにあってanswerにないものはそのまま
				// answerにあってtargetにないものは、0か1
				// answeにあってtargetにあるものは、0かnum
				if (!(key in answer)) {
					//targetにあってanswerにない
					return [key, target[key]];
				} else {
					const correct = answer[key];
					if (key in target) {
						const mistake = target[key].mistake;
						return [
							key,
							{
								date: now,
								mistake: correct ? 0 : mistake === -1 ? 1 : mistake + 1,
							},
						];
					} else {
						return [key, { date: now, mistake: correct ? 0 : 1 }];
					}
				}
			}
		)
	);
};

const _updateCount = (
	data: { [quiz: string]: { [word: string]: number } },
	answer: { [quiz: string]: { [word: string]: boolean } }
) => {
	return Object.fromEntries(
		Object.entries(data).map(([key, value]) => {
			return [
				key,
				Object.fromEntries(
					Object.entries(value).map(([word, num]) => {
						if (key in answer && word in answer[key]) {
							return [word, answer[key][word] ? 0 : num === -1 ? 1 : num + 1];
						} else {
							return [word, num];
						}
					})
				),
			];
		})
	);
};

export {
	submitAnswer,
	getMyWordList,
	getMyLevel,
	getProgress,
	setDataForTest,
	deleteDataForTest,
	getDataForTest,
};
