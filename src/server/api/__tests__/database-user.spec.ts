import { prependListener } from "process";
import {
	it,
	describe,
	expect,
	beforeAll,
	afterAll,
	beforeEach,
	afterEach,
} from "vitest";
import {
	submitAnswer,
	getMyWordList,
	getMyLevel,
	getProgress,
	//only for testing
	setDataForTest,
	getDataForTest,
	deleteDataForTest,
} from "../database/user";

describe("user-database", () => {
	beforeEach(async () => {
		await setDataForTest({
			user: {
				USER_ID_ABCD: {
					words: {
						bus: { date: "2022-01-01T00:00:00+09:00", mistake: -1 }, // busは一度間違えた設定
						area: { date: "2022-01-01T00:00:00+09:00", mistake: 1 },
					},
					quizzes: {
						level_1: {
							NeonbPNDfnon: { translate: 0, bus: 1 },
							iNe1pnQusnad: { area: -1, friday: -1 },
						},
					},
				},
			},
		});
	});

	afterEach(async () => {
		await deleteDataForTest();
	});

	it("正解したら0にリセット、不正解だと+1", async () => {
		const uid = "USER_ID_ABCD";
		await submitAnswer(uid, 1, {
			NeonbPNDfnon: { translate: true, bus: false },
			iNe1pnQusnad: { area: false, friday: false },
		});
		const data = await getDataForTest(uid);
		expect(data["quizzes"]["level_1"]).toStrictEqual({
			NeonbPNDfnon: { translate: 0, bus: 2 },
			iNe1pnQusnad: { area: 1, friday: 1 },
		});
	});

	it("Quizの結果からWordListが更新される", async () => {
		const uid = "USER_ID_ABCD";
		await submitAnswer(uid, 1, {
			NeonbPNDfnon: { translate: true, bus: false },
			iNe1pnQusnad: { area: false, friday: false },
		});
		const wordList = await getMyWordList(uid);
		const flatWordList = Object.fromEntries(
			Object.entries<{ date: string; mistake: number }>(wordList).map(
				([word, { mistake }]) => [word, mistake]
			)
		);
		expect(flatWordList).toStrictEqual({
			translate: 0,
			bus: 1,
			area: 2,
			friday: 1,
		});
	});

	it("答えにないWodListは更新されない", async () => {
		const uid = "USER_ID_ABCD";
		await submitAnswer(uid, 1, {
			NeonbPNDfnon: { translate: true, bus: false },
		});
		const wordList = await getMyWordList(uid);
		expect(wordList["area"]).toStrictEqual({
			date: "2022-01-01T00:00:00+09:00",
			mistake: 1,
		});
	});
});

describe("search-user-history", () => {
	beforeEach(async () => {
		await setDataForTest({
			level: {
				level_1: [
					{
						id: "NeksonENlkas",
						source: "私の兄はバスで帰宅します",
						answer: "My brother gets home by bus",
						translate: {
							brother: "兄",
							bus: "バス",
						},
					},
					{
						id: "eNeonagsdnfq",
						source: "マイクは時々ユミと話をします",
						answre: "Mike sometimes talks with Yumi",
						translate: {
							sometimes: "時々",
						},
					},
					{
						id: "nBEndspnENOb",
						source: "あなた達は金曜日の午後に何を勉強しますか？",
						answer: "What do you study on Friday afternoon?",
						translate: {
							study: "勉強する",
							Friday: "金曜日",
						},
					},
				],
				level_2: [
					{
						id: "iNeasdnPNEGN",
						source: "私の妹はアメリカの歴史について知りません",
						answer: "My sister doesn't know about American history",
						translate: {
							know: "知っている",
							history: "歴史",
						},
					},
					{
						id: "NBganepnGEN0",
						source: "私は本を100冊もっています",
						answer: "I have one hundreds books",
						translate: {
							hundreds: "100",
						},
					},
				],
			},
			user: {
				USER_ID_ABCD: {
					current_level: 2,
					last_quiz: "iNeasdnPNEGN",
					quizzes: {
						level_1: {
							NeksonENlkas: { brother: 0, bus: 1 },
							eNeonagsdnfq: { sometimes: 0 },
						},
						level_2: {
							iNeasdnPNEGN: { know: 0, history: 0 },
						},
					},
				},
			},
		});
	});

	it("現在のレベルを取得", async () => {
		const uid = "USER_ID_ABCD";
		const currentLevel = await getMyLevel(uid);
		expect(currentLevel).toBe(2);
	});

	it("level別の進捗率を取得", async () => {
		const uid = "USER_ID_ABCD";
		const progress = await getProgress(uid);
		expect(progress).toStrictEqual({
			by_sentence: {
				level_1: { correct: 1, mistake: 1, all: 3 },
				level_2: { correct: 1, mistake: 0, all: 2 },
			},
			by_word: {
				level_1: { correct: 2, mistake: 1, all: 5 },
				level_2: { correct: 2, mistake: 0, all: 3 },
			},
		});
	});
});
