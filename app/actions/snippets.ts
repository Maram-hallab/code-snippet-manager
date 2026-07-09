"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";

export type CreateSnippetState = {
  error?: string;
};

export async function createSnippet(
  _prevState: CreateSnippetState,
  formData: FormData,
): Promise<CreateSnippetState> {
  const title = String(formData.get("title") ?? "").trim();
  const code = String(formData.get("code") ?? "").trim();
  const language = String(formData.get("language") ?? "").trim();
  const tags = String(formData.get("tags") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();

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
