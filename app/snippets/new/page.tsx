import SnippetForm from "@/components/SnippetForm";

export default function NewSnippetPage() {
  return (
    <div className="min-h-full bg-zinc-50 dark:bg-zinc-950">
      <main className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Add a snippet
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Save a code snippet with a title, language, and optional tags.
          </p>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <SnippetForm />
        </div>
      </main>
    </div>
  );
}
