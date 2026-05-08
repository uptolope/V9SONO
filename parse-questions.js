const fs = require('fs');
const content = fs.readFileSync('./questions.txt', 'utf8');

const lines = content.split(/\r?\n/);
const questions = [];
let current = null;
let options = [];
let answerLine = null;

for (let i = 0; i < lines.length; i++) {
  let line = lines[i].trim();
  if (!line) continue;

  if (/^\d+[\.\s]/.test(line) && !line.startsWith('ANSWER:')) {
    if (current && options.length > 0) {
      questions.push({
        id: questions.length + 1,
        question: current,
        options: [...options],
        correctAnswer: answerLine ? answerLine.charCodeAt(0) - 65 : 0,
        domain: 'General',
        explanation: ''
      });
    }
    current = line.replace(/^\d+[\.\s]/, '').trim();
    options = [];
    answerLine = null;
  }
  else if (/^[A-D]\./.test(line)) {
    let opt = line.replace(/^[A-D]\.\s*/, '').trim();
    options.push(opt);
  }
  else if (line.startsWith('ANSWER:')) {
    let ansLetter = line.replace('ANSWER:', '').trim();
    answerLine = ansLetter;
    if (current && options.length > 0) {
      questions.push({
        id: questions.length + 1,
        question: current,
        options: [...options],
        correctAnswer: ansLetter.charCodeAt(0) - 65,
        domain: 'General',
        explanation: ''
      });
      current = null;
      options = [];
      answerLine = null;
    }
  }
}
if (current && options.length > 0) {
  questions.push({
    id: questions.length + 1,
    question: current,
    options: [...options],
    correctAnswer: answerLine ? answerLine.charCodeAt(0) - 65 : 0,
    domain: 'General',
    explanation: ''
  });
}

const output = `// Auto-generated from your question bank
export interface ExamQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  domain: string;
  explanation: string;
}

export const EXAM_QUESTIONS: ExamQuestion[] = ${JSON.stringify(questions, null, 2)};

export function toClientQuestions(questions: ExamQuestion[]) {
  return questions.map(({ id, question, options, domain }) => ({
    id, question, options, domain
  }));
}

export function shuffleQuestions<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
`;

fs.writeFileSync('src/lib/exam/full-questions.ts', output);
console.log(`✅ Parsed ${questions.length} questions → src/lib/exam/full-questions.ts`);
