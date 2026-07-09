import Link from "next/link";
import { prisma } from "@/lib/db";

export default async function SnippetsPage() {
  const snippets = await prisma.snippet.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">My Snippets</h1>
        <Link
          href="/snippets/new"
          className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800"
        >
          + New Snippet
        </Link>
      </div>

      {snippets.length === 0 ? (
        <div className="text-center py-20 border border-dashed rounded-lg">
          <p className="text-gray-500 mb-4">You don't have any snippets yet.</p>
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
                  {snippet.tags.split(",").map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-gray-500 bg-gray-50 px-2 py-0.5 rounded"
                    >
                      #{tag.trim()}
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