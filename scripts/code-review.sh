#!/bin/bash
FILES=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\.(ts|tsx)$')
if [ -z "$FILES" ]; then
  echo "No TypeScript files staged."
  exit 0
fi
DIFF=$(git diff --cached -- $FILES)
PROMPT="Review the following code changes for bugs, security issues, and best practices. Suggest concrete improvements.

$DIFF"

echo "$PROMPT" | claude --output-format stream-json
