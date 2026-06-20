import { NextResponse } from "next/server";
import { z } from "zod";

// Lead-unlock stub. Een piloot "koopt" hier toegang tot de contactgegevens
// achter een aanvraag (de lead). In demo-modus gebeurt er niets echts.
//
// Echte implementatie (zodra Stripe-keys staan):
//  1) Maak een Stripe Checkout Session (of trek af van leadtegoed/credits)
//     voor de leadprijs van het betreffende job-tier (zie LEAD_TIERS).
//  2) Bij betaling -> stripe webhook (app/api/stripe/webhook) markeert de
//     lead als 'purchased' en geeft de piloot de contactgegevens vrij
//     (RLS: contactvelden alleen zichtbaar via een gekochte lead).
//  3) Respecteer exclusiviteit per tier (max 1/2/3 piloten).
export const runtime = "nodejs";

const LeadSchema = z.object({
  requestId: z.string().min(1, "requestId is verplicht."),
  pilotId: z.string().min(1, "pilotId is verplicht."),
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

  const parsed = LeadSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validatie mislukt.", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  return NextResponse.json({
    ok: true,
    demo: true,
    message: "Lead-unlock loopt via Stripe zodra keys zijn gezet.",
  });
}
