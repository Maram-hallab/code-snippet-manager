import { prisma } from "@/lib/db";

export default async function DashboardPage() {
  const total = await prisma.snippet.count();

  const allSnippets = await prisma.snippet.findMany({
    select: { language: true, tags: true },
  });

  // Count snippets per language
  const languageCounts: Record<string, number> = {};
  for (const s of allSnippets) {
    languageCounts[s.language] = (languageCounts[s.language] ?? 0) + 1;
  }

  // Count tag frequency
  const tagCounts: Record<string, number> = {};
  for (const s of allSnippets) {
    if (!s.tags) continue;
    for (const tag of s.tags.split(",")) {
      const clean = tag.trim();
      if (!clean) continue;
      tagCounts[clean] = (tagCounts[clean] ?? 0) + 1;
    }
  }

  const topTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="border rounded-lg p-6">
          <p className="text-sm text-gray-500 mb-1">Total Snippets</p>
          <p className="text-3xl font-bold">{total}</p>
        </div>
        <div className="border rounded-lg p-6">
          <p className="text-sm text-gray-500 mb-1">Languages Used</p>
          <p className="text-3xl font-bold">
            {Object.keys(languageCounts).length}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <h2 className="font-semibold mb-3">By Language</h2>
          <div className="space-y-2">
            {Object.entries(languageCounts).map(([lang, count]) => (
              <div key={lang} className="flex justify-between text-sm">
                <span>{lang}</span>
                <span className="font-mono text-gray-500">{count}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-semibold mb-3">Top Tags</h2>
          <div className="space-y-2">
            {topTags.length === 0 ? (
              <p className="text-sm text-gray-400">No tags yet.</p>
            ) : (
              topTags.map(([tag, count]) => (
                <div key={tag} className="flex justify-between text-sm">
                  <span>#{tag}</span>
                  <span className="font-mono text-gray-500">{count}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}