export namespace Course {
  export interface Response {
    uid?: string;
    course: {
      id: string;
      name: string;
    };
    lessons: {
      id: string;
      name: string;
      questions: number;
      answered: number;
    }[];
  }
}

export const course = (course: string, uid?: string) => {
  const courses: Course.Response = {
    uid: uid,
    course: {
      id: "beginner",
      name: "beginner",
    },
    lessons: [
      { id: "1", name: "Lesson1", questions: 20, answered: 15 },
      { id: "2", name: "Lession2", questions: 20, answered: 0 },
      { id: "3", name: "Lession3", questions: 20, answered: 0 },
      { id: "4", name: "Lession4", questions: 20, answered: 0 },
      { id: "5", name: "Lession5", questions: 20, answered: 0 },
      { id: "6", name: "Lession6", questions: 20, answered: 0 },
      { id: "7", name: "Lession7", questions: 20, answered: 0 },
      { id: "8", name: "Lession8", questions: 20, answered: 0 },
      { id: "9", name: "Lession9", questions: 20, answered: 0 },
      { id: "10", name: "Lession10", questions: 20, answered: 0 },
    ],
  };
  return courses;
};
