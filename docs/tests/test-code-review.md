# Test: Code Review Coverage

**File reviewed:** `src/app/snippets/page.tsx`

## Method
Compared a manual code review approach against an AI-assisted review using 
the prompt template from `prompts/code-review.md`.

## AI-Assisted Review
- **Time:** ~4 minutes
- **Issues found:** 6 total (0 High, 1 Medium, 5 Low)
- Full list of findings: [Here are the 6 issues from the code review I ran earlier on src/app/snippets/page.tsx:

1/Med — The search (title: { contains: q }) is case-sensitive on SQLite, so searching "python" won't match a title like "Reverse a string in Python." Fix: lowercase both sides for comparison, or use mode: "insensitive" if you move to Postgres.
2/Low — The AND: [{}, {}] pattern passes empty objects when there's no search/filter, which works but is unclear. Fix: build the where object conditionally instead of always including two AND entries.
3/Low — q and language aren't trimmed/validated, so whitespace-only input runs a search that silently returns nothing with no feedback. Fix: trim q before using it and treat empty-after-trim the same as no search.
4/Low — The allLanguages query runs on every single page load, even when just searching by text. Not expensive now, but wasteful as data grows. Fix: consider caching or fetching this less often.
5/Low — Naming clarity: language is used both as the search param and as the loop variable (l.language), which is mildly confusing to read. Fix: rename the loop variable, e.g. entry.language.
6/Low — No <label> elements for the search input or language dropdown (only a placeholder on the input) — an accessibility gap. Fix: add visually-hidden <label> tags for screen readers.]

## Manual Review (estimated baseline)
- **Estimated time for a mid/senior developer:** 10-15 minutes for a 
  genuinely careful read-through
- **Estimated issues a human would likely catch:** 3-4 of the 6 
  (naming clarity, missing accessibility labels, redundant query pattern)
- **Issue likely missed by manual review:** the case-sensitivity search 
  bug (#1) — this requires either provider-specific Prisma/SQLite 
  knowledge or actually running the app and testing a lowercase search 
  against a capitalized title. A static read-through is unlikely to 
  surface it.

## Takeaway
AI-assisted review didn't just find more issues by volume — it caught a 
genuine functional bug that a human review, without running the app, 
would likely have missed. This suggests the biggest value of AI-assisted 
review isn't speed, it's catching a different *category* of issue 
(behavioral bugs) that static human reading tends to miss.

## Note
This manual baseline is an informed estimate, not a timed manual pass. 
[If you later do a real timed manual review, replace this section with 
actual measured results.]