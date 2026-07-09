# Project: Code Snippet Manager
A code snippet manager built with Next.js, Prisma, and SQLite.

## Stack
- Next.js (App Router, TypeScript)
- Prisma ORM + SQLite (dev), PostgreSQL (prod)
- Tailwind CSS
- Shiki for syntax highlighting

## Conventions
- Use App Router server actions, not separate API route handlers, where possible
- Keep components in /components, one file per component
- Use Prisma client from /lib/db.ts

## Current focus
Sprint 1 complete (CRUD done). Starting Sprint 2: search, filtering, and dashboard.