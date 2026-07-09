import { prisma } from "@/lib/db";
import { codeToHtml } from "shiki";
import CopyButton from "@/components/CopyButton";
import { notFound } from "next/navigation";

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

      <div className="flex justify-end mb-2">
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