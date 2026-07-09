export function parseTags(tags: string | null): string[] {
    if (!tags) return [];
    return tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
  }