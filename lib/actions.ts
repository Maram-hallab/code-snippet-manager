"use server";

import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export async function deleteSnippet(formData: FormData) {
  
  const id = Number(formData.get("id"));
  await prisma.snippet.delete({ where: { id } });
  redirect("/snippets");
}
export async function updateSnippet(formData: FormData) {
  const id = Number(formData.get("id"));
  const title = formData.get("title") as string;
  const code = formData.get("code") as string;
  const language = formData.get("language") as string;
  const tags = formData.get("tags") as string;
  const description = formData.get("description") as string;

  await prisma.snippet.update({
    where: { id },
    data: { title, code, language, tags, description },
  });

  redirect(`/snippets/${id}`);
}