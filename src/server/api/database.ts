import { db } from ".";
import { get, getDatabase, ref, set, child } from "firebase/database";
import { success, failure, Success, Failure } from "@/utils/result";
import type { Result } from "@/utils/result";
import type { Database } from "firebase/database";
import { objectToString } from "@vue/shared";
import * as dayjs from "dayjs";

type QuizObject = {
  name: string;
  answer: string; //en
  source: string; //ja
  translate: { [key: string]: string };
};

type LessonObject = {
  [key: string]: QuizObject;
};

function isQuiz(obj: unknown): obj is QuizObject {
  if (typeof obj !== "object") return false;
  else if (obj === null) return false;
  const { name, answer, source, translate } = obj as QuizObject;
  if (typeof name !== "string") return false;
  if (typeof answer !== "string") return false;
  if (typeof source !== "string") return false;
  if (typeof translate !== "object") return false;
  for (const key in translate) {
    if (typeof key !== "string" || typeof translate[key] !== "string")
      return false;
  }
  return true;
}

function isLesson(obj: unknown): obj is LessonObject {
  if (typeof obj !== "object") return false;
  else if (obj === null) return false;
  for (const key in obj) {
    //Object.prototype.hasOwnProperty.call(obj, key);
    if (typeof key !== "string") return false;
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (!isQuiz(obj[key])) return false;
    }
  }
  return true;
}

//TODO try-catch
const readLesson: (
  course: string,
  lesson: string
) => Promise<Result<LessonObject, null>> = async (course, lesson) => {
  const path = `${course}/${lesson}`;
  const reference = ref(db);
  const snapshot = await get(child(reference, path));
  if (snapshot.exists()) {
    const lesson = snapshot.val();
    if (isLesson(lesson)) return success(lesson);
    else return failure(null);
  } else {
    return failure(null);
  }
};

const writeLesson: (
  uid: string,
  course: string,
  lesson: string,
  contents: { [quiz: string]: { [word: string]: boolean } }
) => Promise<void> = async (uid, course, lesson, contents) => {
  const path = `user/${uid}/track/${course}/${lesson}`;
  const reference = ref(db, path);
  let error = false;
  for (const quiz in contents) {
    const words: { [word: string]: boolean } = contents[quiz];
    for (const word in words) {
      if (!words[word]) {
        error = true;
        break;
      }
    }
  }

  /**
   * 全て正解なら、ステータスをcompleted,
   * １つ以上不正解があれば、studyingにする
   */
  const status: "completed" | "studying" = !error ? "studying" : "completed";
  const time = dayjs().tz("Asia/Tokyo").format("YYYY/MM/DD HH:mm");
  set(reference, {
    status: status,
    time: time,
    words: contents,
  });
};

/**
 *
 * @param course
 * @returns {lesson:string,quiz:string[]}[]
 * {
 * 	lesson_1:[quiz1,quiz2],
 *  lesson_2:[...]
 * }
 */
const readCourse: (
  course: string
) => Promise<{ [lesson: string]: string[] }> = async (course) => {
  const path = course;
  const reference = ref(db, path);
  const snapshot = await get(reference);
  const obj = Object.create(null);
  if (!snapshot.exists()) return {};
  const lessons = snapshot.val();
  console.log(lessons);
  for (const lesson in lessons) {
    Object.assign(obj, { lesson: Object.keys(lessons[lesson]) });
  }
  return obj;
};

const readProgress: (
  uid: string
) => Promise<{ quiz: string; [word: string]: boolean }> = async (
  uid,
  course
) => {
  const path = `user/${uid}/track`;
  const reference = ref(db, path);
  const snapshot = await get(reference);

  const memory: { [lesson: string]: { [word: string]: boolean } } =
    Object.create(null);

  //const memory: { quiz: string; [word: string]: boolean } = Object.create(null);
  snapshot.forEach((child) => {
    const lesson = child.key;
    if (child.hasChild("words") && lesson) {
      const words = child.child("words");
      for (quiz in words) {
        Object.assign(memory, words[quiz]);
      }
    }
  });
  return memory;
};

export { readLesson, writeLesson, readCourse };
export type { LessonObject };
