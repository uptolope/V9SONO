#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const importantFiles = [
  'src/app/page-client.tsx',
  'src/components/app/exam-simulator.tsx',
  'src/lib/exam/full-questions.ts',
  'src/lib/auth.ts',
  'src/app/api/auth/[...nextauth]/route.ts',
  'prisma/schema.prisma',
];

let context = '';
for (const file of importantFiles) {
  if (fs.existsSync(file)) {
    context += `\n// FILE: ${file}\n${fs.readFileSync(file, 'utf-8')}\n`;
  }
}
const prompt = `You are an expert full‑stack developer. Review the following codebase and suggest improvements, bug fixes, or optimizations.\n\n${context}`;
fs.writeFileSync('claude-context-prompt.md', prompt);
console.log('✅ Generated claude-context-prompt.md');
