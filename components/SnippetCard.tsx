import Link from "next/link";

export type SnippetListItem = {
  id: number;
  title: string;
  language: string;
  tags: string | null;
};

type SnippetCardProps = {
  snippet: SnippetListItem;
};

export default function SnippetCard({ snippet }: SnippetCardProps) {
  const tagList = snippet.tags
    ? snippet.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
    : [];

  return (
    <Link
      href={`/snippets/${snippet.id}`}
      className="block rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition-colors hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700 dark:hover:bg-zinc-800/50"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h2 className="text-base font-medium text-zinc-900 dark:text-zinc-50">
          {snippet.title}
        </h2>
        <span className="shrink-0 rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
          {snippet.language}
        </span>
      </div>

      {tagList.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {tagList.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-zinc-50 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-950 dark:text-zinc-400"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}
    </Link>
  );
}
