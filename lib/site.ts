// Single source of truth for brand + nav. Change `name` once to rebrand everywhere.

export const SITE = {
  name: "Skylens",
  domain: "skylens.nl",
  tagline: "De juiste dronepiloot. Vandaag geregeld.",
  description:
    "Plaats je aanvraag en wij koppelen je aan een geverifieerde, verzekerde, EASA-gecertificeerde dronepiloot bij jou in de buurt. Vaste prijzen, levering binnen 48–72 uur.",
  email: "hallo@skylens.nl",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  coords: "52.37°N 04.90°E",
} as const;

export const MAIN_NAV = [
  { label: "Hoe het werkt", href: "/hoe-het-werkt" },
  { label: "Toepassingen", href: "/toepassingen" },
  { label: "Pakketten", href: "/pakketten" },
  { label: "Showcase", href: "/showcase" },
  { label: "Piloten", href: "/piloten" },
] as const;

export const FOOTER_NAV: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Voor klanten",
    links: [
      { label: "Hoe het werkt", href: "/hoe-het-werkt" },
      { label: "Pakketten & prijzen", href: "/pakketten" },
      { label: "Plaats een aanvraag", href: "/aanvraag" },
      { label: "Showcase", href: "/showcase" },
    ],
  },
  {
    title: "Voor piloten",
    links: [
      { label: "Word piloot", href: "/voor-piloten" },
      { label: "Hoe leads werken", href: "/voor-piloten#leads" },
      { label: "Lidmaatschappen", href: "/voor-piloten#lidmaatschap" },
      { label: "Inloggen", href: "/login" },
    ],
  },
  {
    title: "Toepassingen",
    links: [
      { label: "Vastgoed & makelaars", href: "/toepassingen/vastgoed" },
      { label: "Marketing & social", href: "/toepassingen/marketing" },
      { label: "Dakinspectie", href: "/toepassingen/inspectie" },
      { label: "Landmeten & 3D", href: "/toepassingen/landmeten" },
    ],
  },
  {
    title: "Bedrijf",
    links: [
      { label: "Over ons", href: "/over-ons" },
      { label: "Veelgestelde vragen", href: "/hoe-het-werkt#faq" },
      { label: "Privacy & AVG", href: "/privacy" },
      { label: "Voorwaarden", href: "/voorwaarden" },
    ],
  },
];
