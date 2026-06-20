import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { SUPABASE_URL, SUPABASE_ANON_KEY, isSupabaseConfigured } from "@/lib/supabase/config";

// Vernieuwt de Supabase-sessie bij elke request wanneer auth geconfigureerd is.
// In demo-modus (geen env) doet de middleware niets en laat alles door.
export async function middleware(request: NextRequest) {
  // Demo-modus: geen Supabase -> geen sessie om te vernieuwen.
  if (!isSupabaseConfigured) {
    return NextResponse.next();
  }

  // Begin met een doorlaat-respons; de cookie-bridge schrijft hier eventueel
  // vernieuwde sessie-cookies op (standaard Next + Supabase patroon).
  let response = NextResponse.next({ request });

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) {
        // Schrijf naar het request (voor downstream handlers) én de respons
        // (terug naar de browser).
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  // BELANGRIJK: roep getUser() aan zodat het token wordt vernieuwd. Niets
  // tussen createServerClient en getUser plaatsen (Supabase-aanbeveling).
  await supabase.auth.getUser();

  return response;
}

export const config = {
  // Laat statische assets, favicon en de Stripe-webhook (ruwe body!) met rust.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/stripe/webhook|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)",
  ],
};
