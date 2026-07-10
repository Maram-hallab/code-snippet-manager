import Link from "next/link";
import { prisma } from "@/lib/db";
export const dynamic = "force-dynamic";
export default async function SnippetsPage({
  searchParams,
}: Readonly<{
  searchParams: Promise<{ q?: string; language?: string }>;
}>) {
  const { q, language } = await searchParams;

  const snippets = await prisma.snippet.findMany({
    where: {
      AND: [
        q ? { title: { contains: q } } : {},
        language ? { language: language } : {},
      ],
    },
    orderBy: { createdAt: "desc" },
  });

  const allLanguages = await prisma.snippet.findMany({
    select: { language: true },
    distinct: ["language"],
  });

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Snippets</h1>
        <Link
          href="/snippets/new"
          className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800"
        >
          + New Snippet
        </Link>
      </div>

      <form className="flex gap-2 mb-8" method="GET">
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Search by title..."
          className="flex-1 border rounded-md px-3 py-2 text-sm"
        />
        <select
          name="language"
          defaultValue={language ?? ""}
          className="border rounded-md px-3 py-2 text-sm"
        >
          <option value="">All languages</option>
          {allLanguages.map((l) => (
            <option key={l.language} value={l.language}>
              {l.language}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-gray-100 px-4 py-2 rounded-md text-sm hover:bg-gray-200"
        >
          Filter
        </button>
      </form>

      {snippets.length === 0 ? (
        <div className="text-center py-20 border border-dashed rounded-lg">
          <p className="text-gray-500 mb-4">
            {q || language
              ? "No snippets match your search."
              : "You don't have any snippets yet."}
          </p>
          <Link
            href="/snippets/new"
            className="text-blue-600 font-medium hover:underline"
          >
            Create your first snippet →
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {snippets.map((snippet) => (
            <Link
              key={snippet.id}
              href={`/snippets/${snippet.id}`}
              className="block border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-semibold text-lg">{snippet.title}</h2>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded-full font-mono">
                  {snippet.language}
                </span>
              </div>
              {snippet.tags && (
                <div className="flex gap-2 flex-wrap">
                  {snippet.tags
                    .split(",")
                    .map((tag) => tag.trim())
                    .filter((tag) => tag.length > 0)
                    .map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-gray-500 bg-gray-50 px-2 py-0.5 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}