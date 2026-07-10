"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";

export type CreateSnippetState = {
  error?: string;
};

function getString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function createSnippet(
  _prevState: CreateSnippetState,
  formData: FormData,
): Promise<CreateSnippetState> {
  const title = getString(formData, "title");
  const code = getString(formData, "code");
  const language = getString(formData, "language");
  const tags = getString(formData, "tags");
  const description = getString(formData, "description");

  if (!title) {
    return { error: "Title is required." };
  }

  if (!code) {
    return { error: "Code is required." };
  }

  if (!language) {
    return { error: "Language is required." };
  }

  try {
    await prisma.snippet.create({
      data: {
        title,
        code,
        language,
        tags: tags || null,
        description: description || null,
      },
    });
  } catch {
    return { error: "Failed to save snippet. Please try again." };
  }

  redirect("/snippets");
}