export type MediaItem =
  | { type: "image"; src: string }
  | { type: "video"; videoId: string; vertical?: boolean };

export type Development = {
  id: string;
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