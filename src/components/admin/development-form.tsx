"use client";

i"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Plus, X, Upload, FileText } from "lucide-react";
import {
  createDevelopment,
  updateDevelopment,
  uploadDevelopmentImage,
  uploadDevelopmentBrochure,
  type DevelopmentFormInput,
} from "@/lib/actions/developments";
import type { Development, MediaItem } from "@/lib/types";

export function DevelopmentForm({ existing }: { existing?: Development }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState<DevelopmentFormInput>({
    slug: existing?.slug ?? "",
    sortOrder: existing?.sortOrder ?? 0,
    location: existing?.location ?? "",
    lga: existing?.lga ?? "",
    name: existing?.name ?? "",
    description: existing?.description ?? "",
    fullDescription: existing?.fullDescription ?? [""],
    plotSize: existing?.plotSize ?? "500 sqm",
    priceUnit: existing?.priceUnit ?? "per plot",
    document: existing?.document ?? "C of O",
    priceFrom: existing?.priceFrom ?? "",
    image: existing?.image ?? "",
    media: existing?.media ?? [],
    coordinates: existing?.coordinates ?? { lat: 0, lng: 0 },
    plotsAvailable: existing?.plotsAvailable ?? 0,
    plotsTotal: existing?.plotsTotal ?? 0,
    titleStatus: existing?.titleStatus ?? "Certificate of Occupancy (C of O)",
    zoning: existing?.zoning ?? "Residential",
    listedDate: existing?.listedDate ?? new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    features: existing?.features ?? [""],
    isPlaceholderMedia: existing?.isPlaceholderMedia ?? false,
    published: existing?.published ?? true,
    brochure: existing?.brochure ?? null,
  });

  function update<K extends keyof DevelopmentFormInput>(key: K, value: DevelopmentFormInput[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleCoverUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const result = await uploadDevelopmentImage(fd);
    setUploading(false);
    if (result.url) {
      update("image", result.url);
    } else {
      setError(result.error ?? "Upload failed.");
    }
  }

  async function handleBrochureUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const result = await uploadDevelopmentBrochure(fd);
    setUploading(false);
    if (result.url) {
      update("brochure", result.url);
    } else {
      setError(result.error ?? "Upload failed.");
    }
  }

  async function handleGalleryUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const result = await uploadDevelopmentImage(fd);
    setUploading(false);
    if (result.url) {
      const newItem: MediaItem = { type: "image", src: result.url };
      update("media", [...form.media, newItem]);
    } else {
      setError(result.error ?? "Upload failed.");
    }
  }

  function addVideo() {
    const videoId = prompt("Paste the YouTube video ID (the part after /embed/ or /shorts/):");
    if (!videoId) return;
    const vertical = confirm("Is this a vertical video (YouTube Short)? OK = yes, Cancel = no");
    update("media", [...form.media, { type: "video", videoId: videoId.trim(), vertical }]);
  }

  function removeMedia(index: number) {
    update(
      "media",
      form.media.filter((_, i) => i !== index)
    );
  }

  function updateListField(field: "fullDescription" | "features", index: number, value: string) {
    const next = [...form[field]];
    next[index] = value;
    update(field, next);
  }

  function addListItem(field: "fullDescription" | "features") {
    update(field, [...form[field], ""]);
  }

  function removeListItem(field: "fullDescription" | "features", index: number) {
    update(
      field,
      form[field].filter((_, i) => i !== index)
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const cleaned: DevelopmentFormInput = {
      ...form,
      fullDescription: form.fullDescription.filter((p) => p.trim() !== ""),
      features: form.features.filter((f) => f.trim() !== ""),
    };

    startTransition(async () => {
      try {
        if (existing) {
          await updateDevelopment(existing.id, cleaned);
        } else {
          await createDevelopment(cleaned);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-8">
      {error && (
        <p className="rounded-sm bg-red-50 px-3.5 py-2.5 text-[13px] text-red-700">{error}</p>
      )}

      {/* Basic info */}
      <section className="rounded-sm border border-line bg-white p-6">
        <h2 className="mb-5 font-serif text-lg font-semibold">Basic Info</h2>
        <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label>Name</Label>
            <Input value={form.name} onChange={(e) => update("name", e.target.value)} required />
          </div>
          <div>
            <Label>Slug (URL — lowercase, hyphens only)</Label>
            <Input value={form.slug} onChange={(e) => update("slug", e.target.value)} required />
          </div>
        </div>
        <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label>Location</Label>
            <Input value={form.location} onChange={(e) => update("location", e.target.value)} required />
          </div>
          <div>
            <Label>LGA</Label>
            <Input value={form.lga} onChange={(e) => update("lga", e.target.value)} required />
          </div>
        </div>
        <div>
          <Label>Short Description (shown on homepage card)</Label>
          <Textarea value={form.description} onChange={(e) => update("description", e.target.value)} required />
        </div>
      </section>

      {/* Pricing & specs */}
      <section className="rounded-sm border border-line bg-white p-6">
        <h2 className="mb-5 font-serif text-lg font-semibold">Pricing &amp; Specs</h2>
        <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label>Price From (e.g. ₦3,000,000)</Label>
            <Input value={form.priceFrom} onChange={(e) => update("priceFrom", e.target.value)} required />
          </div>
          <div>
            <Label>Price Unit (e.g. per plot / per acre)</Label>
            <Input value={form.priceUnit} onChange={(e) => update("priceUnit", e.target.value)} required />
          </div>
        </div>
        <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label>Plot Size (e.g. 500 sqm)</Label>
            <Input value={form.plotSize} onChange={(e) => update("plotSize", e.target.value)} required />
          </div>
          <div>
            <Label>Document Type</Label>
            <Input value={form.document} onChange={(e) => update("document", e.target.value)} required />
          </div>
        </div>
        <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label>Plots Available</Label>
            <Input
              type="number"
              value={form.plotsAvailable}
              onChange={(e) => update("plotsAvailable", Number(e.target.value))}
              required
            />
          </div>
          <div>
            <Label>Plots Total</Label>
            <Input
              type="number"
              value={form.plotsTotal}
              onChange={(e) => update("plotsTotal", Number(e.target.value))}
              required
            />
          </div>
        </div>
        <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label>Zoning</Label>
            <Input value={form.zoning} onChange={(e) => update("zoning", e.target.value)} required />
          </div>
          <div>
            <Label>Listed Date</Label>
            <Input value={form.listedDate} onChange={(e) => update("listedDate", e.target.value)} required />
          </div>
        </div>
        <div>
          <Label>Title Status (full label)</Label>
          <Input value={form.titleStatus} onChange={(e) => update("titleStatus", e.target.value)} required />
        </div>
      </section>

      {/* Coordinates */}
      <section className="rounded-sm border border-line bg-white p-6">
        <h2 className="mb-5 font-serif text-lg font-semibold">Coordinates</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Latitude</Label>
            <Input
              type="number"
              step="any"
              value={form.coordinates.lat}
              onChange={(e) => update("coordinates", { ...form.coordinates, lat: Number(e.target.value) })}
              required
            />
          </div>
          <div>
            <Label>Longitude</Label>
            <Input
              type="number"
              step="any"
              value={form.coordinates.lng}
              onChange={(e) => update("coordinates", { ...form.coordinates, lng: Number(e.target.value) })}
              required
            />
          </div>
        </div>
      </section>

      {/* Brochure */}
      <section className="rounded-sm border border-line bg-white p-6">
        <h2 className="mb-5 font-serif text-lg font-semibold">Brochure (PDF)</h2>
        {form.brochure ? (
          <div className="mb-4 flex items-center justify-between rounded-sm border border-line bg-parchment-warm px-4 py-3">
            <a
              href={form.brochure}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[13.5px] font-medium text-indigo hover:underline"
            >
              <FileText className="h-4 w-4" />
              View current brochure
            </a>
            <button
              type="button"
              onClick={() => update("brochure", null)}
              className="text-ink/40 hover:text-red-600"
              aria-label="Remove brochure"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <p className="mb-4 text-[13px] text-ink/45">No brochure uploaded yet.</p>
        )}

        <label className="flex w-fit cursor-pointer items-center gap-2 rounded-sm border border-line px-4 py-2.5 text-[13px] font-medium hover:bg-parchment-warm">
          <Upload className="h-4 w-4" />
          {uploading ? "Uploading..." : form.brochure ? "Replace Brochure" : "Upload Brochure PDF"}
          <input type="file" accept="application/pdf" className="hidden" onChange={handleBrochureUpload} />
        </label>
      </section>

      {/* Full description */}
      <section className="rounded-sm border border-line bg-white p-6">
        <h2 className="mb-5 font-serif text-lg font-semibold">Full Description (paragraphs)</h2>
        {form.fullDescription.map((p, i) => (
          <div key={i} className="mb-3 flex gap-2">
            <Textarea
              value={p}
              onChange={(e) => updateListField("fullDescription", i, e.target.value)}
              className="flex-1"
            />
            <button
              type="button"
              onClick={() => removeListItem("fullDescription", i)}
              className="text-ink/40 hover:text-red-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addListItem("fullDescription")}
          className="flex items-center gap-1.5 text-[13px] font-medium text-indigo"
        >
          <Plus className="h-3.5 w-3.5" /> Add paragraph
        </button>
      </section>

      {/* Features */}
      <section className="rounded-sm border border-line bg-white p-6">
        <h2 className="mb-5 font-serif text-lg font-semibold">Key Features</h2>
        {form.features.map((f, i) => (
          <div key={i} className="mb-2.5 flex gap-2">
            <Input value={f} onChange={(e) => updateListField("features", i, e.target.value)} className="flex-1" />
            <button
              type="button"
              onClick={() => removeListItem("features", i)}
              className="text-ink/40 hover:text-red-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addListItem("features")}
          className="flex items-center gap-1.5 text-[13px] font-medium text-indigo"
        >
          <Plus className="h-3.5 w-3.5" /> Add feature
        </button>
      </section>

      {/* Cover image */}
      <section className="rounded-sm border border-line bg-white p-6">
        <h2 className="mb-5 font-serif text-lg font-semibold">Cover Photo (homepage card)</h2>
        {form.image && (
          <img src={form.image} alt="Cover" className="mb-3 h-40 w-full rounded-sm object-cover" />
        )}
        <label className="flex w-fit cursor-pointer items-center gap-2 rounded-sm border border-line px-4 py-2.5 text-[13px] font-medium hover:bg-parchment-warm">
          <Upload className="h-4 w-4" />
          {uploading ? "Uploading..." : "Upload Cover Photo"}
          <input type="file" accept="image/*" className="hidden" onChange={handleCoverUpload} />
        </label>
      </section>

      {/* Gallery media */}
      <section className="rounded-sm border border-line bg-white p-6">
        <h2 className="mb-5 font-serif text-lg font-semibold">Gallery (images + videos)</h2>
        <div className="mb-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
          {form.media.map((item, i) => (
            <div key={i} className="relative aspect-square overflow-hidden rounded-sm border border-line">
              {item.type === "image" ? (
                <img src={item.src} alt="" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-ink text-[11px] text-white/70">
                  Video: {item.videoId}
                </div>
              )}
              <button
                type="button"
                onClick={() => removeMedia(i)}
                className="absolute right-1 top-1 rounded-full bg-ink/80 p-1 text-white"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          <label className="flex cursor-pointer items-center gap-2 rounded-sm border border-line px-4 py-2.5 text-[13px] font-medium hover:bg-parchment-warm">
            <Upload className="h-4 w-4" />
            {uploading ? "Uploading..." : "Add Photo"}
            <input type="file" accept="image/*" className="hidden" onChange={handleGalleryUpload} />
          </label>
          <button
            type="button"
            onClick={addVideo}
            className="flex items-center gap-2 rounded-sm border border-line px-4 py-2.5 text-[13px] font-medium hover:bg-parchment-warm"
          >
            <Plus className="h-4 w-4" /> Add YouTube Video
          </button>
        </div>
        <div className="mt-4 flex items-center gap-2.5">
          <input
            type="checkbox"
            id="placeholder"
            checked={form.isPlaceholderMedia}
            onChange={(e) => update("isPlaceholderMedia", e.target.checked)}
          />
          <Label htmlFor="placeholder" className="mb-0">
            Media is placeholder (shows a &quot;real photos coming soon&quot; badge on the site)
          </Label>
        </div>
      </section>

      {/* Publish */}
      <section className="rounded-sm border border-line bg-white p-6">
        <div className="flex items-center gap-2.5">
          <input
            type="checkbox"
            id="published"
            checked={form.published}
            onChange={(e) => update("published", e.target.checked)}
          />
          <Label htmlFor="published" className="mb-0">
            Published (visible on the live site)
          </Label>
        </div>
      </section>

      <div className="flex gap-3">
        <Button type="submit" disabled={pending || uploading}>
          {pending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Saving...
            </>
          ) : existing ? (
            "Save Changes"
          ) : (
            "Create Listing"
          )}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/listings")}>
          Cancel
        </Button>
      </div>
    </form>
  );
}