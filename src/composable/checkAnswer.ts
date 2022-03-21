import { onMounted, onUnmounted, ref } from "vue";
import { writeLesson } from "@/server/api/database";

export function useCheckAnswer(inputs: { answer: string; input: string }[]) {
  function checkAnswer(): boolean {
    return inputs.every(({ answer, input }) => {
      answer === input;
    });
  }

  return { checkAnswer };
}

type Score = {
  [quiz: string]: { [key: string]: boolean };
};

export const score = ref<Score>({});

export function useCheckScore() {
  function fillScore(
    quiz: string,
    answers: { word: string; collect: boolean }[]
  ) {
    // {'brother':false,'sister':true}
    const value = Object.assign(
      ...answers.map(({ word, collect }) => {
        return { [word]: collect };
      })
    );
    score.value = Object.assign(score.value, { [quiz]: value } as Score);
  }

  function uploadScore(uid?: string, course: string, lesson: string) {
    onMounted(async () => {
      if (uid) {
        await writeLesson(uid, course, lesson, score.value);
      }
    });

    //画面を閉じたら消す
    onUnmounted(() => {
      score.value = {};
    });
  }

  return { fillScore, uploadScore };
}
