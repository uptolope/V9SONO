#!/bin/bash
GOAL_FILE="$1"
if [ ! -f "$GOAL_FILE" ]; then
  echo "Usage: ./scripts/auto-develop.sh goal.txt"
  exit 1
fi
GOAL=$(cat "$GOAL_FILE")
PROMPT="You are an expert Next.js developer. Based on this goal, generate the exact code changes needed (full file contents). Output each file as a code block with path.

Goal: $GOAL"

echo "$PROMPT" | claude --output-format stream-json
