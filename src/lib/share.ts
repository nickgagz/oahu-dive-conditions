import {
  VisibilityCategory,
  SurgeCategory,
  EntryExitCategory,
  CurrentCategory,
  SurfaceConditions,
  WindCategory,
  TideState,
} from "./types";

// ─── Input type ──────────────────────────────────────────────────────────────

export interface ShareData {
  siteName: string;
  date: string;   // YYYY-MM-DD
  time: string;   // HH:MM
  visibility: VisibilityCategory;
  surge: SurgeCategory;
  entryExit: EntryExitCategory;
  current: CurrentCategory;
  surface: SurfaceConditions;
  notes?: string;
  forecast?: {
    swellHeight: number;
    swellDirection: string;
    swellPeriod: number;
    windSpeed: number;
    windCategory: WindCategory;
    tideState: TideState;
  };
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function timeOfDay(time: string): "morning" | "midday" | "afternoon" | "evening" {
  const h = parseInt(time.split(":")[0], 10);
  if (h < 9) return "morning";
  if (h < 12) return "midday";
  if (h < 16) return "afternoon";
  return "evening";
}

function casualDay(dateStr: string): string {
  const d = new Date(dateStr + "T12:00:00");
  const today = new Date();
  today.setHours(12, 0, 0, 0);
  const diff = Math.round((today.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));

  if (diff === 0) return pick(["today", "this morning", "this afternoon", "earlier today"]);
  if (diff === 1) return "yesterday";
  if (diff < 7) {
    const dayName = d.toLocaleDateString("en-US", { weekday: "long" });
    return pick([dayName, `on ${dayName}`, `last ${dayName}`]);
  }
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

// ─── Casual condition phrases ────────────────────────────────────────────────
// Each category maps to a pool of casual descriptions.
// We intentionally provide many options so posts don't repeat.

const VIS_CASUAL: Record<VisibilityCategory, string[]> = {
  "excellent (80+ ft)": [
    "vis was absolutely unreal",
    "crystal clear water",
    "could see for days down there",
    "80+ feet of visibility 🤯",
    "insane visibility",
    "water was gin clear",
    "unbelievable clarity",
  ],
  "good (40-80 ft)": [
    "really nice visibility",
    "great vis",
    "visibility was solid",
    "water was clear",
    "could see plenty",
    "good vis out there",
  ],
  "moderate (20-40 ft)": [
    "visibility was decent",
    "not the clearest but still good",
    "moderate vis",
    "could see okay",
    "vis was alright",
  ],
  "poor (< 20 ft)": [
    "vis was pretty limited",
    "murky conditions",
    "couldn't see much out there",
    "low visibility day",
    "had to stay close",
  ],
};

const SURGE_CASUAL: Record<SurgeCategory, string[]> = {
  none: [
    "zero surge",
    "no surge at all",
    "super calm underwater",
    "no push whatsoever",
  ],
  light: [
    "just a light surge",
    "barely any surge",
    "little bit of back and forth",
    "gentle movement",
  ],
  moderate: [
    "some surge going on",
    "moderate surge",
    "a decent amount of push",
    "you could feel it moving you around",
  ],
  heavy: [
    "heavy surge today",
    "was getting tossed around down there",
    "serious surge",
    "got pushed around pretty good",
  ],
};

const ENTRY_CASUAL: Record<EntryExitCategory, string[]> = {
  easy: [
    "walked right in",
    "easy entry",
    "entry was a breeze",
    "smooth getting in and out",
  ],
  manageable: [
    "entry took some care",
    "getting in was manageable",
    "had to time it a bit",
    "entry wasn't bad",
  ],
  challenging: [
    "entry was sketchy",
    "getting in was a workout",
    "had to really commit on the entry",
    "rough getting in",
  ],
};

const CURRENT_CASUAL: Record<CurrentCategory, string[]> = {
  none: ["no current to speak of", "totally still", "no current"],
  mild: ["mild current", "light drift", "just a gentle pull"],
  moderate: ["decent current", "moderate current", "some drift to deal with"],
  strong: ["strong current", "had to fight the current", "ripping current"],
};

const SURFACE_CASUAL: Record<SurfaceConditions, string[]> = {
  flat: [
    "surface was flat as glass",
    "glassy conditions",
    "flat water",
    "lake-like surface",
  ],
  "light chop": [
    "a bit of chop on top",
    "slight chop on the surface",
    "surface had some texture",
  ],
  rough: [
    "rough on the surface",
    "choppy conditions up top",
    "surface was messy",
  ],
};

const SWELL_CASUAL: Record<string, string[]> = {
  small: ["tiny swell", "barely any swell", "small surf"],
  medium: ["moderate swell", "some swell running", "decent size swell"],
  big: ["big swell", "large surf", "heavy swell hitting"],
};

const WIND_CASUAL: Record<WindCategory, string[]> = {
  offshore: ["offshore breeze", "wind was pushing out", "offshores cleaning things up"],
  onshore: ["onshore wind", "wind blowing in", "onshores were up"],
  cross: ["crosswind", "wind was sideways", "cross-shore breeze"],
};

// ─── Time-of-day openers ────────────────────────────────────────────────────

const TOD_OPENERS: Record<ReturnType<typeof timeOfDay>, string[]> = {
  morning: [
    "Early morning dive",
    "Got in the water early",
    "Dawn patrol",
    "Started the day right",
    "Morning session",
  ],
  midday: [
    "Late morning dive",
    "Got out for a midday dive",
    "Mid-morning session",
  ],
  afternoon: [
    "Afternoon dive",
    "Post-lunch dive",
    "Got out this afternoon",
    "Afternoon session",
  ],
  evening: [
    "Sunset dive",
    "Evening dive",
    "Late afternoon session",
    "Golden hour dive",
  ],
};

// ─── Post text generators ───────────────────────────────────────────────────
// We have multiple strategies to produce very different post shapes.

function conditionsOneliner(data: ShareData): string {
  // Pick 2-3 standout conditions to mention casually, not all of them
  const parts: string[] = [];

  // Always mention vis
  parts.push(pick(VIS_CASUAL[data.visibility]));

  // Randomly include 1-2 more
  const extras = [
    pick(SURGE_CASUAL[data.surge]),
    pick(ENTRY_CASUAL[data.entryExit]),
    pick(SURFACE_CASUAL[data.surface]),
    pick(CURRENT_CASUAL[data.current]),
  ];
  // Shuffle and take 1-2
  const shuffled = extras.sort(() => Math.random() - 0.5);
  parts.push(shuffled[0]);
  if (Math.random() > 0.4) parts.push(shuffled[1]);

  return parts.join(", ") + ".";
}

function swellOneliner(data: ShareData): string {
  if (!data.forecast) return "";
  const h = data.forecast.swellHeight;
  const size = h < 2 ? "small" : h < 4 ? "medium" : "big";
  const swellPhrase = pick(SWELL_CASUAL[size]);
  const windPhrase = pick(WIND_CASUAL[data.forecast.windCategory]);
  return pick([
    `${swellPhrase} with ${windPhrase}`,
    `${h} ft ${data.forecast.swellDirection} swell, ${windPhrase}`,
    `${swellPhrase} (${h} ft @ ${data.forecast.swellPeriod}s)`,
  ]);
}


// ─── Main generator ─────────────────────────────────────────────────────────

type PostStrategy = (data: ShareData) => string;

/**
 * Strategy: Notes-first (when user provided notes)
 * The notes ARE the post. Conditions are a casual footer.
 */
const notesFirst: PostStrategy = (data) => {
  const day = casualDay(data.date);
  const tod = timeOfDay(data.time);
  const todPhrase = pick(TOD_OPENERS[tod]);

  const lines: string[] = [];

  // User's notes are the star
  lines.push(data.notes!.trim());
  lines.push("");

  // Casual conditions mention
  const condLine = pick([
    `${todPhrase} at ${data.siteName} ${day} — ${conditionsOneliner(data)}`,
    `${data.siteName} ${day}. ${conditionsOneliner(data)}`,
    `${todPhrase} out at ${data.siteName}. ${conditionsOneliner(data)}`,
  ]);
  lines.push(condLine);

  // Maybe add swell detail
  const swell = swellOneliner(data);
  if (swell && Math.random() > 0.5) {
    lines.push(swell);
  }

  return lines.join("\n");
};

/**
 * Strategy: Conditions-storytelling (when no notes)
 * Build a mini story from the conditions.
 */
const conditionsStory: PostStrategy = (data) => {
  const day = casualDay(data.date);
  const tod = timeOfDay(data.time);
  const todPhrase = pick(TOD_OPENERS[tod]);

  const lines: string[] = [];

  // Opener
  lines.push(pick([
    `${todPhrase} at ${data.siteName} ${day}.`,
    `Got out to ${data.siteName} ${day} for a ${pick(["dive", "shore dive", "session"])}.`,
    `${data.siteName} ${day} 🤿`,
    `${todPhrase} — ${data.siteName}.`,
  ]));

  // Conditions woven naturally
  lines.push(conditionsOneliner(data));

  // Swell/wind detail
  const swell = swellOneliner(data);
  if (swell) lines.push(swell);

  return lines.join("\n");
};

/**
 * Strategy: Quick & punchy (any case)
 * Short, social-media-native format.
 */
const quickPunchy: PostStrategy = (data) => {
  const lines: string[] = [];

  if (data.notes) {
    lines.push(data.notes.trim());
    lines.push("");
  }

  const visCasual = pick(VIS_CASUAL[data.visibility]);
  const surfaceCasual = pick(SURFACE_CASUAL[data.surface]);

  lines.push(pick([
    `📍 ${data.siteName}`,
    `🤿 ${data.siteName}`,
    `🌊 ${data.siteName}`,
  ]));
  lines.push(`${visCasual}, ${surfaceCasual}.`);

  if (data.forecast) {
    lines.push(`${data.forecast.swellHeight} ft swell @ ${data.forecast.swellPeriod}s`);
  }

  return lines.join("\n");
};

/**
 * Strategy: Notes-with-emoji (when notes provided)
 * Casual, emoji-accented style.
 */
const notesEmoji: PostStrategy = (data) => {
  const lines: string[] = [];

  lines.push(data.notes!.trim());
  lines.push("");

  const emoji = pick(["🤿", "🐠", "🐢", "🐙", "🦈", "🌊", "🏝️"]);
  lines.push(`${emoji} ${data.siteName}`);

  // Brief conditions
  const visCasual = pick(VIS_CASUAL[data.visibility]);
  lines.push(visCasual);

  if (data.forecast) {
    const h = data.forecast.swellHeight;
    lines.push(`${h} ft ${data.forecast.swellDirection} swell • ${data.forecast.tideState} tide`);
  }

  return lines.join("\n");
};

/**
 * Strategy: Journal-style (no notes)
 * Reads like a brief log entry.
 */
const journalStyle: PostStrategy = (data) => {
  const d = new Date(data.date + "T12:00:00");
  const dateStr = d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
  const tod = timeOfDay(data.time);

  const lines: string[] = [];
  lines.push(`${dateStr} — ${pick(TOD_OPENERS[tod]).toLowerCase()} at ${data.siteName}.`);
  lines.push("");
  lines.push(pick(VIS_CASUAL[data.visibility]) + ".");
  lines.push(pick([
    `${pick(ENTRY_CASUAL[data.entryExit])}. ${pick(SURGE_CASUAL[data.surge])}.`,
    `${pick(SURFACE_CASUAL[data.surface])}. ${pick(CURRENT_CASUAL[data.current])}.`,
  ]));

  if (data.forecast) {
    lines.push(`(${data.forecast.swellHeight} ft @ ${data.forecast.swellPeriod}s, ${data.forecast.windCategory} wind)`);
  }

  return lines.join("\n");
};

// ─── Public API ──────────────────────────────────────────────────────────────

export function generatePostText(data: ShareData): string {
  const hasNotes = !!data.notes && data.notes.trim().length > 0;

  // Pick a strategy based on whether notes exist
  const withNotes: PostStrategy[] = [notesFirst, quickPunchy, notesEmoji];
  const withoutNotes: PostStrategy[] = [conditionsStory, quickPunchy, journalStyle];

  const strategies = hasNotes ? withNotes : withoutNotes;
  const strategy = pick(strategies);

  return strategy(data).trim();
}

/**
 * Regenerate with a guaranteed-different result.
 * Tries up to 5 times to produce something different from `previous`.
 */
export function regeneratePostText(data: ShareData, previous: string): string {
  for (let i = 0; i < 5; i++) {
    const text = generatePostText(data);
    if (text !== previous) return text;
  }
  return generatePostText(data);
}

