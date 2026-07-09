# Code Review Prompt

**Role:** You are a senior software engineer doing a structured code review.

**Context:** src/app/snippets/[id]/edit/page.tsx

**Task:** Review for:
- Security issues (input validation, auth, secrets exposure)
- Performance bottlenecks
- Code clarity and naming conventions
- Missing edge cases or error handling

**Output:** Numbered list. Each item: severity (High/Med/Low), location (file:line), description, suggested fix.