-- ═══════════════════════════════════════════════════════════════════════════
-- Oahu Dive Conditions — Expanded Seed Data
-- Adds ~130 reports across all 8 dive sites so the historical matching
-- engine reliably produces output under typical forecast conditions.
--
-- Run AFTER migration.sql and seed.sql (or add-sites.sql).
-- Safe to re-run: all INSERTs use ON CONFLICT DO NOTHING.
-- ═══════════════════════════════════════════════════════════════════════════


-- ═══════════════════════════════════════════════════════════════════════════
-- FORECAST SNAPSHOTS
-- ═══════════════════════════════════════════════════════════════════════════

INSERT INTO forecast_snapshots (id, datetime, swell_height, swell_direction, swell_period, wind_speed, wind_direction, wind_category, tide_state) VALUES

  -- ─── MAKAHA CAVERNS — calm / offshore ───────────────────────────────────
  ('fc-100', '2025-05-20T07:00:00-10:00', 1.0, 'S',  15, 6,  80,  'offshore', 'low'),
  ('fc-101', '2025-06-03T08:00:00-10:00', 1.5, 'SW', 14, 8,  90,  'offshore', 'incoming'),
  ('fc-102', '2025-06-18T06:00:00-10:00', 0.8, 'S',  16, 5,  85,  'offshore', 'high'),
  ('fc-103', '2025-07-06T07:00:00-10:00', 1.2, 'S',  15, 7,  75,  'offshore', 'outgoing'),
  ('fc-104', '2025-07-22T08:00:00-10:00', 1.5, 'SW', 13, 4,  95,  'offshore', 'low'),
  ('fc-105', '2025-08-05T06:00:00-10:00', 0.5, 'S',  17, 3,  90,  'offshore', 'incoming'),

  -- ─── MAKAHA CAVERNS — moderate / onshore ────────────────────────────────
  ('fc-106', '2025-09-10T08:00:00-10:00', 3.0, 'W',  11, 14, 260, 'onshore', 'incoming'),
  ('fc-107', '2025-10-05T07:00:00-10:00', 3.5, 'SW', 12, 16, 270, 'onshore', 'high'),
  ('fc-108', '2025-10-25T08:00:00-10:00', 3.0, 'W',  10, 12, 255, 'onshore', 'outgoing'),
  ('fc-109', '2025-11-10T09:00:00-10:00', 4.0, 'W',  13, 18, 280, 'onshore', 'low'),
  ('fc-110', '2025-12-05T08:00:00-10:00', 3.5, 'NW', 14, 15, 290, 'onshore', 'incoming'),
  ('fc-111', '2026-01-10T07:00:00-10:00', 4.5, 'NW', 15, 20, 300, 'onshore', 'high'),

  -- ─── MAKAHA CAVERNS — transitional / cross ─────────────────────────────
  ('fc-112', '2025-08-20T08:00:00-10:00', 2.0, 'SW', 13, 9,  180, 'cross', 'outgoing'),
  ('fc-113', '2025-09-01T07:00:00-10:00', 2.5, 'S',  12, 10, 170, 'cross', 'low'),
  ('fc-114', '2025-09-20T09:00:00-10:00', 2.0, 'SW', 14, 8,  190, 'cross', 'high'),
  ('fc-115', '2025-10-15T08:00:00-10:00', 2.5, 'W',  11, 11, 0,   'cross', 'incoming'),
  ('fc-116', '2025-11-05T07:00:00-10:00', 2.0, 'S',  13, 7,  165, 'cross', 'outgoing'),
  ('fc-117', '2025-11-25T08:00:00-10:00', 2.5, 'SW', 12, 9,  185, 'cross', 'low'),

  -- ─── SHARK'S COVE — calm summer / offshore ─────────────────────────────
  ('fc-118', '2025-05-25T07:00:00-10:00', 0.5, 'S',  16, 5,  180, 'offshore', 'low'),
  ('fc-119', '2025-06-10T08:00:00-10:00', 0.8, 'SW', 15, 6,  190, 'offshore', 'incoming'),
  ('fc-120', '2025-06-28T06:00:00-10:00', 1.0, 'S',  17, 4,  175, 'offshore', 'high'),
  ('fc-121', '2025-07-08T07:00:00-10:00', 0.5, 'S',  18, 3,  185, 'offshore', 'outgoing'),
  ('fc-122', '2025-07-25T08:00:00-10:00', 1.0, 'SW', 14, 7,  200, 'offshore', 'low'),
  ('fc-123', '2025-08-08T06:00:00-10:00', 0.8, 'S',  16, 5,  180, 'offshore', 'incoming'),

  -- ─── SHARK'S COVE — winter swell / onshore ─────────────────────────────
  ('fc-124', '2025-10-08T08:00:00-10:00', 4.0, 'NW', 14, 16, 350, 'onshore', 'high'),
  ('fc-125', '2025-11-12T07:00:00-10:00', 5.0, 'N',  16, 20, 0,   'onshore', 'incoming'),
  ('fc-126', '2025-12-03T08:00:00-10:00', 4.5, 'NW', 15, 18, 340, 'onshore', 'outgoing'),
  ('fc-127', '2025-12-18T09:00:00-10:00', 5.5, 'N',  17, 22, 10,  'onshore', 'low'),
  ('fc-128', '2026-01-08T08:00:00-10:00', 4.0, 'NW', 14, 15, 355, 'onshore', 'high'),
  ('fc-129', '2026-01-22T07:00:00-10:00', 4.5, 'N',  16, 19, 5,   'onshore', 'incoming'),

  -- ─── SHARK'S COVE — transitional / cross ──────────────────────────────
  ('fc-130', '2025-08-28T08:00:00-10:00', 1.5, 'NE', 13, 8,  90,  'cross', 'outgoing'),
  ('fc-131', '2025-09-08T07:00:00-10:00', 2.0, 'N',  12, 10, 80,  'cross', 'low'),
  ('fc-132', '2025-09-22T09:00:00-10:00', 1.5, 'NW', 14, 7,  270, 'cross', 'high'),
  ('fc-133', '2025-10-18T08:00:00-10:00', 2.0, 'NE', 11, 9,  100, 'cross', 'incoming'),
  ('fc-134', '2025-11-02T07:00:00-10:00', 1.5, 'N',  13, 8,  85,  'cross', 'outgoing'),
  ('fc-135', '2025-11-20T08:00:00-10:00', 2.0, 'NW', 12, 11, 275, 'cross', 'low'),

  -- ─── THREE TABLES — calm summer / offshore ─────────────────────────────
  ('fc-136', '2025-05-28T07:00:00-10:00', 0.5, 'S',  17, 4,  185, 'offshore', 'incoming'),
  ('fc-137', '2025-06-12T08:00:00-10:00', 1.0, 'S',  15, 6,  180, 'offshore', 'low'),
  ('fc-138', '2025-07-02T06:00:00-10:00', 0.8, 'SW', 16, 5,  195, 'offshore', 'high'),
  ('fc-139', '2025-07-15T07:00:00-10:00', 0.5, 'S',  18, 3,  180, 'offshore', 'outgoing'),
  ('fc-140', '2025-07-30T08:00:00-10:00', 1.0, 'S',  14, 7,  190, 'offshore', 'incoming'),
  ('fc-141', '2025-08-12T06:00:00-10:00', 0.8, 'SW', 16, 4,  185, 'offshore', 'low'),

  -- ─── THREE TABLES — winter swell / onshore ─────────────────────────────
  ('fc-142', '2025-10-12T08:00:00-10:00', 3.5, 'NW', 14, 15, 345, 'onshore', 'outgoing'),
  ('fc-143', '2025-11-08T07:00:00-10:00', 4.5, 'N',  16, 19, 5,   'onshore', 'high'),
  ('fc-144', '2025-12-06T08:00:00-10:00', 4.0, 'NW', 15, 17, 350, 'onshore', 'low'),
  ('fc-145', '2025-12-22T09:00:00-10:00', 5.0, 'N',  17, 21, 0,   'onshore', 'incoming'),
  ('fc-146', '2026-01-12T08:00:00-10:00', 3.5, 'NW', 13, 14, 340, 'onshore', 'outgoing'),
  ('fc-147', '2026-01-28T07:00:00-10:00', 4.0, 'N',  15, 18, 10,  'onshore', 'high'),

  -- ─── THREE TABLES — transitional / cross ───────────────────────────────
  ('fc-148', '2025-09-02T08:00:00-10:00', 1.5, 'NE', 12, 9,  90,  'cross', 'low'),
  ('fc-149', '2025-09-18T07:00:00-10:00', 2.0, 'N',  13, 8,  270, 'cross', 'incoming'),
  ('fc-150', '2025-09-28T09:00:00-10:00', 1.5, 'NW', 14, 7,  80,  'cross', 'high'),
  ('fc-151', '2025-10-22T08:00:00-10:00', 2.0, 'NE', 11, 10, 95,  'cross', 'outgoing'),
  ('fc-152', '2025-11-06T07:00:00-10:00', 1.5, 'N',  13, 8,  275, 'cross', 'low'),
  ('fc-153', '2025-12-08T08:00:00-10:00', 2.0, 'NW', 12, 9,  85,  'cross', 'incoming'),

  -- ─── CHINA WALLS — calm / offshore ─────────────────────────────────────
  ('fc-154', '2025-05-22T08:00:00-10:00', 1.0, 'SE', 13, 7,  330, 'offshore', 'incoming'),
  ('fc-155', '2025-06-06T07:00:00-10:00', 1.5, 'S',  14, 6,  320, 'offshore', 'low'),
  ('fc-156', '2025-06-25T06:00:00-10:00', 0.8, 'SE', 15, 5,  315, 'offshore', 'high'),
  ('fc-157', '2025-07-10T08:00:00-10:00', 1.0, 'S',  13, 8,  325, 'offshore', 'outgoing'),
  ('fc-158', '2025-07-26T07:00:00-10:00', 1.5, 'SE', 12, 6,  310, 'offshore', 'incoming'),
  ('fc-159', '2025-08-06T06:00:00-10:00', 0.5, 'S',  16, 4,  330, 'offshore', 'low'),

  -- ─── CHINA WALLS — rough / onshore ─────────────────────────────────────
  ('fc-160', '2025-09-12T08:00:00-10:00', 3.0, 'S',  11, 14, 150, 'onshore', 'high'),
  ('fc-161', '2025-10-02T07:00:00-10:00', 3.5, 'SE', 12, 16, 140, 'onshore', 'outgoing'),
  ('fc-162', '2025-10-28T08:00:00-10:00', 3.0, 'S',  10, 13, 155, 'onshore', 'low'),
  ('fc-163', '2025-11-18T09:00:00-10:00', 4.0, 'SE', 13, 18, 145, 'onshore', 'incoming'),
  ('fc-164', '2025-12-12T08:00:00-10:00', 3.5, 'E',  11, 15, 130, 'onshore', 'high'),
  ('fc-165', '2026-01-18T07:00:00-10:00', 4.0, 'S',  12, 17, 160, 'onshore', 'outgoing'),

  -- ─── CHINA WALLS — transitional / cross ────────────────────────────────
  ('fc-166', '2025-08-22T08:00:00-10:00', 2.0, 'SE', 13, 8,  60,  'cross', 'low'),
  ('fc-167', '2025-09-05T07:00:00-10:00', 2.5, 'S',  12, 10, 50,  'cross', 'incoming'),
  ('fc-168', '2025-09-25T09:00:00-10:00', 2.0, 'SE', 14, 7,  230, 'cross', 'high'),
  ('fc-169', '2025-10-16T08:00:00-10:00', 2.5, 'E',  11, 9,  45,  'cross', 'outgoing'),
  ('fc-170', '2025-11-08T07:00:00-10:00', 2.0, 'S',  13, 8,  240, 'cross', 'low'),
  ('fc-171', '2025-12-02T08:00:00-10:00', 2.5, 'SE', 12, 10, 55,  'cross', 'incoming'),

  -- ─── LANAI LOOKOUT — calm / offshore ───────────────────────────────────
  ('fc-172', '2025-05-24T07:00:00-10:00', 1.0, 'SE', 14, 6,  315, 'offshore', 'low'),
  ('fc-173', '2025-06-08T08:00:00-10:00', 1.5, 'S',  13, 7,  320, 'offshore', 'incoming'),
  ('fc-174', '2025-06-22T06:00:00-10:00', 0.8, 'SE', 15, 5,  310, 'offshore', 'high'),
  ('fc-175', '2025-07-05T07:00:00-10:00', 1.0, 'E',  14, 6,  325, 'offshore', 'outgoing'),
  ('fc-176', '2025-07-28T08:00:00-10:00', 1.5, 'SE', 12, 8,  305, 'offshore', 'low'),
  ('fc-177', '2025-08-10T06:00:00-10:00', 0.5, 'S',  16, 4,  315, 'offshore', 'incoming'),

  -- ─── LANAI LOOKOUT — rough / onshore ───────────────────────────────────
  ('fc-178', '2025-09-14T08:00:00-10:00', 3.0, 'SE', 11, 14, 135, 'onshore', 'high'),
  ('fc-179', '2025-10-06T07:00:00-10:00', 3.5, 'S',  12, 15, 145, 'onshore', 'outgoing'),
  ('fc-180', '2025-10-30T08:00:00-10:00', 3.0, 'E',  10, 13, 125, 'onshore', 'low'),
  ('fc-181', '2025-11-22T09:00:00-10:00', 4.0, 'SE', 13, 18, 140, 'onshore', 'incoming'),
  ('fc-182', '2025-12-15T08:00:00-10:00', 3.5, 'S',  11, 16, 150, 'onshore', 'high'),
  ('fc-183', '2026-01-20T07:00:00-10:00', 4.0, 'E',  12, 17, 130, 'onshore', 'outgoing'),

  -- ─── LANAI LOOKOUT — transitional / cross ──────────────────────────────
  ('fc-184', '2025-08-24T08:00:00-10:00', 2.0, 'SE', 13, 8,  45,  'cross', 'incoming'),
  ('fc-185', '2025-09-06T07:00:00-10:00', 2.5, 'E',  12, 10, 225, 'cross', 'low'),
  ('fc-186', '2025-09-26T09:00:00-10:00', 2.0, 'S',  14, 7,  40,  'cross', 'high'),
  ('fc-187', '2025-10-19T08:00:00-10:00', 2.5, 'SE', 11, 9,  230, 'cross', 'outgoing'),
  ('fc-188', '2025-11-09T07:00:00-10:00', 2.0, 'E',  13, 8,  50,  'cross', 'low'),
  ('fc-189', '2025-12-04T08:00:00-10:00', 2.5, 'S',  12, 10, 220, 'cross', 'incoming'),

  -- ─── POINT PANIC — calm / offshore ────────────────────────────────────
  ('fc-190', '2025-05-26T07:00:00-10:00', 1.0, 'S',  14, 6,  10,  'offshore', 'incoming'),
  ('fc-191', '2025-06-14T08:00:00-10:00', 1.5, 'SW', 13, 7,  0,   'offshore', 'low'),
  ('fc-192', '2025-06-30T06:00:00-10:00', 0.8, 'S',  15, 5,  15,  'offshore', 'high'),
  ('fc-193', '2025-07-14T07:00:00-10:00', 1.0, 'SE', 14, 6,  5,   'offshore', 'outgoing'),
  ('fc-194', '2025-08-01T08:00:00-10:00', 1.5, 'S',  12, 8,  20,  'offshore', 'low'),
  ('fc-195', '2025-08-18T06:00:00-10:00', 0.5, 'SW', 16, 3,  10,  'offshore', 'incoming'),

  -- ─── POINT PANIC — rough / onshore ────────────────────────────────────
  ('fc-196', '2025-09-16T08:00:00-10:00', 3.0, 'S',  11, 14, 180, 'onshore', 'high'),
  ('fc-197', '2025-10-04T07:00:00-10:00', 3.5, 'SW', 12, 16, 190, 'onshore', 'outgoing'),
  ('fc-198', '2025-11-02T08:00:00-10:00', 3.0, 'S',  10, 13, 175, 'onshore', 'low'),
  ('fc-199', '2025-11-24T09:00:00-10:00', 4.0, 'SW', 13, 18, 200, 'onshore', 'incoming'),
  ('fc-200', '2025-12-16T08:00:00-10:00', 3.5, 'S',  11, 15, 185, 'onshore', 'high'),
  ('fc-201', '2026-01-25T07:00:00-10:00', 4.0, 'SW', 12, 17, 195, 'onshore', 'outgoing'),

  -- ─── POINT PANIC — transitional / cross ───────────────────────────────
  ('fc-202', '2025-08-26T08:00:00-10:00', 2.0, 'S',  13, 8,  90,  'cross', 'low'),
  ('fc-203', '2025-09-09T07:00:00-10:00', 2.5, 'SW', 12, 10, 270, 'cross', 'incoming'),
  ('fc-204', '2025-09-30T09:00:00-10:00', 2.0, 'SE', 14, 7,  85,  'cross', 'high'),
  ('fc-205', '2025-10-21T08:00:00-10:00', 2.5, 'S',  11, 9,  275, 'cross', 'outgoing'),
  ('fc-206', '2025-11-12T07:00:00-10:00', 2.0, 'SW', 13, 8,  95,  'cross', 'low'),
  ('fc-207', '2025-12-09T08:00:00-10:00', 2.5, 'S',  12, 10, 265, 'cross', 'incoming'),

  -- ─── MAGIC ISLAND — calm / offshore ───────────────────────────────────
  ('fc-208', '2025-05-30T07:00:00-10:00', 0.5, 'S',  16, 4,  30,  'offshore', 'low'),
  ('fc-209', '2025-06-16T08:00:00-10:00', 1.0, 'SW', 15, 5,  25,  'offshore', 'incoming'),
  ('fc-210', '2025-07-03T06:00:00-10:00', 0.8, 'S',  17, 3,  35,  'offshore', 'high'),
  ('fc-211', '2025-07-18T07:00:00-10:00', 0.5, 'SW', 16, 4,  20,  'offshore', 'outgoing'),
  ('fc-212', '2025-08-04T08:00:00-10:00', 1.0, 'S',  14, 6,  30,  'offshore', 'low'),
  ('fc-213', '2025-08-20T06:00:00-10:00', 0.8, 'SW', 15, 5,  25,  'offshore', 'incoming'),

  -- ─── MAGIC ISLAND — rough / onshore ───────────────────────────────────
  ('fc-214', '2025-09-18T08:00:00-10:00', 3.0, 'SW', 11, 14, 210, 'onshore', 'high'),
  ('fc-215', '2025-10-08T07:00:00-10:00', 3.5, 'S',  12, 15, 200, 'onshore', 'outgoing'),
  ('fc-216', '2025-11-04T08:00:00-10:00', 3.0, 'SW', 10, 13, 215, 'onshore', 'low'),
  ('fc-217', '2025-11-28T09:00:00-10:00', 3.5, 'W',  13, 17, 225, 'onshore', 'incoming'),
  ('fc-218', '2025-12-20T08:00:00-10:00', 3.0, 'S',  11, 14, 205, 'onshore', 'high'),
  ('fc-219', '2026-01-30T07:00:00-10:00', 3.5, 'SW', 12, 16, 220, 'onshore', 'outgoing'),

  -- ─── MAGIC ISLAND — transitional / cross ──────────────────────────────
  ('fc-220', '2025-08-30T08:00:00-10:00', 1.5, 'S',  13, 7,  120, 'cross', 'low'),
  ('fc-221', '2025-09-12T07:00:00-10:00', 2.0, 'SW', 12, 9,  300, 'cross', 'incoming'),
  ('fc-222', '2025-10-02T09:00:00-10:00', 1.5, 'S',  14, 6,  115, 'cross', 'high'),
  ('fc-223', '2025-10-24T08:00:00-10:00', 2.0, 'SW', 11, 8,  310, 'cross', 'outgoing'),
  ('fc-224', '2025-11-14T07:00:00-10:00', 1.5, 'S',  13, 7,  125, 'cross', 'low'),
  ('fc-225', '2025-12-11T08:00:00-10:00', 2.0, 'SW', 12, 9,  295, 'cross', 'incoming'),

  -- ─── ELECTRIC BEACH — extra cross-wind & fill ─────────────────────────
  ('fc-226', '2025-08-08T08:00:00-10:00', 1.5, 'S',  14, 8,  175, 'cross', 'incoming'),
  ('fc-227', '2025-09-22T07:00:00-10:00', 2.0, 'SW', 12, 10, 0,   'cross', 'low'),
  ('fc-228', '2025-10-08T09:00:00-10:00', 2.0, 'S',  13, 9,  185, 'cross', 'high'),
  ('fc-229', '2025-10-28T08:00:00-10:00', 1.5, 'SW', 14, 7,  170, 'cross', 'outgoing'),
  ('fc-230', '2025-11-18T07:00:00-10:00', 2.5, 'S',  11, 11, 195, 'cross', 'incoming'),
  ('fc-231', '2025-12-14T08:00:00-10:00', 2.0, 'W',  12, 8,  175, 'cross', 'low')

ON CONFLICT (id) DO NOTHING;


-- ═══════════════════════════════════════════════════════════════════════════
-- DIVE REPORTS
-- ═══════════════════════════════════════════════════════════════════════════

INSERT INTO dive_reports (id, site_id, datetime, visibility_category, surge_category, entry_exit_category, current_category, surface_conditions, notes, forecast_snapshot_id) VALUES

  -- ═══════════════════════════════════════════════════════════════════════════
  -- MAKAHA CAVERNS
  -- ═══════════════════════════════════════════════════════════════════════════

  -- calm / offshore
  ('rpt-100', 'makaha-caverns', '2025-05-20T07:30:00-10:00', 'excellent (80+ ft)', 'none',     'easy',        'none',     'flat',       'Explored the main cavern system. Light filtering in was magical. Zero current.', 'fc-100'),
  ('rpt-101', 'makaha-caverns', '2025-06-03T08:20:00-10:00', 'good (40-80 ft)',    'light',    'easy',        'mild',     'flat',       'Nice vis through the lava tubes. Saw a big porcupinefish hiding in a crevice.', 'fc-101'),
  ('rpt-102', 'makaha-caverns', '2025-06-18T06:30:00-10:00', 'excellent (80+ ft)', 'none',     'easy',        'none',     'flat',       'Dawn dive. Had the whole place to myself. Vis was unreal — easily 100 ft.', 'fc-102'),
  ('rpt-103', 'makaha-caverns', '2025-07-06T07:15:00-10:00', 'good (40-80 ft)',    'none',     'easy',        'mild',     'flat',       'Calm conditions, easy swim to the caverns. Lots of convict tang.', 'fc-103'),
  ('rpt-104', 'makaha-caverns', '2025-07-22T08:10:00-10:00', 'good (40-80 ft)',    'light',    'easy',        'none',     'flat',       'Summer morning dive. Clear water, gentle drift. Great for photos.', 'fc-104'),
  ('rpt-105', 'makaha-caverns', '2025-08-05T06:15:00-10:00', 'excellent (80+ ft)', 'none',     'easy',        'none',     'flat',       'Glass flat. Turtles resting on the sand outside the caverns. Incredible clarity.', 'fc-105'),

  -- moderate / onshore
  ('rpt-106', 'makaha-caverns', '2025-09-10T08:30:00-10:00', 'moderate (20-40 ft)', 'moderate', 'manageable', 'moderate', 'light chop', 'West swell pushing through. Surge inside caverns was noticeable. Vis around 30 ft.', 'fc-106'),
  ('rpt-107', 'makaha-caverns', '2025-10-05T07:40:00-10:00', 'poor (< 20 ft)',     'heavy',    'challenging', 'strong',   'rough',      'Should have checked conditions better. Surge in the caverns was too much — turned around.', 'fc-107'),
  ('rpt-108', 'makaha-caverns', '2025-10-25T08:15:00-10:00', 'moderate (20-40 ft)', 'moderate', 'manageable', 'moderate', 'light chop', 'Stayed outside the caverns due to surge. Decent dive along the reef flat.', 'fc-108'),
  ('rpt-109', 'makaha-caverns', '2025-11-10T09:00:00-10:00', 'poor (< 20 ft)',     'heavy',    'challenging', 'strong',   'rough',      'Big west swell. Entry was really sketchy. Aborted after entry attempt.', 'fc-109'),
  ('rpt-110', 'makaha-caverns', '2025-12-05T08:20:00-10:00', 'moderate (20-40 ft)', 'moderate', 'challenging', 'moderate', 'rough',      'NW swell wrapping in. Got in but vis was poor inside caverns. Not worth the risk.', 'fc-110'),
  ('rpt-111', 'makaha-caverns', '2026-01-10T07:30:00-10:00', 'poor (< 20 ft)',     'heavy',    'challenging', 'strong',   'rough',      'Winter swell hammering the west side. No way to safely enter. Watched from shore.', 'fc-111'),

  -- transitional / cross
  ('rpt-112', 'makaha-caverns', '2025-08-20T08:15:00-10:00', 'good (40-80 ft)',    'light',    'easy',        'mild',     'light chop', 'Cross wind made surface bumpy but underwater was fine. Good cavern dive.', 'fc-112'),
  ('rpt-113', 'makaha-caverns', '2025-09-01T07:20:00-10:00', 'good (40-80 ft)',    'light',    'manageable',  'mild',     'light chop', 'Slight south swell building. Vis decent around 50 ft. Nice dive overall.', 'fc-113'),
  ('rpt-114', 'makaha-caverns', '2025-09-20T09:10:00-10:00', 'good (40-80 ft)',    'light',    'easy',        'mild',     'light chop', 'Cross breeze but underwater was calm. Explored the deeper lava formations.', 'fc-114'),
  ('rpt-115', 'makaha-caverns', '2025-10-15T08:30:00-10:00', 'moderate (20-40 ft)', 'light',   'manageable',  'moderate', 'light chop', 'Small west swell. Didn''t enter the caverns but nice reef dive. Vis about 35 ft.', 'fc-115'),
  ('rpt-116', 'makaha-caverns', '2025-11-05T07:15:00-10:00', 'good (40-80 ft)',    'light',    'manageable',  'mild',     'light chop', 'Cross wind but swell was small. Went into the first cavern — turtle sleeping inside!', 'fc-116'),
  ('rpt-117', 'makaha-caverns', '2025-11-25T08:20:00-10:00', 'moderate (20-40 ft)', 'moderate', 'manageable', 'moderate', 'light chop', 'Moderate conditions. Stayed shallow. Cross-shore current made the exit interesting.', 'fc-117'),


  -- ═══════════════════════════════════════════════════════════════════════════
  -- SHARK'S COVE
  -- ═══════════════════════════════════════════════════════════════════════════

  -- calm summer / offshore
  ('rpt-118', 'sharks-cove', '2025-05-25T07:30:00-10:00', 'excellent (80+ ft)', 'none',     'easy',        'none',     'flat',       'First summer dive of the season. Crystal clear water. Saw a frogfish on the left wall.', 'fc-118'),
  ('rpt-119', 'sharks-cove', '2025-06-10T08:15:00-10:00', 'excellent (80+ ft)', 'none',     'easy',        'none',     'flat',       'Perfect conditions. Explored the caverns at depth. Whitemouth moray under a ledge.', 'fc-119'),
  ('rpt-120', 'sharks-cove', '2025-06-28T06:20:00-10:00', 'excellent (80+ ft)', 'none',     'easy',        'mild',     'flat',       'Dawn dive before the snorkelers arrive. Vis 80+ easy. Slight drift to the right.', 'fc-120'),
  ('rpt-121', 'sharks-cove', '2025-07-08T07:10:00-10:00', 'excellent (80+ ft)', 'none',     'easy',        'none',     'flat',       'Lake calm. Tidepools were like aquariums. Found two leaf scorpionfish.', 'fc-121'),
  ('rpt-122', 'sharks-cove', '2025-07-25T08:30:00-10:00', 'good (40-80 ft)',    'none',     'easy',        'mild',     'flat',       'Good vis, lots of people snorkeling. Got past them quickly to the deeper sections.', 'fc-122'),
  ('rpt-123', 'sharks-cove', '2025-08-08T06:30:00-10:00', 'excellent (80+ ft)', 'none',     'easy',        'none',     'flat',       'Early morning magic. Octopus hunting on the bottom. No wind, no current.', 'fc-123'),

  -- winter swell / onshore
  ('rpt-124', 'sharks-cove', '2025-10-08T08:30:00-10:00', 'poor (< 20 ft)',     'heavy',    'challenging', 'strong',   'rough',      'NW swell shutting down the north shore. Waves crashing into the cove. Undiveable.', 'fc-124'),
  ('rpt-125', 'sharks-cove', '2025-11-12T07:45:00-10:00', 'poor (< 20 ft)',     'heavy',    'challenging', 'strong',   'rough',      'Full winter mode. 5 ft north swell. Not a chance. Will come back in May.', 'fc-125'),
  ('rpt-126', 'sharks-cove', '2025-12-03T08:20:00-10:00', 'poor (< 20 ft)',     'heavy',    'challenging', 'strong',   'rough',      'Checked conditions — whitewater everywhere. Season is over at this site.', 'fc-126'),
  ('rpt-127', 'sharks-cove', '2025-12-18T09:00:00-10:00', 'poor (< 20 ft)',     'heavy',    'challenging', 'strong',   'rough',      'Big north swell. The cove is a washing machine. No entry possible.', 'fc-127'),
  ('rpt-128', 'sharks-cove', '2026-01-08T08:20:00-10:00', 'poor (< 20 ft)',     'heavy',    'challenging', 'strong',   'rough',      'Drove up to check — sets breaking well into the cove. Not happening.', 'fc-128'),
  ('rpt-129', 'sharks-cove', '2026-01-22T07:30:00-10:00', 'poor (< 20 ft)',     'heavy',    'challenging', 'strong',   'rough',      'Winter continues. The whole north shore is blown out. Headed to Electric Beach instead.', 'fc-129'),

  -- transitional / cross
  ('rpt-130', 'sharks-cove', '2025-08-28T08:10:00-10:00', 'good (40-80 ft)',    'light',    'manageable',  'mild',     'light chop', 'First hint of NE swell. Still diveable but noticeable surge at the entry point.', 'fc-130'),
  ('rpt-131', 'sharks-cove', '2025-09-08T07:20:00-10:00', 'good (40-80 ft)',    'light',    'manageable',  'moderate', 'light chop', 'Small north swell starting. Cross wind making it choppy. Vis still decent.', 'fc-131'),
  ('rpt-132', 'sharks-cove', '2025-09-22T09:15:00-10:00', 'moderate (20-40 ft)', 'moderate', 'manageable', 'mild',     'light chop', 'NW swell building. Stayed in the shallower pools. Vis dropping.', 'fc-132'),
  ('rpt-133', 'sharks-cove', '2025-10-18T08:30:00-10:00', 'moderate (20-40 ft)', 'moderate', 'manageable', 'moderate', 'light chop', 'Cross wind and NE swell. Got in a short dive. Surge was building.', 'fc-133'),
  ('rpt-134', 'sharks-cove', '2025-11-02T07:15:00-10:00', 'moderate (20-40 ft)', 'light',   'manageable',  'mild',     'light chop', 'Small window before the winter swells. Got a decent dive in. Vis around 30 ft.', 'fc-134'),
  ('rpt-135', 'sharks-cove', '2025-11-20T08:20:00-10:00', 'moderate (20-40 ft)', 'moderate', 'manageable', 'moderate', 'light chop', 'NW swell on the rise. Managed one last dive. Won''t be back until spring.', 'fc-135'),


  -- ═══════════════════════════════════════════════════════════════════════════
  -- THREE TABLES
  -- ═══════════════════════════════════════════════════════════════════════════

  -- calm summer / offshore
  ('rpt-136', 'three-tables', '2025-05-28T07:20:00-10:00', 'excellent (80+ ft)', 'none',     'easy',        'none',     'flat',       'Sandy entry is so much easier than Shark''s Cove. Vis amazing. Turtles on every table.', 'fc-136'),
  ('rpt-137', 'three-tables', '2025-06-12T08:10:00-10:00', 'good (40-80 ft)',    'none',     'easy',        'mild',     'flat',       'Swam out to the third table. Lots of reef fish. Easy entry and exit through the sand channel.', 'fc-137'),
  ('rpt-138', 'three-tables', '2025-07-02T06:15:00-10:00', 'excellent (80+ ft)', 'none',     'easy',        'none',     'flat',       'Early morning. The rock formations really pop in the morning light. Vis 80+ ft.', 'fc-138'),
  ('rpt-139', 'three-tables', '2025-07-15T07:10:00-10:00', 'excellent (80+ ft)', 'none',     'easy',        'none',     'flat',       'Flat calm. Found a sleeping whitetip reef shark under the second table.', 'fc-139'),
  ('rpt-140', 'three-tables', '2025-07-30T08:30:00-10:00', 'good (40-80 ft)',    'none',     'easy',        'mild',     'flat',       'Good conditions, busy with snorkelers. Dove deeper to avoid the crowds.', 'fc-140'),
  ('rpt-141', 'three-tables', '2025-08-12T06:20:00-10:00', 'excellent (80+ ft)', 'none',     'easy',        'none',     'flat',       'Perfect summer dive. Nudibranchs on the back side of the second table.', 'fc-141'),

  -- winter swell / onshore
  ('rpt-142', 'three-tables', '2025-10-12T08:20:00-10:00', 'moderate (20-40 ft)', 'moderate', 'challenging', 'moderate', 'rough',     'NW swell making entry tricky. Made it out but the tables had heavy surge around them.', 'fc-142'),
  ('rpt-143', 'three-tables', '2025-11-08T07:30:00-10:00', 'poor (< 20 ft)',     'heavy',    'challenging', 'strong',   'rough',      'Too much swell. Waves washing over the tables. Season ending.', 'fc-143'),
  ('rpt-144', 'three-tables', '2025-12-06T08:15:00-10:00', 'poor (< 20 ft)',     'heavy',    'challenging', 'strong',   'rough',      'North swell pounding. Sandy entry area has rip currents. Not safe.', 'fc-144'),
  ('rpt-145', 'three-tables', '2025-12-22T09:10:00-10:00', 'poor (< 20 ft)',     'heavy',    'challenging', 'strong',   'rough',      'Holiday check — nope. Full winter surf. Waves crashing over the rock formations.', 'fc-145'),
  ('rpt-146', 'three-tables', '2026-01-12T08:30:00-10:00', 'moderate (20-40 ft)', 'moderate', 'manageable', 'moderate', 'rough',      'Smaller day between swells. Got in a quick dive. Vis around 25 ft. Surge still strong.', 'fc-146'),
  ('rpt-147', 'three-tables', '2026-01-28T07:20:00-10:00', 'poor (< 20 ft)',     'heavy',    'challenging', 'strong',   'rough',      'Another winter swell. The sand channel was churning. Not worth it.', 'fc-147'),

  -- transitional / cross
  ('rpt-148', 'three-tables', '2025-09-02T08:20:00-10:00', 'good (40-80 ft)',    'light',    'easy',        'mild',     'light chop', 'NE wind, small swell. Still a good dive. Vis around 50 ft. Some surge near the tables.', 'fc-148'),
  ('rpt-149', 'three-tables', '2025-09-18T07:15:00-10:00', 'good (40-80 ft)',    'light',    'manageable',  'moderate', 'light chop', 'Small north swell and westerly cross wind. Decent conditions. Saw an eagle ray!', 'fc-149'),
  ('rpt-150', 'three-tables', '2025-09-28T09:20:00-10:00', 'good (40-80 ft)',    'light',    'manageable',  'mild',     'light chop', 'NW swell barely showing. Got a nice dive in. Vis 40+ ft.', 'fc-150'),
  ('rpt-151', 'three-tables', '2025-10-22T08:10:00-10:00', 'moderate (20-40 ft)', 'moderate', 'manageable', 'moderate', 'light chop', 'Swell building from NE. Managed a short dive. Vis dropping to 30 ft.', 'fc-151'),
  ('rpt-152', 'three-tables', '2025-11-06T07:25:00-10:00', 'moderate (20-40 ft)', 'light',   'manageable',  'mild',     'light chop', 'Brief window. Got in. Vis ok at 35 ft. Surge starting to pick up.', 'fc-152'),
  ('rpt-153', 'three-tables', '2025-12-08T08:15:00-10:00', 'moderate (20-40 ft)', 'moderate', 'manageable', 'moderate', 'light chop', 'Small NW swell. Quick dive around the first table. Not bad actually.', 'fc-153'),


  -- ═══════════════════════════════════════════════════════════════════════════
  -- CHINA WALLS
  -- ═══════════════════════════════════════════════════════════════════════════

  -- calm / offshore
  ('rpt-154', 'china-walls', '2025-05-22T08:20:00-10:00', 'excellent (80+ ft)', 'none',     'manageable',  'mild',     'flat',       'Calm day at the walls. Entry off the ledge was smooth. Blue water, great vis.', 'fc-154'),
  ('rpt-155', 'china-walls', '2025-06-06T07:30:00-10:00', 'good (40-80 ft)',    'none',     'easy',        'mild',     'flat',       'Easy ledge entry. Drifted along the wall. Saw a pod of spinner dolphins offshore.', 'fc-155'),
  ('rpt-156', 'china-walls', '2025-06-25T06:15:00-10:00', 'excellent (80+ ft)', 'none',     'easy',        'none',     'flat',       'Sunrise dive. Nobody else there. The wall drops off beautifully. 80+ ft vis easy.', 'fc-156'),
  ('rpt-157', 'china-walls', '2025-07-10T08:30:00-10:00', 'good (40-80 ft)',    'light',    'manageable',  'mild',     'flat',       'Slight drift along the wall. Good vis. Saw a white-tip cruising the drop-off.', 'fc-157'),
  ('rpt-158', 'china-walls', '2025-07-26T07:20:00-10:00', 'good (40-80 ft)',    'none',     'manageable',  'moderate', 'flat',       'Calm surface but moderate current along the wall. Good vis at 50+ ft.', 'fc-158'),
  ('rpt-159', 'china-walls', '2025-08-06T06:30:00-10:00', 'excellent (80+ ft)', 'none',     'easy',        'none',     'flat',       'Perfect morning. Vis was incredible. Could see the bottom from the ledge.', 'fc-159'),

  -- rough / onshore
  ('rpt-160', 'china-walls', '2025-09-12T08:20:00-10:00', 'moderate (20-40 ft)', 'moderate', 'challenging', 'strong',   'light chop', 'South swell and onshore wind. Strong current along the wall. Tricky entry.', 'fc-160'),
  ('rpt-161', 'china-walls', '2025-10-02T07:30:00-10:00', 'poor (< 20 ft)',     'heavy',    'challenging', 'strong',   'rough',      'SE swell smashing the wall. Waves surging up the ledge. Did not enter.', 'fc-161'),
  ('rpt-162', 'china-walls', '2025-10-28T08:10:00-10:00', 'moderate (20-40 ft)', 'moderate', 'challenging', 'moderate', 'light chop', 'South swell. Got in but the current was ripping. Short dive, exited quickly.', 'fc-162'),
  ('rpt-163', 'china-walls', '2025-11-18T09:10:00-10:00', 'poor (< 20 ft)',     'heavy',    'challenging', 'strong',   'rough',      'Onshore SE wind + big swell = no go. Waves breaking on the entry ledge.', 'fc-163'),
  ('rpt-164', 'china-walls', '2025-12-12T08:20:00-10:00', 'moderate (20-40 ft)', 'moderate', 'challenging', 'strong',   'rough',      'East swell wrapping around. Strong pull. Made it in but conditions were marginal.', 'fc-164'),
  ('rpt-165', 'china-walls', '2026-01-18T07:40:00-10:00', 'poor (< 20 ft)',     'heavy',    'challenging', 'strong',   'rough',      'South swell season. China Walls was getting slammed. Drove to Magic Island instead.', 'fc-165'),

  -- transitional / cross
  ('rpt-166', 'china-walls', '2025-08-22T08:15:00-10:00', 'good (40-80 ft)',    'light',    'manageable',  'moderate', 'light chop', 'Cross wind from NE. Surface a bit choppy but vis good at depth. Nice wall drift.', 'fc-166'),
  ('rpt-167', 'china-walls', '2025-09-05T07:20:00-10:00', 'good (40-80 ft)',    'light',    'manageable',  'mild',     'light chop', 'Moderate swell from south. Cross wind. Manageable dive. Turtle cleaning station.', 'fc-167'),
  ('rpt-168', 'china-walls', '2025-09-25T09:10:00-10:00', 'good (40-80 ft)',    'light',    'manageable',  'moderate', 'light chop', 'SW cross wind. Vis good at 45 ft. Current moderate but steady — easy to plan around.', 'fc-168'),
  ('rpt-169', 'china-walls', '2025-10-16T08:30:00-10:00', 'moderate (20-40 ft)', 'light',   'manageable',  'moderate', 'light chop', 'East swell and NE cross wind. Vis around 30 ft. Short but decent dive.', 'fc-169'),
  ('rpt-170', 'china-walls', '2025-11-08T07:15:00-10:00', 'moderate (20-40 ft)', 'moderate', 'manageable', 'moderate', 'light chop', 'Cross wind from SW. Some surge. Vis about 25 ft. Not bad for a November dive.', 'fc-170'),
  ('rpt-171', 'china-walls', '2025-12-02T08:10:00-10:00', 'moderate (20-40 ft)', 'light',   'manageable',  'moderate', 'light chop', 'SE swell + NE cross wind. Got a quick dive in. Current was manageable.', 'fc-171'),


  -- ═══════════════════════════════════════════════════════════════════════════
  -- LANAI LOOKOUT
  -- ═══════════════════════════════════════════════════════════════════════════

  -- calm / offshore
  ('rpt-172', 'lanai-lookout', '2025-05-24T07:20:00-10:00', 'good (40-80 ft)',    'light',    'manageable',  'mild',     'flat',       'Calm morning at the lookout. Rocky entry requires care even on flat days. Good vis.', 'fc-172'),
  ('rpt-173', 'lanai-lookout', '2025-06-08T08:10:00-10:00', 'good (40-80 ft)',    'none',     'manageable',  'mild',     'flat',       'South swell small. Entry was straightforward. Nice drift dive along the coast.', 'fc-173'),
  ('rpt-174', 'lanai-lookout', '2025-06-22T06:30:00-10:00', 'excellent (80+ ft)', 'none',     'manageable',  'none',     'flat',       'Flat calm dawn patrol. Vis was spectacular — could see Lanai on the horizon and the bottom clearly.', 'fc-174'),
  ('rpt-175', 'lanai-lookout', '2025-07-05T07:10:00-10:00', 'good (40-80 ft)',    'light',    'manageable',  'mild',     'flat',       'Small east swell. Rocky entry a bit slippery. Once in, great conditions.', 'fc-175'),
  ('rpt-176', 'lanai-lookout', '2025-07-28T08:20:00-10:00', 'good (40-80 ft)',    'none',     'manageable',  'moderate', 'flat',       'Good vis but steady current heading east. Stay close to the rocks for easier exit.', 'fc-176'),
  ('rpt-177', 'lanai-lookout', '2025-08-10T06:15:00-10:00', 'excellent (80+ ft)', 'none',     'easy',        'none',     'flat',       'Glassy morning. Even the rocky entry felt easy. Incredible underwater scenery.', 'fc-177'),

  -- rough / onshore
  ('rpt-178', 'lanai-lookout', '2025-09-14T08:30:00-10:00', 'moderate (20-40 ft)', 'moderate', 'challenging', 'strong',   'light chop', 'SE swell picking up. Rocky entry was dicey with the surge. Strong current.', 'fc-178'),
  ('rpt-179', 'lanai-lookout', '2025-10-06T07:20:00-10:00', 'poor (< 20 ft)',     'heavy',    'challenging', 'strong',   'rough',      'South swell and onshore wind. Water was churned up. Vis terrible. Not worth the risk.', 'fc-179'),
  ('rpt-180', 'lanai-lookout', '2025-10-30T08:10:00-10:00', 'moderate (20-40 ft)', 'moderate', 'challenging', 'moderate', 'light chop', 'East swell. Got in but conditions were marginal. Exit was harder than entry.', 'fc-180'),
  ('rpt-181', 'lanai-lookout', '2025-11-22T09:10:00-10:00', 'poor (< 20 ft)',     'heavy',    'challenging', 'strong',   'rough',      'SE swell and onshore wind. Waves washing over the entry rocks. Absolutely not.', 'fc-181'),
  ('rpt-182', 'lanai-lookout', '2025-12-15T08:20:00-10:00', 'moderate (20-40 ft)', 'moderate', 'challenging', 'strong',   'rough',      'South swell. Managed entry but current was brutal. Short dive — 15 min max.', 'fc-182'),
  ('rpt-183', 'lanai-lookout', '2026-01-20T07:30:00-10:00', 'poor (< 20 ft)',     'heavy',    'challenging', 'strong',   'rough',      'East swell + onshore. The rocks were getting slammed. Zero visibility. Called it.', 'fc-183'),

  -- transitional / cross
  ('rpt-184', 'lanai-lookout', '2025-08-24T08:15:00-10:00', 'good (40-80 ft)',    'light',    'manageable',  'moderate', 'light chop', 'NE cross wind. Surface choppy but vis fine at depth. Decent drift dive.', 'fc-184'),
  ('rpt-185', 'lanai-lookout', '2025-09-06T07:20:00-10:00', 'moderate (20-40 ft)', 'light',   'manageable',  'moderate', 'light chop', 'East swell building. Cross wind from SW. Vis around 35 ft. Manageable.', 'fc-185'),
  ('rpt-186', 'lanai-lookout', '2025-09-26T09:15:00-10:00', 'good (40-80 ft)',    'light',    'manageable',  'mild',     'light chop', 'South swell small, NE cross wind. Good dive. Saw a large school of akule.', 'fc-186'),
  ('rpt-187', 'lanai-lookout', '2025-10-19T08:30:00-10:00', 'moderate (20-40 ft)', 'moderate', 'manageable', 'moderate', 'light chop', 'SE swell and cross wind. Vis around 30 ft. Rocky entry needed timing.', 'fc-187'),
  ('rpt-188', 'lanai-lookout', '2025-11-09T07:10:00-10:00', 'moderate (20-40 ft)', 'light',   'manageable',  'mild',     'light chop', 'East swell. Cross wind from NE. Got a decent dive in. Vis about 25 ft.', 'fc-188'),
  ('rpt-189', 'lanai-lookout', '2025-12-04T08:20:00-10:00', 'moderate (20-40 ft)', 'moderate', 'manageable', 'moderate', 'light chop', 'South swell + cross wind. Short dive but saw a big ulua near the rocks.', 'fc-189'),


  -- ═══════════════════════════════════════════════════════════════════════════
  -- POINT PANIC
  -- ═══════════════════════════════════════════════════════════════════════════

  -- calm / offshore
  ('rpt-190', 'point-panic', '2025-05-26T07:30:00-10:00', 'excellent (80+ ft)', 'none',     'manageable',  'none',     'flat',       'Calm morning at the seawall. Clear blue water. Watched a monk seal swim by.', 'fc-190'),
  ('rpt-191', 'point-panic', '2025-06-14T08:15:00-10:00', 'good (40-80 ft)',    'none',     'manageable',  'mild',     'flat',       'Offshore winds, flat surface. Rock entry fine with booties. Lots of fish near the wall.', 'fc-191'),
  ('rpt-192', 'point-panic', '2025-06-30T06:20:00-10:00', 'excellent (80+ ft)', 'none',     'easy',        'none',     'flat',       'Dawn patrol. Had Point Panic to myself. Incredible vis. Parrotfish everywhere.', 'fc-192'),
  ('rpt-193', 'point-panic', '2025-07-14T07:10:00-10:00', 'good (40-80 ft)',    'light',    'manageable',  'mild',     'flat',       'Small SE swell. Vis great at 60 ft. Nice dive along the seawall — moray eels out hunting.', 'fc-193'),
  ('rpt-194', 'point-panic', '2025-08-01T08:20:00-10:00', 'good (40-80 ft)',    'none',     'manageable',  'mild',     'flat',       'Mellow south swell. Vis 50+ ft. Rock entry required care but no big deal.', 'fc-194'),
  ('rpt-195', 'point-panic', '2025-08-18T06:30:00-10:00', 'excellent (80+ ft)', 'none',     'easy',        'none',     'flat',       'Glass flat. Clearest I''ve ever seen at Point Panic. Even the sandy bottom was visible from the wall.', 'fc-195'),

  -- rough / onshore
  ('rpt-196', 'point-panic', '2025-09-16T08:30:00-10:00', 'moderate (20-40 ft)', 'moderate', 'manageable', 'moderate', 'light chop', 'South swell hitting the seawall. Surge bouncing off the rocks. Vis 30 ft.', 'fc-196'),
  ('rpt-197', 'point-panic', '2025-10-04T07:40:00-10:00', 'moderate (20-40 ft)', 'moderate', 'challenging', 'strong',   'rough',      'SW swell and onshore. Entry off the rocks was tough. Current strong but vis ok.', 'fc-197'),
  ('rpt-198', 'point-panic', '2025-11-02T08:20:00-10:00', 'moderate (20-40 ft)', 'moderate', 'manageable', 'moderate', 'light chop', 'South swell running. Surge present but manageable near the wall. Vis about 25 ft.', 'fc-198'),
  ('rpt-199', 'point-panic', '2025-11-24T09:00:00-10:00', 'poor (< 20 ft)',     'heavy',    'challenging', 'strong',   'rough',      'Big SW swell. Water all churned up. Vis under 10 ft. Not worth it.', 'fc-199'),
  ('rpt-200', 'point-panic', '2025-12-16T08:30:00-10:00', 'moderate (20-40 ft)', 'moderate', 'challenging', 'moderate', 'rough',      'South swell. Got in but conditions were on the edge. Exit was the hard part.', 'fc-200'),
  ('rpt-201', 'point-panic', '2026-01-25T07:20:00-10:00', 'poor (< 20 ft)',     'heavy',    'challenging', 'strong',   'rough',      'SW swell wrapping around. Seawall getting pounded. Unsafe entry.', 'fc-201'),

  -- transitional / cross
  ('rpt-202', 'point-panic', '2025-08-26T08:10:00-10:00', 'good (40-80 ft)',    'light',    'manageable',  'mild',     'light chop', 'East cross wind. Surface a bit bumpy. Good vis at depth though — 50 ft.', 'fc-202'),
  ('rpt-203', 'point-panic', '2025-09-09T07:20:00-10:00', 'good (40-80 ft)',    'light',    'manageable',  'moderate', 'light chop', 'SW swell + westerly cross wind. Decent dive near the seawall. Vis 40+ ft.', 'fc-203'),
  ('rpt-204', 'point-panic', '2025-09-30T09:10:00-10:00', 'good (40-80 ft)',    'light',    'manageable',  'mild',     'light chop', 'SE swell small. Cross wind from east. Good conditions overall.', 'fc-204'),
  ('rpt-205', 'point-panic', '2025-10-21T08:20:00-10:00', 'moderate (20-40 ft)', 'light',   'manageable',  'moderate', 'light chop', 'South swell + westerly cross. Vis around 35 ft. Some current near the channel.', 'fc-205'),
  ('rpt-206', 'point-panic', '2025-11-12T07:10:00-10:00', 'good (40-80 ft)',    'light',    'manageable',  'mild',     'light chop', 'SW swell with east cross wind. Nice dive. Vis 45 ft. Saw a big barracuda.', 'fc-206'),
  ('rpt-207', 'point-panic', '2025-12-09T08:15:00-10:00', 'moderate (20-40 ft)', 'moderate', 'manageable', 'moderate', 'light chop', 'South swell + west cross wind. Manageable but not great. Vis about 30 ft.', 'fc-207'),


  -- ═══════════════════════════════════════════════════════════════════════════
  -- MAGIC ISLAND
  -- ═══════════════════════════════════════════════════════════════════════════

  -- calm / offshore
  ('rpt-208', 'magic-island', '2025-05-30T07:30:00-10:00', 'good (40-80 ft)',    'none',     'easy',        'none',     'flat',       'Sandy entry is perfect for beginners. Calm lagoon. Vis about 50 ft near the reef.', 'fc-208'),
  ('rpt-209', 'magic-island', '2025-06-16T08:10:00-10:00', 'good (40-80 ft)',    'none',     'easy',        'mild',     'flat',       'Morning dive in the lagoon. Easy walk-in entry. Turtles grazing on the reef.', 'fc-209'),
  ('rpt-210', 'magic-island', '2025-07-03T06:20:00-10:00', 'excellent (80+ ft)', 'none',     'easy',        'none',     'flat',       'Early morning magic at Magic Island. Crystal clear lagoon. Schools of goatfish.', 'fc-210'),
  ('rpt-211', 'magic-island', '2025-07-18T07:10:00-10:00', 'good (40-80 ft)',    'none',     'easy',        'none',     'flat',       'Flat calm. Snorkeled in, then descended. Perfect beginner conditions.', 'fc-211'),
  ('rpt-212', 'magic-island', '2025-08-04T08:20:00-10:00', 'good (40-80 ft)',    'none',     'easy',        'mild',     'flat',       'Calm day. Explored the outer reef edge. Small current near the channel. Great vis.', 'fc-212'),
  ('rpt-213', 'magic-island', '2025-08-20T06:30:00-10:00', 'excellent (80+ ft)', 'none',     'easy',        'none',     'flat',       'Dawn dive. The lagoon was like a swimming pool. Vis 80+ ft. No current at all.', 'fc-213'),

  -- rough / onshore
  ('rpt-214', 'magic-island', '2025-09-18T08:20:00-10:00', 'moderate (20-40 ft)', 'light',   'easy',        'moderate', 'light chop', 'SW swell reaching the lagoon. Even Magic Island had vis drop to 30 ft. Still easy entry.', 'fc-214'),
  ('rpt-215', 'magic-island', '2025-10-08T07:30:00-10:00', 'moderate (20-40 ft)', 'moderate', 'manageable', 'moderate', 'light chop', 'South swell pushing over the reef. Lagoon was murkier than usual. Vis 25 ft.', 'fc-215'),
  ('rpt-216', 'magic-island', '2025-11-04T08:10:00-10:00', 'moderate (20-40 ft)', 'light',   'easy',        'mild',     'light chop', 'SW swell. Protected lagoon still had decent conditions. Just reduced vis.', 'fc-216'),
  ('rpt-217', 'magic-island', '2025-11-28T09:00:00-10:00', 'moderate (20-40 ft)', 'moderate', 'manageable', 'moderate', 'light chop', 'West swell wrapping in. Lagoon getting some surge. Vis about 20 ft.', 'fc-217'),
  ('rpt-218', 'magic-island', '2025-12-20T08:20:00-10:00', 'moderate (20-40 ft)', 'light',   'easy',        'mild',     'light chop', 'South swell but lagoon is well protected. Still diveable. Vis 30 ft.', 'fc-218'),
  ('rpt-219', 'magic-island', '2026-01-30T07:20:00-10:00', 'moderate (20-40 ft)', 'moderate', 'manageable', 'moderate', 'light chop', 'SW swell. Outer reef getting hammered but lagoon was ok. Not great vis though.', 'fc-219'),

  -- transitional / cross
  ('rpt-220', 'magic-island', '2025-08-30T08:10:00-10:00', 'good (40-80 ft)',    'none',     'easy',        'mild',     'light chop', 'SE cross wind. Light surface chop in lagoon. Good vis. Relaxing dive.', 'fc-220'),
  ('rpt-221', 'magic-island', '2025-09-12T07:20:00-10:00', 'good (40-80 ft)',    'light',    'easy',        'mild',     'light chop', 'SW swell small. NW cross wind. Good conditions. Lots of butterflyfish on the reef.', 'fc-221'),
  ('rpt-222', 'magic-island', '2025-10-02T09:10:00-10:00', 'good (40-80 ft)',    'none',     'easy',        'mild',     'light chop', 'Cross wind from SE. Lagoon slightly choppy on top. Vis 50 ft at depth.', 'fc-222'),
  ('rpt-223', 'magic-island', '2025-10-24T08:20:00-10:00', 'good (40-80 ft)',    'light',    'easy',        'mild',     'light chop', 'SW swell + NW cross wind. Lagoon conditions fine. Easy dive. Saw a big puffer.', 'fc-223'),
  ('rpt-224', 'magic-island', '2025-11-14T07:10:00-10:00', 'good (40-80 ft)',    'none',     'easy',        'none',     'light chop', 'Cross wind but lagoon is so protected it barely matters. Good vis, easy dive.', 'fc-224'),
  ('rpt-225', 'magic-island', '2025-12-11T08:20:00-10:00', 'good (40-80 ft)',    'light',    'easy',        'mild',     'light chop', 'SW swell + westerly cross wind. Good conditions in the lagoon. Vis 40+ ft.', 'fc-225'),


  -- ═══════════════════════════════════════════════════════════════════════════
  -- ELECTRIC BEACH — extra cross-wind reports for better matching coverage
  -- ═══════════════════════════════════════════════════════════════════════════

  ('rpt-226', 'electric-beach', '2025-08-08T08:30:00-10:00', 'good (40-80 ft)',    'light',    'easy',        'mild',     'light chop', 'South cross wind made surface choppy. Underwater was fine. Turtles at the pipe.', 'fc-226'),
  ('rpt-227', 'electric-beach', '2025-09-22T07:20:00-10:00', 'good (40-80 ft)',    'light',    'manageable',  'mild',     'light chop', 'Cross wind day. Slight swell. Vis around 50 ft. Nice conditions overall.', 'fc-227'),
  ('rpt-228', 'electric-beach', '2025-10-08T09:15:00-10:00', 'good (40-80 ft)',    'light',    'easy',        'mild',     'light chop', 'Cross-shore wind. Small south swell. Good dive — eagle ray near the outflow.', 'fc-228'),
  ('rpt-229', 'electric-beach', '2025-10-28T08:20:00-10:00', 'good (40-80 ft)',    'light',    'manageable',  'mild',     'light chop', 'Cross wind, small swell. Vis good at 50 ft. Dolphins passed through!', 'fc-229'),
  ('rpt-230', 'electric-beach', '2025-11-18T07:30:00-10:00', 'moderate (20-40 ft)', 'light',   'manageable',  'moderate', 'light chop', 'Stronger cross wind. South swell building. Vis dropping to 35 ft but still diveable.', 'fc-230'),
  ('rpt-231', 'electric-beach', '2025-12-14T08:15:00-10:00', 'moderate (20-40 ft)', 'light',   'manageable',  'mild',     'light chop', 'Cross wind with west swell. Vis about 30 ft. Short dive but saw a manta!', 'fc-231')

ON CONFLICT (id) DO NOTHING;

