import { describe, expect, it } from "vitest";
import { useCheckAnswer } from "../checkAnswer";

describe("checkAnswer", () => {
  it("fail if inputs are not same", () => {
    const test = [
      {
        answer: "I'm",
        input: "I'm",
      },
      {
        answer: "jenious",
        input: "terrible",
      },
    ];
    const { checkAnswer } = useCheckAnswer(test);
    expect(checkAnswer()).toBe(false);
  });
});
