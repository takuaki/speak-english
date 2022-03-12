import { onMounted, onUnmounted } from "vue";

export function useCheckAnswer(inputs: { answer: string; input: string }[]) {
  function checkAnswer(): boolean {
    return inputs.every(({ answer, input }) => {
      answer === input;
    });
  }

  return { checkAnswer };
}
