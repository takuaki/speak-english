import { readLesson } from "../database";
import type { LessonObject } from "../database";
import { objectToString } from "@vue/shared";

export namespace Questions {
  export interface Response {
    source: {
      sentence: string;
      //words: string[];
    };
    answer: {
      sentence: string;
      words: string[];
      hints: string[];
    };
  }
}

const mapper: (obj: LessonObject) => Questions.Response[] = (obj) => {
  const array: Questions.Response[] = [];
  for (const key in obj) {
    const item = obj[key];
    const words: string[] = [];
    const hints: string[] = [];
    for (const word in item.translate) {
      const hint = item.translate[word];
      words.push(word);
      hints.push(hint);
    }
    array.push({
      source: {
        sentence: item.source,
      },
      answer: {
        sentence: item.answer,
        words: words,
        hints: hints,
      },
    } as Questions.Response);
  }
  return array;
};

export const getQuestions: (
  course: string,
  lesson: string
) => Promise<Questions.Response[]> = async (course, lesson) => {
  const result = await readLesson(course, lesson);
  if (result.isSuccess()) {
    return mapper(result.value);
  } else {
    return [];
  }
};
