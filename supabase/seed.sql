-- ============================================================================
-- Skylens — demo seed
-- Spiegelt lib/seed.ts zodat een verse database direct demo-data heeft voor de
-- gids, matching en showcase. Draai NA 0001_init.sql.
--
-- Let op: pilots.profile_id verwijst naar profiles(id) -> auth.users(id).
-- We maken eerst placeholder-auth-users (rol 'pilot'), daarna de profielen en
-- piloten. Idempotent dankzij vaste UUID's + ON CONFLICT.
-- ============================================================================

-- ── Placeholder auth-users (zodat profiles.id geldig blijft) ─────────────────
insert into auth.users (id, email, created_at)
values
  ('00000000-0000-0000-0000-000000000001', 'lars@skyframe.demo',   now()),
  ('00000000-0000-0000-0000-000000000002', 'sanne@hoogzicht.demo', now()),
  ('00000000-0000-0000-0000-000000000003', 'youssef@vlucht3d.demo',now()),
  ('00000000-0000-0000-0000-000000000004', 'emma@evfilms.demo',    now()),
  ('00000000-0000-0000-0000-000000000005', 'tom@jansenlucht.demo', now()),
  ('00000000-0000-0000-0000-000000000006', 'lotte@groenzicht.demo',now()),
  ('00000000-0000-0000-0000-000000000007', 'david@kosteraerial.demo', now()),
  ('00000000-0000-0000-0000-000000000008', 'nina@smitvisuals.demo',now())
on conflict (id) do nothing;

-- ── Profielen (rol 'pilot') ──────────────────────────────────────────────────
insert into profiles (id, role, full_name, email, company, country)
values
  ('00000000-0000-0000-0000-000000000001', 'pilot', 'Lars de Vries',  'lars@skyframe.demo',    'Skyframe Media',       'NL'),
  ('00000000-0000-0000-0000-000000000002', 'pilot', 'Sanne Bakker',   'sanne@hoogzicht.demo',  'Hoogzicht Inspecties', 'NL'),
  ('00000000-0000-0000-0000-000000000003', 'pilot', 'Youssef Amrani', 'youssef@vlucht3d.demo', 'Vlucht3D',             'NL'),
  ('00000000-0000-0000-0000-000000000004', 'pilot', 'Emma Visser',    'emma@evfilms.demo',     'Emma Visser Films',    'NL'),
  ('00000000-0000-0000-0000-000000000005', 'pilot', 'Tom Jansen',     'tom@jansenlucht.demo',  'Jansen Luchtfoto',     'NL'),
  ('00000000-0000-0000-0000-000000000006', 'pilot', 'Lotte Meijer',   'lotte@groenzicht.demo', 'GroenZicht Agro',      'NL'),
  ('00000000-0000-0000-0000-000000000007', 'pilot', 'David Koster',   'david@kosteraerial.demo','Koster Aerial',       'NL'),
  ('00000000-0000-0000-0000-000000000008', 'pilot', 'Nina Smit',      'nina@smitvisuals.demo', 'Smit Visuals',         'NL')
on conflict (id) do nothing;

-- ── Piloten ──────────────────────────────────────────────────────────────────
insert into pilots (
  id, profile_id, slug, name, company, city_slug, region, country,
  tier, membership, operator_id, insured, verified, published,
  service_radius_km, segments, gear, bio, rating, review_count, jobs_done, response_time
) values
  ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001',
   'lars-de-vries', 'Lars de Vries', 'Skyframe Media', 'amsterdam', 'Randstad', 'NL',
   'silver', 'pro', 'NLD••••4821', true, true, true,
   45, '{vastgoed,marketing,evenementen}', '{"DJI Mavic 4 Pro","DJI Air 3S"}',
   'Cinematograaf met 6 jaar drone-ervaring. Gespecialiseerd in vastgoed- en merkvideo voor makelaars en hotels in de Randstad. Snel, betrouwbaar, Funda-klaar.',
   4.9, 38, 142, '< 1 uur'),

  ('10000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002',
   'sanne-bakker', 'Sanne Bakker', 'Hoogzicht Inspecties', 'rotterdam', 'Randstad', 'NL',
   'gold', 'elite', 'NLD••••9173', true, true, true,
   60, '{inspectie,zonnepanelen,bouw}', '{"DJI Matrice 4T","Zenmuse H30T"}',
   'Specialist in technische inspectie en thermografie. STS-01 gecertificeerd, €2M verzekerd. Levert heldere rapporten voor VvE''s, installateurs en bouwbedrijven.',
   4.8, 51, 210, '< 2 uur'),

  ('10000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000003',
   'youssef-amrani', 'Youssef Amrani', 'Vlucht3D', 'utrecht', 'Randstad', 'NL',
   'platinum', 'elite', 'NLD••••2056', true, true, true,
   80, '{landmeten,bouw,inspectie}', '{"DJI Matrice 400","Zenmuse L2 LiDAR"}',
   'Landmeetkundige met operationele autorisatie voor complexe projecten. LiDAR-puntwolken en orthomosaïeken met RTK-nauwkeurigheid voor ingenieurs en gemeenten.',
   5.0, 27, 96, '< 3 uur'),

  ('10000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000004',
   'emma-visser', 'Emma Visser', 'Emma Visser Films', 'den-haag', 'Randstad', 'NL',
   'platinum', 'pro', 'NLD••••6634', true, true, true,
   50, '{marketing,evenementen,vastgoed}', '{"DJI Inspire 3","DJI Mavic 4 Pro"}',
   'Cinematische merkfilms met de Inspire 3 (8K). Werkt voor reclamebureaus en toerisme. Volledige crew mogelijk voor commercials.',
   4.9, 44, 168, '< 1 uur'),

  ('10000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000005',
   'tom-jansen', 'Tom Jansen', 'Jansen Luchtfoto', 'eindhoven', 'Brabant', 'NL',
   'bronze', 'free', 'NLD••••3390', true, true, true,
   40, '{vastgoed,evenementen}', '{"DJI Mini 5 Pro"}',
   'Betaalbare luchtfoto''s voor woningen en kleine evenementen in Brabant. Snelle levering, scherpe prijs.',
   4.7, 19, 64, '< 4 uur'),

  ('10000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000006',
   'lotte-meijer', 'Lotte Meijer', 'GroenZicht Agro', 'zwolle', 'Oost', 'NL',
   'gold', 'pro', 'NLD••••7745', true, true, true,
   70, '{agrarisch,landmeten,inspectie}', '{"DJI Mavic 3 Multispectral","Matrice 4E"}',
   'Precisielandbouw vanuit de lucht. NDVI-kaarten en gewasmonitoring voor telers en loonwerkers in Oost-Nederland.',
   4.8, 22, 88, '< 3 uur'),

  ('10000000-0000-0000-0000-000000000007', '00000000-0000-0000-0000-000000000007',
   'david-koster', 'David Koster', 'Koster Aerial', 'groningen', 'Noord', 'NL',
   'gold', 'pro', 'NLD••••1208', true, true, true,
   75, '{zonnepanelen,bouw,inspectie}', '{"DJI Matrice 4T","Zenmuse H30T"}',
   'Thermografie en inspectie in Noord-Nederland. Veel ervaring met zonneparken en windenergie-gerelateerde inspecties.',
   4.6, 17, 73, '< 4 uur'),

  ('10000000-0000-0000-0000-000000000008', '00000000-0000-0000-0000-000000000008',
   'nina-smit', 'Nina Smit', 'Smit Visuals', 'haarlem', 'Randstad', 'NL',
   'silver', 'pro', 'NLD••••5519', true, true, true,
   40, '{marketing,vastgoed,evenementen}', '{"DJI Mavic 4 Pro"}',
   'Social-first dronecontent voor merken en makelaars in en rond Amsterdam. Sterk in verticale video voor Reels en TikTok.',
   4.9, 31, 119, '< 1 uur')
on conflict (slug) do nothing;

-- Ruben Postma is in lib/seed.ts (verified=false) -> niet gepubliceerd, dus
-- bewust weggelaten uit de publieke seed. Voeg toe wanneer je een "in
-- verificatie"-flow wilt demonstreren.

-- ── Certificaten (met expires_at, geverifieerd) ──────────────────────────────
insert into certifications (pilot_id, level, verified, issued_at, expires_at)
values
  ('10000000-0000-0000-0000-000000000001', 'a2',              true, '2023-04-01', '2028-04-01'),
  ('10000000-0000-0000-0000-000000000002', 'a2',              true, '2022-09-01', '2027-09-01'),
  ('10000000-0000-0000-0000-000000000002', 'sts_01',          true, '2023-01-15', '2028-01-15'),
  ('10000000-0000-0000-0000-000000000003', 'a2',              true, '2021-06-01', '2026-06-01'),
  ('10000000-0000-0000-0000-000000000003', 'sts_01',          true, '2022-03-01', '2027-03-01'),
  ('10000000-0000-0000-0000-000000000003', 'operational_auth',true, '2023-05-01', '2026-05-01'),
  ('10000000-0000-0000-0000-000000000004', 'a2',              true, '2022-11-01', '2027-11-01'),
  ('10000000-0000-0000-0000-000000000005', 'a1_a3',           true, '2024-02-01', '2029-02-01'),
  ('10000000-0000-0000-0000-000000000006', 'a2',              true, '2022-08-01', '2027-08-01'),
  ('10000000-0000-0000-0000-000000000006', 'sts_01',          true, '2023-02-01', '2028-02-01'),
  ('10000000-0000-0000-0000-000000000007', 'a2',              true, '2022-10-01', '2027-10-01'),
  ('10000000-0000-0000-0000-000000000007', 'sts_01',          true, '2023-03-01', '2028-03-01'),
  ('10000000-0000-0000-0000-000000000008', 'a2',              true, '2023-07-01', '2028-07-01')
on conflict (pilot_id, level) do nothing;

-- ── Materieel (drones) ───────────────────────────────────────────────────────
insert into drones (pilot_id, model, c_class, payloads)
values
  ('10000000-0000-0000-0000-000000000001', 'DJI Mavic 4 Pro',          'C2', '{}'),
  ('10000000-0000-0000-0000-000000000002', 'DJI Matrice 4T',           'C2', '{thermal}'),
  ('10000000-0000-0000-0000-000000000003', 'DJI Matrice 400',          'C6', '{LiDAR,RTK}'),
  ('10000000-0000-0000-0000-000000000004', 'DJI Inspire 3',            'C2', '{}'),
  ('10000000-0000-0000-0000-000000000005', 'DJI Mini 5 Pro',           'C0', '{}'),
  ('10000000-0000-0000-0000-000000000006', 'DJI Mavic 3 Multispectral','C2', '{multispectral}'),
  ('10000000-0000-0000-0000-000000000007', 'DJI Matrice 4T',           'C2', '{thermal}'),
  ('10000000-0000-0000-0000-000000000008', 'DJI Mavic 4 Pro',          'C2', '{}')
on conflict do nothing;
