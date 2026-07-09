import { prisma } from "@/lib/db";
import { codeToHtml } from "shiki";
import CopyButton from "@/components/CopyButton";
import { deleteSnippet } from "@/lib/actions";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function SnippetDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const snippet = await prisma.snippet.findUnique({
    where: { id: Number(id) },
  });

  if (!snippet) {
    notFound();
  }

  const highlightedCode = await codeToHtml(snippet.code, {
    lang: snippet.language.toLowerCase(),
    theme: "github-dark",
  });

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold">{snippet.title}</h1>
        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full font-mono">
          {snippet.language}
        </span>
      </div>

      {snippet.description && (
        <p className="text-gray-600 mb-4">{snippet.description}</p>
      )}

      <div className="flex justify-end gap-2 mb-2">
        <Link
          href={`/snippets/${snippet.id}/edit`}
          className="text-sm bg-gray-100 px-3 py-1.5 rounded-md hover:bg-gray-200"
        >
          Edit
        </Link>
        <form action={deleteSnippet}>
          <input type="hidden" name="id" value={snippet.id} />
          <button
            type="submit"
            className="text-sm bg-red-50 text-red-600 px-3 py-1.5 rounded-md hover:bg-red-100"
          >
            Delete
          </button>
        </form>
        <CopyButton code={snippet.code} />
      </div>

      <div
        className="rounded-lg overflow-x-auto text-sm"
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      />

      {snippet.tags && (
        <div className="flex gap-2 flex-wrap mt-4">
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
    </div>
  );
}