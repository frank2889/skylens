import { NextResponse } from "next/server";
import { z } from "zod";
import { matchPilots } from "@/lib/matching";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

// Aanvraag-endpoint. Werkt in demo-modus (zonder Supabase) én in productie.
// In demo: valideren + matchen op seed-data, niets opslaan.
// In productie: best-effort opslaan in de 'requests'-tabel; faalt dit, dan
// blijft de respons gewoon ok zodat de demo/UX nooit breekt.
export const runtime = "nodejs";

// Spiegelt RequestInput uit @/lib/types. We accepteren 'citySlug'.
const RequestSchema = z.object({
  segment: z.string().min(1, "Kies een toepassing."),
  citySlug: z.string().min(1, "Kies een stad of regio."),
  date: z.string().optional(),
  budgetBand: z.string().optional(),
  details: z.string().max(4000).optional(),
  name: z.string().min(1, "Vul je naam in."),
  email: z.string().email("Vul een geldig e-mailadres in."),
  phone: z.string().max(40).optional(),
  company: z.string().max(200).optional(),
  marketingConsent: z.boolean(),
});

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Ongeldige JSON in de aanvraag." },
      { status: 400 },
    );
  }

  const parsed = RequestSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validatie mislukt.", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const body = parsed.data;

  // Deterministische matching (seed-data nu, PostGIS-query later).
  const matches = matchPilots(body.segment, body.citySlug);

  // Best-effort opslaan in productie. Mag de respons nooit 500'en.
  if (isSupabaseConfigured) {
    try {
      const supabase = await createClient();
      if (supabase) {
        await supabase.from("requests").insert({
          segment: body.segment,
          city_slug: body.citySlug,
          preferred_date: body.date ?? null,
          budget_band: body.budgetBand ?? null,
          details: body.details ?? null,
          contact_name: body.name,
          contact_email: body.email,
          contact_phone: body.phone ?? null,
          company: body.company ?? null,
          marketing_consent: body.marketingConsent,
          // De matching-snapshot helpt later bij lead-distributie.
          matched_pilots: matches.slice(0, 3).map((p) => p.slug),
        });
      }
    } catch {
      // Bewust geslikt: opslag-fouten mogen de aanvraag-flow niet breken.
    }
  }

  return NextResponse.json({
    ok: true,
    demo: !isSupabaseConfigured,
    matched: matches.map((p) => ({ slug: p.slug, name: p.name, city: p.citySlug })),
  });
}
