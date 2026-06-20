import type { Locale, Tier } from "@/lib/types";
import { DEFAULT_LOCALE, isLocale } from "./config";

type Seg = { name: string; tagline: string; description: string; deliverables: string[] };

/** Translations for the segment catalog (lib/catalog.ts SEGMENTS are the NL source). */
export const SEGMENT_I18N: Record<string, Record<Locale, Seg>> = {
  vastgoed: {
    nl: { name: "Vastgoed & makelaars", tagline: "Verkoop sneller met luchtfoto's", description: "Luchtfoto's en -video voor woningen, bedrijfspanden en nieuwbouw. Listings met luchtbeeld verkopen aantoonbaar sneller en trekken meer kijkers.", deliverables: ["8–15 bewerkte foto's", "30–45s 4K-video", "Funda-klaar binnen 48u"] },
    en: { name: "Real estate & agents", tagline: "Sell faster with aerial shots", description: "Aerial photos and video for homes, commercial property and new-build. Listings with aerial imagery demonstrably sell faster and attract more viewers.", deliverables: ["8–15 edited photos", "30–45s 4K video", "Portal-ready within 48h"] },
    de: { name: "Immobilien & Makler", tagline: "Schneller verkaufen mit Luftaufnahmen", description: "Luftbilder und -videos für Wohn-, Gewerbe- und Neubauimmobilien. Inserate mit Luftaufnahmen verkaufen nachweislich schneller und ziehen mehr Interessenten an.", deliverables: ["8–15 bearbeitete Fotos", "30–45s 4K-Video", "Portalfertig in 48h"] },
  },
  marketing: {
    nl: { name: "Marketing & social video", tagline: "Content die de scroll stopt", description: "Cinematische bedrijfsvideo, social clips en FPV-beelden voor merken, hotels en bureaus. Verticale cuts voor Reels, TikTok en LinkedIn inbegrepen.", deliverables: ["60–90s 4K/60 HDR film", "9:16 social-cut", "Volledige grade + muziek"] },
    en: { name: "Marketing & social video", tagline: "Content that stops the scroll", description: "Cinematic brand video, social clips and FPV footage for brands, hotels and agencies. Vertical cuts for Reels, TikTok and LinkedIn included.", deliverables: ["60–90s 4K/60 HDR film", "9:16 social cut", "Full grade + music"] },
    de: { name: "Marketing & Social Video", tagline: "Content, der den Scroll stoppt", description: "Cinematische Markenvideos, Social Clips und FPV-Aufnahmen für Marken, Hotels und Agenturen. Vertikale Schnitte für Reels, TikTok und LinkedIn inklusive.", deliverables: ["60–90s 4K/60 HDR Film", "9:16 Social-Cut", "Vollständige Farbkorrektur + Musik"] },
  },
  inspectie: {
    nl: { name: "Dak- & gevelinspectie", tagline: "Inspecteer zonder steiger", description: "Veilige, snelle inspectie van daken, gevels en schoorstenen. Hogeresolutiebeelden plus een helder rapport — zonder hoogwerker of valgevaar.", deliverables: ["25–60 detailopnames", "Inspectierapport (PDF)", "Optioneel 3D-model"] },
    en: { name: "Roof & façade inspection", tagline: "Inspect without scaffolding", description: "Safe, fast inspection of roofs, façades and chimneys. High-resolution imagery plus a clear report — no cherry picker, no fall risk.", deliverables: ["25–60 detail shots", "Inspection report (PDF)", "Optional 3D model"] },
    de: { name: "Dach- & Fassadeninspektion", tagline: "Inspizieren ohne Gerüst", description: "Sichere, schnelle Inspektion von Dächern, Fassaden und Schornsteinen. Hochauflösende Aufnahmen plus klarer Bericht — ohne Hubsteiger, ohne Absturzrisiko.", deliverables: ["25–60 Detailaufnahmen", "Inspektionsbericht (PDF)", "Optional 3D-Modell"] },
  },
  zonnepanelen: {
    nl: { name: "Zonnepaneel & thermografie", tagline: "Vind defecte panelen vanuit de lucht", description: "Thermografische drone-inspectie van zonneparken en daken. Detecteer hotspots, defecte cellen en aansluitfouten met een radiometrisch rapport.", deliverables: ["Radiometrisch thermisch rapport", "Hotspot-markering", "Per-paneel overzicht"] },
    en: { name: "Solar & thermography", tagline: "Spot faulty panels from the air", description: "Thermographic drone inspection of solar farms and rooftops. Detect hotspots, faulty cells and wiring faults with a radiometric report.", deliverables: ["Radiometric thermal report", "Hotspot marking", "Per-panel overview"] },
    de: { name: "Solar & Thermografie", tagline: "Defekte Module aus der Luft finden", description: "Thermografische Drohneninspektion von Solarparks und Dächern. Erkennen Sie Hotspots, defekte Zellen und Anschlussfehler mit radiometrischem Bericht.", deliverables: ["Radiometrischer Wärmebericht", "Hotspot-Markierung", "Übersicht je Modul"] },
  },
  bouw: {
    nl: { name: "Bouw & infra", tagline: "Volg de voortgang van bovenaf", description: "Voortgangsmonitoring, terreinoverzichten en BIM-klare opnames voor bouwplaatsen en infrastructuur. Ideaal voor periodieke rapportage aan opdrachtgevers.", deliverables: ["Voortgangsfoto's & -video", "Orthomosaïek", "Periodieke rapportage"] },
    en: { name: "Construction & infrastructure", tagline: "Track progress from above", description: "Progress monitoring, site overviews and BIM-ready captures for construction sites and infrastructure. Ideal for periodic reporting to clients.", deliverables: ["Progress photos & video", "Orthomosaic", "Periodic reporting"] },
    de: { name: "Bau & Infrastruktur", tagline: "Den Fortschritt von oben verfolgen", description: "Fortschrittskontrolle, Geländeübersichten und BIM-fertige Aufnahmen für Baustellen und Infrastruktur. Ideal für die regelmäßige Berichterstattung an Auftraggeber.", deliverables: ["Fortschrittsfotos & -video", "Orthomosaik", "Regelmäßige Berichte"] },
  },
  landmeten: {
    nl: { name: "Landmeten & 3D-mapping", tagline: "Centimeter-nauwkeurige data", description: "Topografische karteringen, orthomosaïeken, hoogtemodellen en LiDAR-puntwolken met RTK-nauwkeurigheid voor landmeters en ingenieurs.", deliverables: ["Orthomosaïek + DSM/DTM", "Geclassificeerde LiDAR-puntwolk", "Volume-berekeningen"] },
    en: { name: "Surveying & 3D mapping", tagline: "Centimetre-accurate data", description: "Topographic surveys, orthomosaics, elevation models and LiDAR point clouds with RTK accuracy for surveyors and engineers.", deliverables: ["Orthomosaic + DSM/DTM", "Classified LiDAR point cloud", "Volume calculations"] },
    de: { name: "Vermessung & 3D-Mapping", tagline: "Zentimetergenaue Daten", description: "Topografische Vermessungen, Orthomosaike, Höhenmodelle und LiDAR-Punktwolken mit RTK-Genauigkeit für Vermesser und Ingenieure.", deliverables: ["Orthomosaik + DSM/DTM", "Klassifizierte LiDAR-Punktwolke", "Volumenberechnungen"] },
  },
  evenementen: {
    nl: { name: "Evenementen & bruiloften", tagline: "Het grote plaatje, vastgelegd", description: "Sfeervolle luchtbeelden van festivals, sportevenementen en bruiloften. Een spectaculaire opening of afsluiter voor je aftermovie.", deliverables: ["Luchtbeelden 4K", "Aftermovie-cut", "Foto-highlights"] },
    en: { name: "Events & weddings", tagline: "The big picture, captured", description: "Atmospheric aerial footage of festivals, sporting events and weddings. A spectacular opening or closing shot for your aftermovie.", deliverables: ["4K aerial footage", "Aftermovie cut", "Photo highlights"] },
    de: { name: "Events & Hochzeiten", tagline: "Das große Ganze, festgehalten", description: "Stimmungsvolle Luftaufnahmen von Festivals, Sportevents und Hochzeiten. Ein spektakulärer Auftakt oder Abschluss für Ihren Aftermovie.", deliverables: ["4K-Luftaufnahmen", "Aftermovie-Schnitt", "Foto-Highlights"] },
  },
  agrarisch: {
    nl: { name: "Agrarisch", tagline: "Inzicht in elk perceel", description: "Gewasmonitoring, NDVI-kaarten en perceelinspectie voor telers en loonwerkers. Spot stress, droogte en ziekte vroeg.", deliverables: ["NDVI-/multispectraalkaart", "Perceelrapport", "Probleemzones gemarkeerd"] },
    en: { name: "Agriculture", tagline: "Insight into every field", description: "Crop monitoring, NDVI maps and field inspection for growers and contractors. Spot stress, drought and disease early.", deliverables: ["NDVI/multispectral map", "Field report", "Problem zones marked"] },
    de: { name: "Landwirtschaft", tagline: "Einblick in jedes Feld", description: "Pflanzenmonitoring, NDVI-Karten und Feldinspektion für Landwirte und Lohnunternehmer. Erkennen Sie Stress, Trockenheit und Krankheit früh.", deliverables: ["NDVI-/Multispektralkarte", "Feldbericht", "Problemzonen markiert"] },
  },
};

export function segmentText(slug: string, locale: string): Seg {
  const l = isLocale(locale) ? locale : DEFAULT_LOCALE;
  return SEGMENT_I18N[slug]?.[l] ?? SEGMENT_I18N[slug]?.[DEFAULT_LOCALE];
}

type Pkg = { name: string; oneLiner: string; useCase: string };
export const PACKAGE_I18N: Record<Tier, Record<Locale, Pkg>> = {
  bronze: {
    nl: { name: "Brons", oneLiner: "Op de markt.", useCase: "Vastgoedlisting, snelle social proof, basis vastlegging" },
    en: { name: "Bronze", oneLiner: "On the market.", useCase: "Property listing, quick social proof, basic capture" },
    de: { name: "Bronze", oneLiner: "Auf den Markt.", useCase: "Immobilieninserat, schneller Social Proof, Basisaufnahme" },
  },
  silver: {
    nl: { name: "Zilver", oneLiner: "Val op.", useCase: "Premium vastgoed, hospitality, merk- & social content" },
    en: { name: "Silver", oneLiner: "Stand out.", useCase: "Premium real estate, hospitality, brand & social content" },
    de: { name: "Silber", oneLiner: "Auffallen.", useCase: "Premium-Immobilien, Hospitality, Marken- & Social-Content" },
  },
  gold: {
    nl: { name: "Goud", oneLiner: "Data & techniek.", useCase: "Inspectie, bouwvoortgang, landmeten, thermografie" },
    en: { name: "Gold", oneLiner: "Data & technical.", useCase: "Inspection, construction progress, surveying, thermography" },
    de: { name: "Gold", oneLiner: "Daten & Technik.", useCase: "Inspektion, Baufortschritt, Vermessung, Thermografie" },
  },
  platinum: {
    nl: { name: "Platinum", oneLiner: "Cinema / mission-grade.", useCase: "Merkfilms, commercials, LiDAR-survey, multi-day" },
    en: { name: "Platinum", oneLiner: "Cinema / mission-grade.", useCase: "Brand films, commercials, LiDAR survey, multi-day" },
    de: { name: "Platin", oneLiner: "Cinema / Mission-Grade.", useCase: "Markenfilme, Werbespots, LiDAR-Vermessung, mehrtägig" },
  },
};

export function packageText(tier: Tier, locale: string): Pkg {
  const l = isLocale(locale) ? locale : DEFAULT_LOCALE;
  return PACKAGE_I18N[tier][l];
}

/** Small UI fragments reused by cards and catalogue views. */
export const UI: Record<Locale, {
  from: string; insured: string; exVat: string; radius: string; available: string;
  freeNoObligation: string; viewAll: string;
}> = {
  nl: { from: "vanaf", insured: "Verzekerd", exVat: "ex BTW", radius: "km bereik", available: "beschikbaar", freeNoObligation: "gratis & vrijblijvend", viewAll: "Bekijk alles" },
  en: { from: "from", insured: "Insured", exVat: "ex VAT", radius: "km range", available: "available", freeNoObligation: "free & no obligation", viewAll: "View all" },
  de: { from: "ab", insured: "Versichert", exVat: "zzgl. MwSt.", radius: "km Radius", available: "verfügbar", freeNoObligation: "kostenlos & unverbindlich", viewAll: "Alle ansehen" },
};

export function ui(locale: string) {
  return UI[isLocale(locale) ? locale : DEFAULT_LOCALE];
}
