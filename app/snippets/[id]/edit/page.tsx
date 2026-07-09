import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { updateSnippet } from "@/lib/actions";

export default async function EditSnippetPage({
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

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Edit Snippet</h1>

      <form action={updateSnippet} className="space-y-4">
        <input type="hidden" name="id" value={snippet.id} />

        <div>
          <label className="block text-sm font-medium mb-1">Title *</label>
          <input
            type="text"
            name="title"
            defaultValue={snippet.title}
            required
            className="w-full border rounded-md px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Code *</label>
          <textarea
            name="code"
            defaultValue={snippet.code}
            required
            rows={10}
            className="w-full border rounded-md px-3 py-2 font-mono text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Language *</label>
          <select
            name="language"
            defaultValue={snippet.language}
            required
            className="w-full border rounded-md px-3 py-2"
          >
            <option value="JavaScript">JavaScript</option>
            <option value="TypeScript">TypeScript</option>
            <option value="Python">Python</option>
            <option value="SQL">SQL</option>
            <option value="HTML">HTML</option>
            <option value="CSS">CSS</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            name="tags"
            defaultValue={snippet.tags ?? ""}
            className="w-full border rounded-md px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Description
          </label>
          <textarea
            name="description"
            defaultValue={snippet.description ?? ""}
            rows={3}
            className="w-full border rounded-md px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}