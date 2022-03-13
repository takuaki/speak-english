import { firebaseApp } from ".";
import { get, getDatabase, ref, child } from "firebase/database";
import { success, failure, Success, Failure } from "@/utils/result";
import type { Result } from "@/utils/result";
import type { Database } from "firebase/database";

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

const db: Database = getDatabase(
  firebaseApp,
  "https://speakinglish-c877a-default-rtdb.asia-southeast1.firebasedatabase.app/"
);

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

export { readLesson };
export type { LessonObject };
