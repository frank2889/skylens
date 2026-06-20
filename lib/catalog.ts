import type { Segment, City, Package, Membership, LeadTier } from "./types";

// ── Toepassingen (use-cases / segments) ──────────────────────────────────────
export const SEGMENTS: Segment[] = [
  {
    slug: "vastgoed",
    name: "Vastgoed & makelaars",
    tagline: "Verkoop sneller met luchtfoto's",
    description:
      "Luchtfoto's en -video voor woningen, bedrijfspanden en nieuwbouw. Listings met luchtbeeld verkopen aantoonbaar sneller en trekken meer kijkers.",
    icon: "Home",
    deliverables: ["8–15 bewerkte foto's", "30–45s 4K-video", "Funda-klaar binnen 48u"],
    gear: "DJI Mini 5 Pro / Air 3S",
    priceFrom: 95,
    tier: "bronze",
    certHint: "A1/A3 + €1M verzekering",
  },
  {
    slug: "marketing",
    name: "Marketing & social video",
    tagline: "Content die de scroll stopt",
    description:
      "Cinematische bedrijfsvideo, social clips en FPV-beelden voor merken, hotels en bureaus. Verticale cuts voor Reels, TikTok en LinkedIn inbegrepen.",
    icon: "Clapperboard",
    deliverables: ["60–90s 4K/60 HDR film", "9:16 social-cut", "Volledige grade + muziek"],
    gear: "DJI Mavic 4 Pro",
    priceFrom: 249,
    tier: "silver",
    certHint: "A2 (dicht bij mensen)",
  },
  {
    slug: "inspectie",
    name: "Dak- & gevelinspectie",
    tagline: "Inspecteer zonder steiger",
    description:
      "Veilige, snelle inspectie van daken, gevels en schoorstenen. Hogeresolutiebeelden plus een helder rapport — zonder hoogwerker of valgevaar.",
    icon: "ScanSearch",
    deliverables: ["25–60 detailopnames", "Inspectierapport (PDF)", "Optioneel 3D-model"],
    gear: "DJI Matrice 4E",
    priceFrom: 149,
    tier: "gold",
    certHint: "A2 + verzekering",
  },
  {
    slug: "zonnepanelen",
    name: "Zonnepaneel & thermografie",
    tagline: "Vind defecte panelen vanuit de lucht",
    description:
      "Thermografische drone-inspectie van zonneparken en daken. Detecteer hotspots, defecte cellen en aansluitfouten met een radiometrisch rapport.",
    icon: "ThermometerSun",
    deliverables: ["Radiometrisch thermisch rapport", "Hotspot-markering", "Per-paneel overzicht"],
    gear: "Zenmuse H30T thermal",
    priceFrom: 495,
    tier: "gold",
    certHint: "A2/Specific + verzekering",
  },
  {
    slug: "bouw",
    name: "Bouw & infra",
    tagline: "Volg de voortgang van bovenaf",
    description:
      "Voortgangsmonitoring, terreinoverzichten en BIM-klare opnames voor bouwplaatsen en infrastructuur. Ideaal voor periodieke rapportage aan opdrachtgevers.",
    icon: "HardHat",
    deliverables: ["Voortgangsfoto's & -video", "Orthomosaïek", "Periodieke rapportage"],
    gear: "DJI Matrice 4E + RTK",
    priceFrom: 495,
    tier: "gold",
    certHint: "Specific/STS + verzekering",
  },
  {
    slug: "landmeten",
    name: "Landmeten & 3D-mapping",
    tagline: "Centimeter-nauwkeurige data",
    description:
      "Topografische karteringen, orthomosaïeken, hoogtemodellen en LiDAR-puntwolken met RTK-nauwkeurigheid voor landmeters en ingenieurs.",
    icon: "Map",
    deliverables: ["Orthomosaïek + DSM/DTM", "Geclassificeerde LiDAR-puntwolk", "Volume-berekeningen"],
    gear: "Matrice 400 + Zenmuse L2",
    priceFrom: 1500,
    tier: "platinum",
    certHint: "Specific/STS + RTK",
  },
  {
    slug: "evenementen",
    name: "Evenementen & bruiloften",
    tagline: "Het grote plaatje, vastgelegd",
    description:
      "Sfeervolle luchtbeelden van festivals, sportevenementen en bruiloften. Een spectaculaire opening of afsluiter voor je aftermovie.",
    icon: "PartyPopper",
    deliverables: ["Luchtbeelden 4K", "Aftermovie-cut", "Foto-highlights"],
    gear: "DJI Mavic 4 Pro",
    priceFrom: 350,
    tier: "silver",
    certHint: "A2 + verzekering",
  },
  {
    slug: "agrarisch",
    name: "Agrarisch",
    tagline: "Inzicht in elk perceel",
    description:
      "Gewasmonitoring, NDVI-kaarten en perceelinspectie voor telers en loonwerkers. Spot stress, droogte en ziekte vroeg.",
    icon: "Sprout",
    deliverables: ["NDVI-/multispectraalkaart", "Perceelrapport", "Probleemzones gemarkeerd"],
    gear: "DJI Mavic 3 Multispectral",
    priceFrom: 295,
    tier: "gold",
    certHint: "A2/Specific + verzekering",
  },
];

export function getSegment(slug: string): Segment | undefined {
  return SEGMENTS.find((s) => s.slug === slug);
}

// ── Steden (voor programmatische SEO) ────────────────────────────────────────
export const CITIES: City[] = [
  { slug: "amsterdam", name: "Amsterdam", province: "Noord-Holland", region: "Randstad", inhabitants: 921000 },
  { slug: "rotterdam", name: "Rotterdam", province: "Zuid-Holland", region: "Randstad", inhabitants: 656000 },
  { slug: "den-haag", name: "Den Haag", province: "Zuid-Holland", region: "Randstad", inhabitants: 549000 },
  { slug: "utrecht", name: "Utrecht", province: "Utrecht", region: "Randstad", inhabitants: 361000 },
  { slug: "eindhoven", name: "Eindhoven", province: "Noord-Brabant", region: "Brabant", inhabitants: 238000 },
  { slug: "groningen", name: "Groningen", province: "Groningen", region: "Noord", inhabitants: 234000 },
  { slug: "tilburg", name: "Tilburg", province: "Noord-Brabant", region: "Brabant", inhabitants: 224000 },
  { slug: "almere", name: "Almere", province: "Flevoland", region: "Randstad", inhabitants: 218000 },
  { slug: "breda", name: "Breda", province: "Noord-Brabant", region: "Brabant", inhabitants: 184000 },
  { slug: "nijmegen", name: "Nijmegen", province: "Gelderland", region: "Oost", inhabitants: 179000 },
  { slug: "haarlem", name: "Haarlem", province: "Noord-Holland", region: "Randstad", inhabitants: 162000 },
  { slug: "arnhem", name: "Arnhem", province: "Gelderland", region: "Oost", inhabitants: 165000 },
  { slug: "amersfoort", name: "Amersfoort", province: "Utrecht", region: "Randstad", inhabitants: 159000 },
  { slug: "zaanstad", name: "Zaanstad", province: "Noord-Holland", region: "Randstad", inhabitants: 157000 },
  { slug: "den-bosch", name: "'s-Hertogenbosch", province: "Noord-Brabant", region: "Brabant", inhabitants: 157000 },
  { slug: "apeldoorn", name: "Apeldoorn", province: "Gelderland", region: "Oost", inhabitants: 165000 },
  { slug: "enschede", name: "Enschede", province: "Overijssel", region: "Oost", inhabitants: 161000 },
  { slug: "leiden", name: "Leiden", province: "Zuid-Holland", region: "Randstad", inhabitants: 127000 },
  { slug: "maastricht", name: "Maastricht", province: "Limburg", region: "Zuid", inhabitants: 122000 },
  { slug: "zwolle", name: "Zwolle", province: "Overijssel", region: "Oost", inhabitants: 131000 },
  { slug: "delft", name: "Delft", province: "Zuid-Holland", region: "Randstad", inhabitants: 104000 },
  { slug: "alkmaar", name: "Alkmaar", province: "Noord-Holland", region: "Randstad", inhabitants: 110000 },
];

export function getCity(slug: string): City | undefined {
  return CITIES.find((c) => c.slug === slug);
}

// ── Pakketten (klantgericht) ─────────────────────────────────────────────────
export const PACKAGES: Package[] = [
  {
    tier: "bronze",
    name: "Brons",
    oneLiner: "Op de markt.",
    priceLabel: "€95 – €199",
    priceFrom: 95,
    useCase: "Vastgoedlisting, snelle social proof, basis vastlegging",
    gear: "DJI Mini 5 Pro / Air 3S (sub-250g)",
    photos: "8–15 bewerkte foto's",
    video: "30–45s, 4K/30",
    technical: "—",
    turnaround: "48 uur",
    certRequired: "A1/A3 + €1M verzekering",
  },
  {
    tier: "silver",
    name: "Zilver",
    oneLiner: "Val op.",
    priceLabel: "€249 – €549",
    priceFrom: 249,
    useCase: "Premium vastgoed, hospitality, merk- & social content",
    gear: "DJI Mavic 4 Pro (C2)",
    photos: "20–35 bewerkte foto's",
    video: "60–90s, 4K/60 HDR + 9:16 social-cut",
    technical: "Volledige grade, muziek, titels",
    turnaround: "72 uur",
    certRequired: "A2 (dicht bij mensen)",
    highlight: true,
  },
  {
    tier: "gold",
    name: "Goud",
    oneLiner: "Data & techniek.",
    priceLabel: "€495 – €2.500",
    priceFrom: 495,
    useCase: "Inspectie, bouwvoortgang, landmeten, thermografie",
    gear: "Matrice 4E/4T · Zenmuse L2 / H30T",
    photos: "25–60 foto's + technische opnames",
    video: "Optioneel 60–90s site-clip",
    technical: "Orthomosaïek / 3D / thermisch rapport",
    turnaround: "3–5 werkdagen",
    certRequired: "A2 + vaak Specific/STS + RTK",
  },
  {
    tier: "platinum",
    name: "Platinum",
    oneLiner: "Cinema / mission-grade.",
    priceLabel: "€2.500 – €15.000+",
    priceFrom: 2500,
    useCase: "Merkfilms, commercials, LiDAR-survey, multi-day",
    gear: "DJI Inspire 3 (8K) · Matrice 400 + LiDAR",
    photos: "Onbeperkt, gegraded",
    video: "1–3 min film, tot 8K RAW",
    technical: "Geclassificeerde LiDAR-puntwolk + DTM/DSM",
    turnaround: "5–15 werkdagen",
    certRequired: "Specific/STS · 2-koppige crew · SORA/LUC",
  },
];

// ── Pilotenlidmaatschappen ───────────────────────────────────────────────────
export const MEMBERSHIPS: Membership[] = [
  {
    key: "free",
    name: "Free",
    price: "€0",
    priceSub: "altijd gratis",
    forWho: "Nieuwe & parttime piloten",
    leadModifier: "basisprijs +25%",
    commission: "15% commissie",
    perks: [
      "Basisprofiel in de gids",
      "Brons + Zilver leads (2u vertraagd)",
      "Max 5 leads per maand",
      "Badge 'Geregistreerd'",
    ],
  },
  {
    key: "pro",
    name: "Pro",
    price: "€39",
    priceSub: "per maand",
    forWho: "Actieve fulltime piloten — de kern",
    leadModifier: "basisprijs",
    commission: "10% commissie",
    perks: [
      "Uitgebreid profiel + portfolio",
      "Alle leads, real-time, ongelimiteerd",
      "Badge 'Geverifieerd Pro'",
      "€25 leadtegoed per maand",
    ],
    highlight: true,
  },
  {
    key: "elite",
    name: "Elite",
    price: "€129",
    priceSub: "per maand",
    forWho: "High-volume & B2B-specialisten",
    leadModifier: "basisprijs −25%",
    commission: "7% commissie",
    perks: [
      "Uitgelicht, bovenaan gerankt",
      "15 min voorsprong op nieuwe leads",
      "Eerste keus op exclusieve Goud/Platinum leads",
      "Footage-bonus + snellere uitbetaling",
    ],
  },
];

// ── Leadprijzen per job-tier ─────────────────────────────────────────────────
export const LEAD_TIERS: LeadTier[] = [
  { tier: "bronze", jobValue: "€95 – €199", leadPrice: "€6 – €12", exclusivity: "Gedeeld (max 3)" },
  { tier: "silver", jobValue: "€249 – €549", leadPrice: "€18 – €30", exclusivity: "Gedeeld (max 3)" },
  { tier: "gold", jobValue: "€495 – €2.500", leadPrice: "€45 – €90", exclusivity: "Semi-exclusief (max 2)" },
  { tier: "platinum", jobValue: "€2.500+", leadPrice: "€120 – €250", exclusivity: "Exclusief (1 piloot)" },
];

export const BUDGET_BANDS = [
  "< €250",
  "€250 – €500",
  "€500 – €1.000",
  "€1.000 – €2.500",
  "€2.500 – €5.000",
  "€5.000+",
  "Weet ik nog niet",
];
