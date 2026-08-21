"use client";

import { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deleteDevelopment } from "@/lib/actions/developments";

export function DeleteListingButton({ id, slug, name }: { id: string; slug: string; name: string }) {
  const [pending, startTransition] = useTransition();
  const [confirming, setConfirming] = useState(false);

  if (confirming) {
    return (
      <div className="flex items-center gap-2 text-[12px]">
        <span className="text-ink/50">Delete {name}?</span>
        <button
          disabled={pending}
          onClick={() => startTransition(() => deleteDevelopment(id, slug))}
          className="font-semibold text-red-600 hover:underline"
        >
          {pending ? "Deleting..." : "Yes"}
        </button>
        <button onClick={() => setConfirming(false)} className="text-ink/40 hover:underline">
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="text-ink/50 hover:text-red-600"
      aria-label="Delete"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}