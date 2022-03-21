import { customRef } from "vue";
import { readCourse } from "../database";

export namespace Course {
  export interface Response {
    lessons: {
      id: string;
      name: string;
      progress: { questions: number; answered: number };
    }[];
  }
}

const getCourse: (course: string) => Promise<Course.Response> = async (
  course
) => {
  const courses: Course.Response = {
    lessons: [
      { id: "1", name: "Lesson1", progress: { questions: 20, answered: 15 } },
      { id: "2", name: "Lession2", progress: { questions: 20, answered: 0 } },
    ],
  };
  return courses;
};

export { getCourse };
