const fs = require('fs');
const content = fs.readFileSync('./questions.txt', 'utf8');
const lines = content.split(/\r?\n/);
const questions = [];
let i = 0;

while (i < lines.length) {
  let line = lines[i].trim();
  if (!line) { i++; continue; }

  // Detect question start: line that ends with '?' or is the first line of a multi-line question
  if (!line.match(/^[A-D]\./) && !line.startsWith('ANSWER:')) {
    let questionText = line;
    i++;
    // Gather multi-line question (until we hit an option line)
    while (i < lines.length && !lines[i].trim().match(/^[A-D]\./) && !lines[i].trim().startsWith('ANSWER:')) {
      if (lines[i].trim()) questionText += ' ' + lines[i].trim();
      i++;
    }
    // Now collect options
    let options = [];
    while (i < lines.length && lines[i].trim().match(/^[A-D]\./)) {
      let optLine = lines[i].trim();
      let optText = optLine.replace(/^[A-D]\.\s*/, '');
      options.push(optText);
      i++;
    }
    // Find answer line
    let answerLetter = null;
    while (i < lines.length && !lines[i].trim().startsWith('ANSWER:')) {
      i++;
    }
    if (i < lines.length && lines[i].trim().startsWith('ANSWER:')) {
      answerLetter = lines[i].trim().replace('ANSWER:', '').trim();
      i++;
    }
    if (questionText && options.length === 4 && answerLetter) {
      const correctIndex = answerLetter.charCodeAt(0) - 65;
      questions.push({
        id: questions.length + 1,
        question: questionText,
        options: options,
        correctAnswer: correctIndex,
        domain: 'General',
        explanation: ''
      });
    }
  } else {
    i++;
  }
}

const output = `// Auto-generated from your exact question bank
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
console.log(`✅ Parsed ${questions.length} questions exactly as in your file.`);
