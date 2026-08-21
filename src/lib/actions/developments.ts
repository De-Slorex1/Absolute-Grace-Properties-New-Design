"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { MediaItem } from "@/lib/types";

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated.");
  return user;
}

export type DevelopmentFormInput = {
  slug: string;
  sortOrder: number;
  location: string;
  lga: string;
  name: string;
  description: string;
  fullDescription: string[];
  plotSize: string;
  priceUnit: string;
  document: string;
  priceFrom: string;
  image: string;
  media: MediaItem[];
  coordinates: { lat: number; lng: number };
  plotsAvailable: number;
  plotsTotal: number;
  titleStatus: string;
  zoning: string;
  listedDate: string;
  features: string[];
  isPlaceholderMedia: boolean;
  published: boolean;
  brochure: string | null;
};

function toRow(input: DevelopmentFormInput) {
  return {
    slug: input.slug,
    sort_order: input.sortOrder,
    location: input.location,
    lga: input.lga,
    name: input.name,
    description: input.description,
    full_description: input.fullDescription,
    plot_size: input.plotSize,
    price_unit: input.priceUnit,
    document: input.document,
    price_from: input.priceFrom,
    image: input.image,
    media: input.media,
    coordinates: input.coordinates,
    plots_available: input.plotsAvailable,
    plots_total: input.plotsTotal,
    title_status: input.titleStatus,
    zoning: input.zoning,
    listed_date: input.listedDate,
    features: input.features,
    is_placeholder_media: input.isPlaceholderMedia,
    published: input.published,
    brochure: input.brochure,
    updated_at: new Date().toISOString(),
  };
}

export async function createDevelopment(input: DevelopmentFormInput) {
  await requireAdmin();
  const admin = createAdminClient();

  const { error } = await admin.from("developments").insert(toRow(input));
  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/admin/listings");
  redirect("/admin/listings");
}

export async function updateDevelopment(id: string, input: DevelopmentFormInput) {
  await requireAdmin();
  const admin = createAdminClient();

  const { error } = await admin.from("developments").update(toRow(input)).eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath(`/developments/${input.slug}`);
  revalidatePath("/admin/listings");
  redirect("/admin/listings");
}

export async function deleteDevelopment(id: string, slug: string) {
  await requireAdmin();
  const admin = createAdminClient();

  const { error } = await admin.from("developments").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath(`/developments/${slug}`);
  revalidatePath("/admin/listings");
}

export async function uploadDevelopmentImage(formData: FormData): Promise<{ url?: string; error?: string }> {
  await requireAdmin();
  const admin = createAdminClient();

  const file = formData.get("file") as File | null;
  if (!file) return { error: "No file provided." };

  const ext = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${ext}`;

  const { error: uploadError } = await admin.storage
    .from("development-media")
    .upload(fileName, file, { cacheControl: "3600", upsert: false });

  if (uploadError) return { error: uploadError.message };

  const { data } = admin.storage.from("development-media").getPublicUrl(fileName);
  return { url: data.publicUrl };
}

export async function uploadDevelopmentBrochure(formData: FormData): Promise<{ url?: string; error?: string }> {
  await requireAdmin();
  const admin = createAdminClient();

  const file = formData.get("file") as File | null;
  if (!file) return { error: "No file provided." };

  if (file.type !== "application/pdf") {
    return { error: "Please upload a PDF file." };
  }

  const maxSizeBytes = 15 * 1024 * 1024; // 15MB
  if (file.size > maxSizeBytes) {
    return { error: "File is too large — please keep brochures under 15MB." };
  }

  const fileName = `brochures/${crypto.randomUUID()}.pdf`;

  const { error: uploadError } = await admin.storage
    .from("development-media")
    .upload(fileName, file, { cacheControl: "3600", upsert: false, contentType: "application/pdf" });

  if (uploadError) return { error: uploadError.message };

  const { data } = admin.storage.from("development-media").getPublicUrl(fileName);
  return { url: data.publicUrl };
}