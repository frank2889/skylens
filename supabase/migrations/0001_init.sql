-- ============================================================================
-- Skylens — initial schema (0001_init)
-- NL-first dronepiloot lead-marktplaats.
--
-- Ontwerp: EASA-core + per-land adapter.
--   De kern (profiles, pilots, certifications, drones, requests, leads,
--   bookings, reviews, media_assets) is EASA-breed (geldt EU-breed). Land-
--   specifieke regels (bv. NL RDW-exploitantnummer, lokale verzekeringseisen)
--   leven in de 'country' kolommen + losse adapter-tabellen die je later per
--   markt toevoegt. Zo blijft uitbreiden naar BE/DE een additieve migratie.
--
-- Draaien op Supabase: plak in de SQL Editor of gebruik `supabase db push`.
-- Veilig om in één keer uit te voeren (idempotente guards waar zinnig).
-- ============================================================================

-- gen_random_uuid() komt uit pgcrypto (standaard aanwezig op Supabase).
create extension if not exists "pgcrypto";

-- ── Enums ───────────────────────────────────────────────────────────────────
do $$ begin
  create type user_role as enum ('client', 'pilot', 'admin');
exception when duplicate_object then null; end $$;

do $$ begin
  create type pilot_tier as enum ('bronze', 'silver', 'gold', 'platinum');
exception when duplicate_object then null; end $$;

do $$ begin
  create type membership_key as enum ('free', 'pro', 'elite');
exception when duplicate_object then null; end $$;

do $$ begin
  create type cert_level as enum ('a1_a3', 'a2', 'sts_01', 'sts_02', 'operational_auth');
exception when duplicate_object then null; end $$;

do $$ begin
  create type request_status as enum ('new', 'matched', 'closed', 'spam');
exception when duplicate_object then null; end $$;

do $$ begin
  create type lead_status as enum ('offered', 'purchased', 'won', 'lost', 'expired');
exception when duplicate_object then null; end $$;

do $$ begin
  create type booking_status as enum ('pending', 'confirmed', 'in_progress', 'delivered', 'paid', 'cancelled');
exception when duplicate_object then null; end $$;

-- ── updated_at trigger helper ────────────────────────────────────────────────
create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ============================================================================
-- profiles — 1:1 met auth.users. Rol bepaalt client/pilot/admin.
-- ============================================================================
create table if not exists profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  role        user_role   not null default 'client',
  full_name   text,
  email       text,
  phone       text,
  company     text,
  country     text        not null default 'NL',   -- EASA-core + land-adapter
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

drop trigger if exists trg_profiles_updated_at on profiles;
create trigger trg_profiles_updated_at
  before update on profiles
  for each row execute function set_updated_at();

-- ============================================================================
-- pilots — pilotenprofiel (1:1 met een profile met rol 'pilot').
-- ============================================================================
create table if not exists pilots (
  id                uuid primary key default gen_random_uuid(),
  profile_id        uuid not null unique references profiles (id) on delete cascade,
  slug              text not null unique,
  name              text not null,
  company           text,
  city_slug         text,
  region            text,
  province          text,
  country           text not null default 'NL',          -- adapter-dimensie
  tier              pilot_tier     not null default 'bronze',
  membership        membership_key not null default 'free',
  -- NL-adapter: RDW-exploitantnummer (gemaskeerd getoond in de UI).
  operator_id       text,
  insured           boolean not null default false,
  insurance_amount  integer,                              -- in euro's
  verified          boolean not null default false,       -- handmatig door admin
  published         boolean not null default false,       -- zichtbaar in de gids
  service_radius_km integer not null default 40,
  -- Geolocatie voor latere PostGIS/afstandsmatching (lon/lat losse kolommen
  -- nu; PostGIS geometry kan in een latere migratie additief worden gezet).
  base_lat          double precision,
  base_lng          double precision,
  -- Welke toepassingen (segment-slugs) en capabilities deze piloot dekt.
  segments          text[] not null default '{}',
  capabilities      text[] not null default '{}',
  gear              text[] not null default '{}',
  bio               text,
  rating            numeric(2,1) not null default 0,      -- gecachte review-avg
  review_count      integer not null default 0,
  jobs_done         integer not null default 0,
  response_time     text,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

drop trigger if exists trg_pilots_updated_at on pilots;
create trigger trg_pilots_updated_at
  before update on pilots
  for each row execute function set_updated_at();

-- GIN-indexen voor array-overlap matching (segment + capability filters).
create index if not exists idx_pilots_segments     on pilots using gin (segments);
create index if not exists idx_pilots_capabilities on pilots using gin (capabilities);
create index if not exists idx_pilots_region       on pilots (region);
create index if not exists idx_pilots_city         on pilots (city_slug);
-- Snel de publieke gids ophalen (geverifieerd + gepubliceerd).
create index if not exists idx_pilots_published    on pilots (published, verified);

-- ============================================================================
-- certifications — EASA-certificaten per piloot, met vervaldatum.
-- ============================================================================
create table if not exists certifications (
  id          uuid primary key default gen_random_uuid(),
  pilot_id    uuid not null references pilots (id) on delete cascade,
  level       cert_level not null,
  -- Document-bewijs in Storage (private bucket); admin verifieert handmatig.
  document_url text,
  verified    boolean not null default false,
  issued_at   date,
  expires_at  date,                                       -- voor verloop-alerts
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  unique (pilot_id, level)
);

drop trigger if exists trg_certifications_updated_at on certifications;
create trigger trg_certifications_updated_at
  before update on certifications
  for each row execute function set_updated_at();

create index if not exists idx_certifications_pilot   on certifications (pilot_id);
create index if not exists idx_certifications_expires on certifications (expires_at);

-- ============================================================================
-- drones — materieel per piloot (C-klasse relevant voor EASA-categorie).
-- ============================================================================
create table if not exists drones (
  id          uuid primary key default gen_random_uuid(),
  pilot_id    uuid not null references pilots (id) on delete cascade,
  model       text not null,
  c_class     text,                                       -- C0..C6 (EASA)
  weight_g    integer,
  payloads    text[] not null default '{}',               -- bv. thermal, LiDAR, RTK
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

drop trigger if exists trg_drones_updated_at on drones;
create trigger trg_drones_updated_at
  before update on drones
  for each row execute function set_updated_at();

create index if not exists idx_drones_pilot on drones (pilot_id);

-- ============================================================================
-- requests — klantaanvragen. client_id mag null zijn (gast-aanvraag).
-- ============================================================================
create table if not exists requests (
  id                uuid primary key default gen_random_uuid(),
  client_id         uuid references profiles (id) on delete set null, -- nullable (gast)
  segment           text not null,
  city_slug         text,
  region            text,
  preferred_date    date,
  budget_band       text,
  details           text,
  -- Contactgegevens: GEVOELIG. Alleen zichtbaar voor de eigenaar/admin, of
  -- voor een piloot die de bijbehorende lead heeft gekocht (zie RLS onderaan).
  contact_name      text not null,
  contact_email     text not null,
  contact_phone     text,
  company           text,
  marketing_consent boolean not null default false,
  status            request_status not null default 'new',
  max_pilots        integer not null default 3,           -- exclusiviteits-cap
  matched_pilots    text[] not null default '{}',         -- snapshot van slugs
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

drop trigger if exists trg_requests_updated_at on requests;
create trigger trg_requests_updated_at
  before update on requests
  for each row execute function set_updated_at();

create index if not exists idx_requests_client  on requests (client_id);
create index if not exists idx_requests_segment on requests (segment);
create index if not exists idx_requests_status  on requests (status);
create index if not exists idx_requests_created on requests (created_at desc);

-- ============================================================================
-- leads — een aanvraag aangeboden aan / gekocht door een piloot.
-- Uniek per (request, pilot): een piloot koopt een lead hooguit één keer.
-- ============================================================================
create table if not exists leads (
  id          uuid primary key default gen_random_uuid(),
  request_id  uuid not null references requests (id) on delete cascade,
  pilot_id    uuid not null references pilots (id) on delete cascade,
  status      lead_status not null default 'offered',
  price_cents integer,                                    -- leadprijs (ex BTW)
  -- Stripe-koppeling voor de unlock-betaling.
  stripe_payment_intent text,
  purchased_at timestamptz,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  unique (request_id, pilot_id)
);

drop trigger if exists trg_leads_updated_at on leads;
create trigger trg_leads_updated_at
  before update on leads
  for each row execute function set_updated_at();

create index if not exists idx_leads_pilot   on leads (pilot_id);
create index if not exists idx_leads_request on leads (request_id);
create index if not exists idx_leads_status  on leads (status);

-- ============================================================================
-- bookings — een gewonnen lead die een betaalde opdracht wordt.
-- ============================================================================
create table if not exists bookings (
  id              uuid primary key default gen_random_uuid(),
  lead_id         uuid unique references leads (id) on delete set null,
  request_id      uuid references requests (id) on delete set null,
  pilot_id        uuid not null references pilots (id) on delete cascade,
  client_id       uuid references profiles (id) on delete set null,
  status          booking_status not null default 'pending',
  amount_cents    integer,                                -- opdrachtwaarde ex BTW
  commission_cents integer,                               -- Skylens-commissie
  scheduled_for   date,
  delivered_at    timestamptz,
  stripe_checkout_session text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

drop trigger if exists trg_bookings_updated_at on bookings;
create trigger trg_bookings_updated_at
  before update on bookings
  for each row execute function set_updated_at();

create index if not exists idx_bookings_pilot  on bookings (pilot_id);
create index if not exists idx_bookings_client on bookings (client_id);
create index if not exists idx_bookings_status on bookings (status);

-- ============================================================================
-- reviews — één review per boeking. Publiek leesbaar wanneer published.
-- ============================================================================
create table if not exists reviews (
  id          uuid primary key default gen_random_uuid(),
  booking_id  uuid not null unique references bookings (id) on delete cascade,
  pilot_id    uuid not null references pilots (id) on delete cascade,
  author_id   uuid references profiles (id) on delete set null,
  author_name text,
  author_role text,
  city        text,
  rating      integer not null check (rating between 1 and 5),
  text        text,
  published   boolean not null default false,             -- admin/auto-moderatie
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

drop trigger if exists trg_reviews_updated_at on reviews;
create trigger trg_reviews_updated_at
  before update on reviews
  for each row execute function set_updated_at();

create index if not exists idx_reviews_pilot     on reviews (pilot_id);
create index if not exists idx_reviews_published on reviews (published);

-- ============================================================================
-- media_assets — footage/portfolio in Storage. Showcase vereist consent.
-- ============================================================================
create table if not exists media_assets (
  id                    uuid primary key default gen_random_uuid(),
  pilot_id              uuid not null references pilots (id) on delete cascade,
  booking_id            uuid references bookings (id) on delete set null,
  segment               text,
  city_slug             text,
  storage_path          text not null,                    -- pad in bucket 'footage'
  is_video              boolean not null default false,
  title                 text,
  -- Showcase-toestemming van de klant — alleen dan publiek tonen.
  is_showcase_consented boolean not null default false,
  published             boolean not null default false,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

drop trigger if exists trg_media_assets_updated_at on media_assets;
create trigger trg_media_assets_updated_at
  before update on media_assets
  for each row execute function set_updated_at();

create index if not exists idx_media_pilot     on media_assets (pilot_id);
create index if not exists idx_media_showcase  on media_assets (published, is_showcase_consented);

-- ============================================================================
-- Row Level Security
-- RLS aan op alle tabellen. Policies hieronder zijn een veilige startset;
-- schrijf-acties op gevoelige tabellen (leads/bookings/verificatie) lopen in
-- productie bij voorkeur via de service-role (server) i.p.v. de anon-client.
-- ============================================================================
alter table profiles       enable row level security;
alter table pilots         enable row level security;
alter table certifications enable row level security;
alter table drones         enable row level security;
alter table requests       enable row level security;
alter table leads          enable row level security;
alter table bookings       enable row level security;
alter table reviews        enable row level security;
alter table media_assets   enable row level security;

-- Helper: is de huidige user admin?
create or replace function is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from profiles p
    where p.id = auth.uid() and p.role = 'admin'
  );
$$;

-- Helper: pilot-id van de ingelogde gebruiker (null als geen piloot).
create or replace function current_pilot_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select pl.id from pilots pl
  join profiles pr on pr.id = pl.profile_id
  where pr.id = auth.uid()
  limit 1;
$$;

-- ── profiles ─────────────────────────────────────────────────────────────────
drop policy if exists profiles_self_read on profiles;
create policy profiles_self_read on profiles
  for select using (id = auth.uid() or is_admin());

drop policy if exists profiles_self_update on profiles;
create policy profiles_self_update on profiles
  for update using (id = auth.uid()) with check (id = auth.uid());

drop policy if exists profiles_self_insert on profiles;
create policy profiles_self_insert on profiles
  for insert with check (id = auth.uid());

-- ── pilots ───────────────────────────────────────────────────────────────────
-- Wereld-leesbaar: alleen gepubliceerde, geverifieerde piloten (de gids).
drop policy if exists pilots_public_read on pilots;
create policy pilots_public_read on pilots
  for select using (published and verified);

-- Eigen profiel altijd leesbaar/bewerkbaar (ook ongepubliceerd).
drop policy if exists pilots_owner_read on pilots;
create policy pilots_owner_read on pilots
  for select using (profile_id = auth.uid() or is_admin());

drop policy if exists pilots_owner_write on pilots;
create policy pilots_owner_write on pilots
  for update using (profile_id = auth.uid()) with check (profile_id = auth.uid());

drop policy if exists pilots_owner_insert on pilots;
create policy pilots_owner_insert on pilots
  for insert with check (profile_id = auth.uid());

-- ── certifications ── piloot leest/bewerkt eigen certs; admin alles. ──────────
drop policy if exists certs_owner_all on certifications;
create policy certs_owner_all on certifications
  for all using (pilot_id = current_pilot_id() or is_admin())
  with check (pilot_id = current_pilot_id() or is_admin());

-- ── drones ── idem aan certs. ────────────────────────────────────────────────
drop policy if exists drones_owner_all on drones;
create policy drones_owner_all on drones
  for all using (pilot_id = current_pilot_id() or is_admin())
  with check (pilot_id = current_pilot_id() or is_admin());

-- ── requests ─────────────────────────────────────────────────────────────────
-- Gast-aanvragen komen binnen via de server-route (service-role). Anon-insert
-- staan we toe zodat het formulier ook zonder login werkt.
drop policy if exists requests_anon_insert on requests;
create policy requests_anon_insert on requests
  for insert with check (true);

-- Eigenaar (de klant) en admin mogen de hele aanvraag (incl. contact) zien.
drop policy if exists requests_owner_read on requests;
create policy requests_owner_read on requests
  for select using (client_id = auth.uid() or is_admin());

-- BELANGRIJK: een piloot mag de contactvelden alleen zien via een GEKOCHTE
-- lead. We bieden dat veilig aan via de SECURITY DEFINER functie hieronder
-- i.p.v. een directe SELECT-policy op 'requests' (zo lekt e-mail/telefoon
-- nooit voordat de lead betaald is).
drop policy if exists requests_pilot_no_direct_read on requests;
-- (Bewust geen pilot-select-policy: piloten halen contact op via get_request_contact.)

-- ── leads ── piloot ziet/bewerkt eigen leads; admin alles. ───────────────────
drop policy if exists leads_pilot_read on leads;
create policy leads_pilot_read on leads
  for select using (pilot_id = current_pilot_id() or is_admin());

drop policy if exists leads_pilot_write on leads;
create policy leads_pilot_write on leads
  for update using (pilot_id = current_pilot_id() or is_admin())
  with check (pilot_id = current_pilot_id() or is_admin());

-- ── bookings ── betrokken piloot of klant, plus admin. ───────────────────────
drop policy if exists bookings_party_read on bookings;
create policy bookings_party_read on bookings
  for select using (
    pilot_id = current_pilot_id() or client_id = auth.uid() or is_admin()
  );

-- ── reviews ── gepubliceerde reviews wereld-leesbaar; auteur ziet eigen. ─────
drop policy if exists reviews_public_read on reviews;
create policy reviews_public_read on reviews
  for select using (published or author_id = auth.uid() or is_admin());

drop policy if exists reviews_author_insert on reviews;
create policy reviews_author_insert on reviews
  for insert with check (author_id = auth.uid());

-- ── media_assets ── publiek alleen met consent + published; eigenaar alles. ──
drop policy if exists media_public_read on media_assets;
create policy media_public_read on media_assets
  for select using (
    (published and is_showcase_consented)
    or pilot_id = current_pilot_id()
    or is_admin()
  );

drop policy if exists media_owner_write on media_assets;
create policy media_owner_write on media_assets
  for all using (pilot_id = current_pilot_id() or is_admin())
  with check (pilot_id = current_pilot_id() or is_admin());

-- ============================================================================
-- get_request_contact — geef contactgegevens alleen vrij aan een piloot die
-- de bijbehorende lead heeft gekocht. SECURITY DEFINER omzeilt RLS gecontro-
-- leerd: we checken zelf de gekochte lead. Dit is de "contact only via a
-- purchased lead" garantie.
-- ============================================================================
create or replace function get_request_contact(p_request_id uuid)
returns table (contact_name text, contact_email text, contact_phone text, company text)
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_pilot uuid := current_pilot_id();
begin
  if v_pilot is null and not is_admin() then
    raise exception 'Geen toegang.';
  end if;

  if not is_admin() then
    if not exists (
      select 1 from leads l
      where l.request_id = p_request_id
        and l.pilot_id = v_pilot
        and l.status in ('purchased', 'won')
    ) then
      raise exception 'Contactgegevens zijn nog niet vrijgegeven (lead niet gekocht).';
    end if;
  end if;

  return query
    select r.contact_name, r.contact_email, r.contact_phone, r.company
    from requests r
    where r.id = p_request_id;
end;
$$;
