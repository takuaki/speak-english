import { it, describe, expect, beforeAll, afterAll } from "vitest";
import { loadQuiz, upload, deleteAll, transWords } from "../database/quiz";
import * as data from "./test-data.json";

//データの準備
beforeAll(async () => {
	await upload(data);
});

afterAll(async () => {
	await deleteAll();
});

describe("database", () => {
	it("Levelに応じたQuizを取得", async () => {
		const quizzes = await loadQuiz({ level: 1, start: 0, end: 3 });
		expect(quizzes.length).toBe(3);
		expect(quizzes[0]).toStrictEqual({
			id: "NeksonENlkas",
			source: "私の兄はバスで帰宅します",
			answer: "My brother gets home by bus",
			translate: {
				brother: "兄",
				bus: "バス",
			},
		});
	});

});

describe("meanings", () => {
	it("翻訳された単語の意味を取得", async () => {
		const meanings = await transWords(["bus", "Friday"]);
		expect(meanings).toStrictEqual({
			bus: ["バス"],
			Friday: ["金曜日"],
		});
	});
});
