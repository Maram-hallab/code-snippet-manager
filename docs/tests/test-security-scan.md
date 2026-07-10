# Test: Security/Code Quality Scan Triage

**Tools used:** GitHub Dependabot, SonarCloud

## Baseline
Initial SonarCloud scan on the codebase (890 lines of code) found:
- Security: 0 open issues
- Reliability: 5 open issues
- Maintainability: 10 open issues
- Total: 15 issues

## Process
Went through each issue using SonarCloud's "Why is this an issue?" 
explanations, understood the reasoning, and applied fixes:

1. Wrapped component props in `Readonly<...>` across multiple page 
   components (edit page, detail page, list page, CopyButton) — 
   React/TypeScript best practice for immutability
2. Added `htmlFor`/`id` associations between form `<label>` and 
   `<input>` elements — accessibility fix
3. Replaced unsafe `String(formData.get(...) ?? "")` coercion with a 
   type-safe `getString()` helper — type safety fix
4. Discovered and removed one unused, dead-code component 
   (`SnippetCard.tsx`) that duplicated logic already inline elsewhere

## Result
All 15 issues resolved. Current scan: 0 open issues.

## Takeaway
Most issues were mechanical, repeatable patterns (same readonly-props 
fix applied across 4 files) rather than deep bugs — this made AI-assisted 
triage genuinely efficient, since explaining the pattern once let it be 
applied consistently everywhere. The one non-mechanical finding (unused 
dead code) required a manual check (searching the codebase for usages) 
that AI didn't do automatically — worth noting that human verification 
was still necessary to confirm a fix was safe (not just applying it 
blindly).