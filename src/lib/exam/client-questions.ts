import { EXAM_QUESTIONS, toClientQuestions, shuffleQuestions } from "./full-questions";

export function getRandomExamQuestions() {
  const shuffled = shuffleQuestions(EXAM_QUESTIONS);
  return toClientQuestions(shuffled);
}
