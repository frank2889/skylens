import { NextResponse } from "next/server";
import Stripe from "stripe";

// Stripe webhook-scaffold. Compileert en draait in demo-modus zonder keys.
//
// Productie-flow:
//  - Stripe stuurt events naar dit endpoint. We MOETEN de ruwe body lezen
//    (req.text()) om de handtekening te kunnen verifiëren — niet req.json().
//  - Verifieer met STRIPE_WEBHOOK_SECRET via stripe.webhooks.constructEvent.
//  - Verwerk relevante events:
//      * checkout.session.completed -> leadtegoed bijschrijven OF de gekochte
//        lead vrijgeven (contactgegevens) / een boeking als 'paid' markeren.
//      * payment_intent.succeeded   -> idem als bevestiging.
//      * account.updated            -> Stripe Connect-status van de piloot.
export const runtime = "nodejs";

// Stripe alleen instantiëren als er een secret key is, anders blijft de
// build/demo werken zonder env. apiVersion volgt de geïnstalleerde SDK.
const stripeSecret = process.env.STRIPE_SECRET_KEY;
const stripe = stripeSecret ? new Stripe(stripeSecret) : null;

export async function POST(req: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  // Demo-modus: geen secret -> bevestig ontvangst, doe verder niets.
  if (!webhookSecret || !stripe) {
    return NextResponse.json({ received: true, demo: true });
  }

  // Ruwe body is vereist voor handtekening-verificatie.
  const rawBody = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { received: false, error: "Ontbrekende stripe-signature header." },
      { status: 400 },
    );
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "onbekende fout";
    return NextResponse.json(
      { received: false, error: `Handtekening ongeldig: ${message}` },
      { status: 400 },
    );
  }

  switch (event.type) {
    case "checkout.session.completed": {
      // const session = event.data.object as Stripe.Checkout.Session;
      // TODO: leadtegoed bijschrijven of lead/boeking als betaald markeren
      // op basis van session.metadata (bijv. { requestId, pilotId, kind }).
      break;
    }
    case "payment_intent.succeeded": {
      // TODO: bevestig betaling indien niet al via checkout.session afgehandeld.
      break;
    }
    case "account.updated": {
      // TODO: synchroniseer Stripe Connect onboarding-status van de piloot.
      break;
    }
    default:
      // Overige events negeren we bewust.
      break;
  }

  return NextResponse.json({ received: true });
}
