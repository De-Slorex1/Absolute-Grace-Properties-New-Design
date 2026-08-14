"use client";

import { CheckCircle2, X } from "lucide-react";

export function SuccessDialog({
  open,
  onClose,
  title,
  message,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-ink/60 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-sm bg-white p-8 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-ink/40 hover:text-ink"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp/10">
          <CheckCircle2 className="h-7 w-7 text-whatsapp" />
        </div>
        <h3 className="mb-2 font-serif text-xl font-semibold">{title}</h3>
        <p className="text-[14px] leading-relaxed text-ink/60">{message}</p>
        <button
          onClick={onClose}
          className="mt-6 w-full rounded-sm bg-indigo px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-deep"
        >
          Done
        </button>
      </div>
    </div>
  );
}