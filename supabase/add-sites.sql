-- ═══════════════════════════════════════════════════════════════════════════
-- Oahu Dive Conditions — Add New Dive Sites
-- Run this in the Supabase SQL Editor to add the new sites
-- ═══════════════════════════════════════════════════════════════════════════

-- Remove old sites that are no longer in the app
DELETE FROM dive_sites WHERE id IN ('hanauma-bay', 'mahi-shipwreck');

-- Insert new sites (ON CONFLICT skip if they already exist)
INSERT INTO dive_sites (id, name, region, exposure_notes) VALUES
  ('makaha-caverns', 'Makaha Caverns', 'West Oahu',
   'West-facing entry near Mākaha Beach. Exposed to south and west swells. Underwater lava tubes and caverns. Best on calm days with low swell.'),
  ('sharks-cove', 'Shark''s Cove', 'North Shore',
   'North-facing rocky cove entry. Highly exposed to north swells — diveable primarily in summer (May–September). Shallow tidepools and deeper lava formations.'),
  ('three-tables', 'Three Tables', 'North Shore',
   'North-facing sandy entry with offshore rock formations. Similar seasonal exposure to Shark''s Cove. Best in calm summer conditions with flat north shore surf.'),
  ('china-walls', 'China Walls', 'East Oahu',
   'Southeast-facing rocky ledge entry at Portlock. Exposed to south and east swells. Strong currents common. Popular for cliff jumping and shore diving.'),
  ('lanai-lookout', 'Lanai Lookout', 'East Oahu',
   'Southeast-facing rocky entry along Kalanianaʻole Highway. Exposed to east and south swells. Strong currents and surge possible. Best on calm days.'),
  ('point-panic', 'Point Panic', 'South Oahu',
   'South-facing entry near Kewalo Basin. Exposed to south swells. Known for clear water and marine life near the seawall. Shore entry from rocks.'),
  ('magic-island', 'Magic Island', 'South Oahu',
   'South/southwest-facing sandy entry at Ala Moana Beach Park. Protected lagoon area with outer reef. Generally calm conditions, good for beginners.')
ON CONFLICT (id) DO NOTHING;

