import { DiveSite } from "./types";

// ─── All supported dive sites ────────────────────────────────────────────────

export const DIVE_SITES: DiveSite[] = [
  {
    id: "electric-beach",
    name: "Electric Beach (Kahe)",
    region: "West Oahu",
    exposure_notes:
      "West-facing shore entry over rocky shelf. Exposed to south and west swells. Typically calmer in summer months. Power plant warm-water outflow attracts marine life year-round.",
    lat: 21.354,
    lng: -158.131,
    shore_facing_deg: 270, // faces west
  },
  {
    id: "makaha-caverns",
    name: "Makaha Caverns",
    region: "West Oahu",
    exposure_notes:
      "West-facing entry near Mākaha Beach. Exposed to south and west swells. Underwater lava tubes and caverns. Best on calm days with low swell.",
    lat: 21.478,
    lng: -158.222,
    shore_facing_deg: 270, // faces west
  },
  {
    id: "sharks-cove",
    name: "Shark's Cove",
    region: "North Shore",
    exposure_notes:
      "North-facing rocky cove entry. Highly exposed to north swells — diveable primarily in summer (May–September). Shallow tidepools and deeper lava formations.",
    lat: 21.652,
    lng: -158.063,
    shore_facing_deg: 0, // faces north
  },
  {
    id: "three-tables",
    name: "Three Tables",
    region: "North Shore",
    exposure_notes:
      "North-facing sandy entry with offshore rock formations. Similar seasonal exposure to Shark's Cove. Best in calm summer conditions with flat north shore surf.",
    lat: 21.654,
    lng: -158.065,
    shore_facing_deg: 0, // faces north
  },
  {
    id: "china-walls",
    name: "China Walls",
    region: "East Oahu",
    exposure_notes:
      "Southeast-facing rocky ledge entry at Portlock. Exposed to south and east swells. Strong currents common. Popular for cliff jumping and shore diving.",
    lat: 21.262,
    lng: -157.705,
    shore_facing_deg: 150, // faces south-southeast
  },
  {
    id: "lanai-lookout",
    name: "Lanai Lookout",
    region: "East Oahu",
    exposure_notes:
      "Southeast-facing rocky entry along Kalanianaʻole Highway. Exposed to east and south swells. Strong currents and surge possible. Best on calm days.",
    lat: 21.272,
    lng: -157.678,
    shore_facing_deg: 135, // faces southeast
  },
  {
    id: "point-panic",
    name: "Point Panic",
    region: "South Oahu",
    exposure_notes:
      "South-facing entry near Kewalo Basin. Exposed to south swells. Known for clear water and marine life near the seawall. Shore entry from rocks.",
    lat: 21.286,
    lng: -157.860,
    shore_facing_deg: 180, // faces south
  },
  {
    id: "magic-island",
    name: "Magic Island",
    region: "South Oahu",
    exposure_notes:
      "South/southwest-facing sandy entry at Ala Moana Beach Park. Protected lagoon area with outer reef. Generally calm conditions, good for beginners.",
    lat: 21.282,
    lng: -157.847,
    shore_facing_deg: 210, // faces south-southwest
  },
];

// ─── Lookup helpers ──────────────────────────────────────────────────────────

export function getSiteById(id: string): DiveSite | undefined {
  return DIVE_SITES.find((s) => s.id === id);
}

export function getDefaultSite(): DiveSite {
  return DIVE_SITES[0]; // Electric Beach
}
