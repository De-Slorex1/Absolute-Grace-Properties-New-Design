import { createClient } from "@/lib/supabase/server";
import type { Development, MediaItem } from "@/lib/types";

type DevelopmentRow = {
  id: string;
  slug: string;
  sort_order: number;
  location: string;
  lga: string;
  name: string;
  description: string;
  full_description: string[];
  plot_size: string;
  price_unit: string;
  document: string;
  price_from: string;
  image: string;
  media: MediaItem[];
  coordinates: { lat: number; lng: number };
  plots_available: number;
  plots_total: number;
  title_status: string;
  zoning: string;
  listed_date: string;
  features: string[];
  is_placeholder_media: boolean;
  published: boolean;
  brochure: string | null;
};

function mapRow(row: DevelopmentRow): Development {
  return {
    id: row.id,
    slug: row.slug,
    sortOrder: row.sort_order,
    location: row.location,
    lga: row.lga,
    name: row.name,
    description: row.description,
    fullDescription: row.full_description,
    plotSize: row.plot_size,
    priceUnit: row.price_unit,
    document: row.document,
    priceFrom: row.price_from,
    image: row.image,
    media: row.media,
    coordinates: row.coordinates,
    plotsAvailable: row.plots_available,
    plotsTotal: row.plots_total,
    titleStatus: row.title_status,
    zoning: row.zoning,
    listedDate: row.listed_date,
    features: row.features,
    isPlaceholderMedia: row.is_placeholder_media,
    published: row.published,
    brochure: row.brochure,
  };
}

// Public-facing: published developments only, for the live site.
export async function getPublishedDevelopments(): Promise<Development[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("developments")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Failed to fetch developments:", error);
    return [];
  }
  return (data as DevelopmentRow[]).map(mapRow);
}

export async function getPublishedDevelopmentBySlug(slug: string): Promise<Development | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("developments")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error || !data) return null;
  return mapRow(data as DevelopmentRow);
}

// Admin-facing: everything, including unpublished drafts.
export async function getAllDevelopmentsAdmin(): Promise<Development[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("developments")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Failed to fetch developments (admin):", error);
    return [];
  }
  return (data as DevelopmentRow[]).map(mapRow);
}

export async function getDevelopmentByIdAdmin(id: string): Promise<Development | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("developments").select("*").eq("id", id).single();

  if (error || !data) return null;
  return mapRow(data as DevelopmentRow);
}