export const site = {
  name: "Absolute Grace Properties",
  phone: "+234 702 500 8100",
  whatsapp: "2347025008100",
  email: "info@absolutegraceproperties.com",
  address: "No 24, Adeyi Avenue, Old Bodija, Ibadan, Oyo State",
  founded: 2014,
};

export const waLink = (message?: string) =>
  `https://wa.me/${site.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

export type MediaItem =
  | { type: "image"; src: string }
  | { type: "video"; videoId: string; vertical?: boolean };

export type Development = {
  slug: string;
  index: string;
  location: string;
  lga: string;
  name: string;
  description: string;
  fullDescription: string[];
  plotSize: string;
  priceUnit: string; // e.g. "per plot" or "per acre"
  document: string;
  priceFrom: string;
  image: string; // cover photo used on homepage cards
  media: MediaItem[]; // mixed images + videos for the detail page gallery
  coordinates: {
                  lat: number;
                  lng: number;
              };
  plotsAvailable: number;
  plotsTotal: number;
  titleStatus: string;
  zoning: string;
  listedDate: string;
  features: string[];
  isPlaceholderMedia?: boolean;
};

export const developments: Development[] = [
  {
    slug: "luxury-county-estate-ido-eruwa",
    index: "01 / 03",
    location: "Ido–Eruwa Express Road, Ibadan",
    lga: "Ibarapa East LGA",
    name: "Luxury County Estate at Ido Eruwa",
    description:
      "A gated residential estate five to seven minutes' walk from the main Eruwa Express Road — surveyed, beaconed, and laid out for modern family living.",
    fullDescription: [
      "Luxury County Estate sits just off the main Eruwa Express Road, a five to seven minute walk from the tarred road — close enough for easy access, far enough to stay quiet and undisturbed.",
      "The estate has been laid out with residential development in mind: flat, flood-free terrain, an internal road network, and boundary beacons already in place across every plot. Each plot comes with a Certificate of Occupancy, verified against Oyo State land registry records.",
      "This development suits families looking to build a home in a planned, secure estate, as well as investors buying ahead of the area's continued growth along the Eruwa corridor.",
    ],
    plotSize: "500 sqm",
    priceUnit: "per plot",
    document: "C of O • Deed of Assignment • Registered Survey",
    priceFrom: "₦3,000,000",
    image:
      "/ido.jpg",
    media: [
      { type: "video", videoId: "H_0mb3Ihr5w" },
      { type: "video", videoId: "Sm2c-b6voEw" },
    ],
    coordinates: {
      lat: 7.5068,
      lng: 3.7119
    },
    plotsAvailable: 60,
    plotsTotal: 240,
    titleStatus: "C of O • Deed of Assignment • Registered Survey",
    zoning: "Residential",
    listedDate: "March 2025",
    features: [
      "Gated, planned residential estate",
      "Flat, flood-free terrain",
      "Internal access roads",
      "Boundary beacons in place",
      "5–7 min walk to Express Road",
      "Title verified against registry",
    ],
  },
  {
    slug: "bloom-estate-olorunda-akobo",
    index: "02 / 03",
    location: "Olorunda, Akobo, Ibadan",
    lga: "Lagelu LGA",
    name: "Bloom Estate Olorunda Akobo",
    description:
      "Positioned within Lagelu Local Government's fast-developing Akobo axis — one of Ibadan's most sought-after residential corridors.",
    fullDescription: [
      "Bloom Estate sits within Lagelu Local Government's Olorunda–Akobo axis, one of Ibadan's most established and sought-after residential corridors.",
      "This is our most developed site: roads are cut, plots are beaconed, and several neighbouring plots are already under construction. Each 500 sqm plot comes with a Certificate of Occupancy, verified before listing.",
      "Given the axis's maturity, Bloom Estate carries a higher entry price than our other developments, but with correspondingly lower risk and a shorter runway to build-ready.",
    ],
    plotSize: "500 sqm",
    priceUnit: "per plot",
    document: "C of O • Deed of Assignment • Registered Survey",
    priceFrom: "₦5,000,000",
    image:
      "/bloom2.jpg" ,
    media: [
      { type: "video", videoId: "-dOAJ9y2HdM" },
      { type: "video", videoId: "bPjXijMHdAs", vertical: true },
      { type: "video", videoId: "tIvP96kYQno", vertical: true },
    ],
    coordinates: {
      lat: 7.4402083,
      lng: 3.9524154
    },
    plotsAvailable: 30,
    plotsTotal: 50,
    titleStatus: "C of O • Deed of Assignment • Registered Survey",
    zoning: "Residential",
    listedDate: "March 2025",
    features: [
      "Roads already cut",
      "Neighbouring plots under construction",
      "Established residential axis",
      "Beaconed and survey-marked",
      "10 min to Lagelu Secretariat",
      "Title verified against registry",
    ],
  },
  {
    slug: "cashew-haven-farmland",
    index: "03 / 03",
    location: "Ipapo, Itesiwaju LGA, Oyo State",
    lga: "Itesiwaju LGA",
    name: "Cashew Haven Farmland",
    description:
      "Fertile farmland in Ipapo, Itesiwaju Local Government — sold by the acre, suited to cashew and other tree-crop cultivation.",
    fullDescription: [
      "Cashew Haven Farmland is located in Ipapo, within Itesiwaju Local Government Area — an area known for productive, well-drained soil suited to cashew and other tree-crop farming.",
      "Land is sold by the acre, surveyed ahead of sale, with title verified against local registry records before any transaction is completed.",
      "Photos and video walkthroughs of this site are being finalised and will be added shortly — the image shown is a placeholder representative of the terrain, not the actual plot.",
    ],
    plotSize: "1 acre",
    priceUnit: "per acre",
    document: "C of O",
    priceFrom: "₦2,900,000",
    image:
      "/cashew.png",
    media: [
      { type: "video", videoId: "EkH_iX7hiN0" },
      { type: "video", videoId: "UBosUUsmw9c" },
    ],
    isPlaceholderMedia: false,
    coordinates: {
      lat: 8.1333,
      lng: 3.5167
    },
    plotsAvailable: 480,
    plotsTotal: 600,
    titleStatus: "Registered Survey",
    zoning: "Farmland",
    listedDate: "August 2026",
    features: [
      "Well-drained soil suited to tree crops",
      "Sold by the acre",
      "Surveyed ahead of sale",
      "Title verified against registry",
    ],
  },
];

export const faqs = [
  {
    q: "Is the land surveyed and registered?",
    a: "Yes. Every plot across our developments is surveyed by a licensed surveyor and beaconed before it's listed for sale. Title documents (C of O) are verified against the relevant land registry records before purchase.",
  },
  {
    q: "Are payment plans available?",
    a: "Yes — most plots can be paid for in installments over an agreed period. Terms vary by development; reach out on WhatsApp for a plan specific to the plot you're interested in.",
  },
  {
    q: "What plot sizes are available?",
    a: "Standard residential plots are 500 sqm. Cashew Haven Farmland is sold by the acre. Larger contiguous parcels are available on request.",
  },
  {
    q: "Can I visit before I buy?",
    a: "Always. We encourage every buyer to visit the site in person before committing. Site visits can be scheduled directly via WhatsApp or the contact form.",
  },
  {
    q: "How do I reserve a plot?",
    a: "Message us on WhatsApp or submit an inquiry, and a member of our team will confirm availability, arrange a site visit, and walk you through documentation and payment.",
  },
];
