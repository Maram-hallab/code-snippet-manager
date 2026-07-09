"use server";

import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export async function deleteSnippet(formData: FormData) {
  const id = Number(formData.get("id"));
  await prisma.snippet.delete({ where: { id } });
  redirect("/snippets");
}