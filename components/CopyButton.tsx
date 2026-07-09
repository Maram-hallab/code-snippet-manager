"use client";

import { useState } from "react";

export default function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <button
      onClick={handleCopy}
      className="text-sm bg-gray-800 text-white px-3 py-1.5 rounded-md hover:bg-gray-700"
    >
      {copied ? "Copied!" : "Copy code"}
    </button>
  );
}