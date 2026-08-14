"use client";

import { Download, Clock } from "lucide-react";

interface BrochureButtonProps {
  brochure?: string;
}

export function BrochureButton({ brochure }: BrochureButtonProps) {
  if (brochure) {
    return (
      <a
        href={brochure}
        download
        className="flex items-center gap-2 self-start rounded-sm border border-line px-4 py-2.5 text-[13px] font-medium text-ink/70 transition-all duration-300 hover:border-ink hover:bg-ink hover:text-white"
      >
        <Download className="h-3.5 w-3.5" />
        Download Brochure
      </a>
    );
  }

  return (
    <button
      type="button"
      disabled
      className="flex cursor-not-allowed items-center gap-2 self-start rounded-sm border border-line bg-ink/[0.02] px-4 py-2.5 text-[13px] font-medium text-ink/40"
      title="Brochure coming soon"
    >
      <Clock className="h-3.5 w-3.5" />
      Brochure Coming Soon
    </button>
  );
}