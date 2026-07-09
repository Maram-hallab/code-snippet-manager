"use client";

import { useActionState } from "react";
import {
  createSnippet,
  type CreateSnippetState,
} from "@/app/actions/snippets";

const LANGUAGES = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C",
  "C++",
  "C#",
  "Go",
  "Rust",
  "Ruby",
  "PHP",
  "HTML",
  "CSS",
  "SQL",
  "Bash",
  "JSON",
  "YAML",
  "Markdown",
  "Other",
] as const;

const initialState: CreateSnippetState = {};

const inputClassName =
  "w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-500 dark:focus:ring-zinc-800";

const labelClassName = "mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300";

export default function SnippetForm() {
  const [state, formAction, isPending] = useActionState(
    createSnippet,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-5">
      {state.error ? (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/50 dark:text-red-200"
        >
          {state.error}
        </div>
      ) : null}

      <div>
        <label htmlFor="title" className={labelClassName}>
          Title <span className="text-red-600 dark:text-red-400">*</span>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          className={inputClassName}
          placeholder="e.g. Binary search implementation"
        />
      </div>

      <div>
        <label htmlFor="language" className={labelClassName}>
          Language <span className="text-red-600 dark:text-red-400">*</span>
        </label>
        <select
          id="language"
          name="language"
          required
          defaultValue=""
          className={inputClassName}
        >
          <option value="" disabled>
            Select a language
          </option>
          {LANGUAGES.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="code" className={labelClassName}>
          Code <span className="text-red-600 dark:text-red-400">*</span>
        </label>
        <textarea
          id="code"
          name="code"
          required
          rows={12}
          className={`${inputClassName} font-mono`}
          placeholder="Paste your code here..."
        />
      </div>

      <div>
        <label htmlFor="tags" className={labelClassName}>
          Tags
        </label>
        <input
          id="tags"
          name="tags"
          type="text"
          className={inputClassName}
          placeholder="e.g. algorithms, sorting, interview"
        />
        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
          Comma-separated tags
        </p>
      </div>

      <div>
        <label htmlFor="description" className={labelClassName}>
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          className={inputClassName}
          placeholder="Optional notes about this snippet..."
        />
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          {isPending ? "Saving..." : "Save snippet"}
        </button>
      </div>
    </form>
  );
}
