# Supabase — Skylens

Korte gids om Skylens van demo-modus naar een werkende backend te brengen. De
publieke site werkt **zonder** Supabase (seed/demo-data). Zodra je de stappen
hieronder doorloopt, activeren login, het opslaan van aanvragen en betalingen.

## 1. Project aanmaken (EU / Frankfurt)

1. Ga naar [supabase.com](https://supabase.com) en maak een nieuw project.
2. Kies regio **EU (Frankfurt) — `eu-central-1`**. Belangrijk voor AVG/GDPR:
   alle data van NL-klanten en piloten blijft binnen de EU.
3. Bewaar het database-wachtwoord veilig.

## 2. Migratie + seed draaien

**Via de SQL Editor (snelst):**

1. Open **SQL Editor** in het Supabase-dashboard.
2. Plak en run de inhoud van `supabase/migrations/0001_init.sql`.
3. Plak en run daarna `supabase/seed.sql` voor demo-piloten en certificaten.

**Of via de Supabase CLI:**

```bash
supabase link --project-ref <jouw-project-ref>
supabase db push          # voert de migraties in supabase/migrations uit
psql "$DATABASE_URL" -f supabase/seed.sql   # optioneel: demo-data
```

De migratie zet enums, alle tabellen, indexen (incl. **GIN** op
`pilots.segments` / `pilots.capabilities`), `updated_at`-triggers en **RLS met
policies** op. Gevoelige contactvelden van een aanvraag zijn voor een piloot
alleen op te halen via de functie `get_request_contact()` — en die geeft pas
gegevens vrij nadat de bijbehorende **lead is gekocht**.

## 3. Keys in `.env.local`

Kopieer `.env.example` naar `.env.local` en vul in (te vinden onder
**Project Settings → API**):

```
NEXT_PUBLIC_SUPABASE_URL=...        # Project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=...   # anon public key
SUPABASE_SERVICE_ROLE_KEY=...       # service_role (alleen server, nooit client)
```

Zodra `NEXT_PUBLIC_SUPABASE_URL` en `NEXT_PUBLIC_SUPABASE_ANON_KEY` staan,
schakelt de app automatisch over van demo- naar productie-modus
(zie `lib/supabase/config.ts → isSupabaseConfigured`). De middleware gaat dan
de sessie vernieuwen.

## 4. Auth inschakelen (magic link + Google)

Onder **Authentication → Providers**:

- **Email** → zet **Magic Link** aan (geen wachtwoorden nodig).
- **Google** → vul Client ID/Secret in vanuit de Google Cloud Console en zet de
  provider aan.
- Onder **URL Configuration**: zet **Site URL** op je domein (lokaal
  `http://localhost:3000`) en voeg redirect-URLs toe.

Tip: maak voor elke nieuwe gebruiker automatisch een rij in `profiles` aan via
een database-trigger op `auth.users`, of doe dit server-side bij eerste login.

## 5. Storage-bucket `footage` (private)

Onder **Storage → New bucket**:

- Naam: **`footage`**
- **Private** (niet public). Footage en portfolio-bestanden zijn vertrouwelijk.
- Lever beelden uit via **signed URLs** vanuit de server.
- Showcase-materiaal toon je publiek alleen wanneer
  `media_assets.is_showcase_consented = true` én `published = true` (de RLS-
  policy dekt dit al af).

## 6. Stripe & Resend keys

In `.env.local` (zie `.env.example`):

```
STRIPE_SECRET_KEY=...                  # server: Checkout + Connect
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=... # client
STRIPE_WEBHOOK_SECRET=...              # verifieert app/api/stripe/webhook
RESEND_API_KEY=...                     # transactionele e-mail / lead-alerts
RESEND_FROM="Skylens <noreply@skylens.nl>"
```

- **Stripe**: gebruikt voor lead-credits / lead-unlock (Checkout) en later
  Connect voor commissie-afdracht. De webhook schrijft leadtegoed bij of
  markeert een boeking als betaald (`checkout.session.completed`). Zonder
  `STRIPE_WEBHOOK_SECRET` antwoordt de webhook met `{ received: true, demo:
  true }`.
- **Resend**: stuurt aanvraag-bevestigingen aan klanten en lead-alerts aan
  piloten.

## EASA-core + per-land adapter

Het schema is opgezet als **EASA-core**: tabellen en certificaat-niveaus
(`a1_a3`, `a2`, `sts_01`, `sts_02`, `operational_auth`) gelden EU-breed.
Landspecifieke zaken leven in `country`-kolommen en losse adaptervelden — zoals
het Nederlandse RDW-exploitantnummer in `pilots.operator_id`. Uitbreiden naar
bijvoorbeeld België of Duitsland is daarmee een **additieve** migratie
(land-adapter-tabel + extra `country`-waarden), zonder de kern aan te raken.
