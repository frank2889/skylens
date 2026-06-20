import type { Jurisdiction, CountryCode, Credential, CapabilityLevel } from "./types";

/**
 * Per-country legal + certification registry. The capability ladder
 * (registered → basic → advanced → specific → org) is country-agnostic; each
 * jurisdiction maps it onto its real credentials.
 *
 * NL/DE = EASA (Reg. 2019/947). GB = UK CAA (post-Brexit, NOT EASA — EU
 * certificates are not valid there). Sources: easa.europa.eu, rdw.nl, ilent.nl,
 * caa.co.uk, lba.de (researched 2026). Legal text is informational; binding
 * documents require sign-off by a qualified lawyer per jurisdiction.
 */
export const JURISDICTIONS: Record<CountryCode, Jurisdiction> = {
  NL: {
    code: "NL",
    name: "Netherlands",
    easaMember: true,
    regime: "EASA",
    currency: "EUR",
    authority: {
      short: "RDW / ILT",
      full: "RDW (registratie & vliegbewijs) en ILT (specifieke categorie)",
      url: "https://www.rdw.nl/drone",
    },
    operatorId: {
      label: "Exploitantnummer (RDW)",
      example: "NLD••••4821",
      note: "Eén exploitantnummer per operator; zichtbaar op de drone.",
    },
    insurance: {
      minMajor: 1_000_000,
      currency: "EUR",
      basis: "Aansprakelijkheid o.b.v. EC 785/2004 (≈750.000 SDR); commercieel doorgaans €1 mln.",
    },
    capabilities: [
      { level: "registered", code: "Exploitantnr.", name: "Operator-registratie", authority: "RDW" },
      { level: "basic", code: "A1/A3", name: "EU-dronebewijs A1/A3 (online theorie)", authority: "RDW" },
      { level: "advanced", code: "A2", name: "Bewijs van bekwaamheid A2", authority: "RDW", note: "Dicht bij omstanders." },
      { level: "specific", code: "STS-01/02 · OA", name: "Standaardscenario of operationele autorisatie", authority: "ILT" },
      { level: "org", code: "LUC", name: "Light UAS Operator Certificate", authority: "ILT" },
    ],
    rules: {
      maxAltitude: "120 m AGL",
      vlosRequired: true,
      registrationThreshold: "≥250 g, of lichter mét camera",
      minPilotAge: 16,
      distanceRules: "A1: overvliegen van omstanders vermijden · A2: ≥30 m (5 m in langzame modus) · A3: ≥150 m van bebouwing",
      remoteId: "Verplicht voor klasse-gemarkeerde (C1–C3) drones",
    },
    legal: {
      governingLaw: "Nederlands recht",
      privacyRegime: "AVG (EU GDPR)",
      dpa: { name: "Autoriteit Persoonsgegevens", url: "https://autoriteitpersoonsgegevens.nl" },
      vatRatePct: 21,
      recordRetentionYears: 7,
    },
  },

  GB: {
    code: "GB",
    name: "United Kingdom",
    easaMember: false,
    regime: "UK CAA (post-Brexit)",
    currency: "GBP",
    authority: {
      short: "CAA",
      full: "Civil Aviation Authority (+ erkende RAE-opleiders)",
      url: "https://www.caa.co.uk/drones/",
    },
    operatorId: {
      label: "Operator ID + Flyer ID (CAA)",
      example: "GBR-OP-••••",
      note: "Jaarlijks te verlengen. EU/EASA-certificaten gelden NIET in de UK.",
    },
    insurance: {
      minMajor: 1_000_000,
      currency: "GBP",
      basis: "Third-party liability o.b.v. behouden EC 785/2004 (750.000 SDR); commercieel ≥£1 mln.",
    },
    capabilities: [
      { level: "registered", code: "Operator ID", name: "CAA Operator ID (jaarlijks)", authority: "CAA" },
      { level: "basic", code: "Flyer ID", name: "CAA Flyer ID (online test)", authority: "CAA", note: "Verplicht vanaf ≥100 g (2026)." },
      { level: "advanced", code: "A2 CofC", name: "A2 Certificate of Competency", authority: "CAA-RAE" },
      { level: "specific", code: "GVC · PDRA01", name: "General VLOS Certificate + PDRA01 Operational Authorisation", authority: "CAA" },
      { level: "org", code: "RPC-L2/L3", name: "Remote Pilot Certificate L2/L3 of maatwerk-OA", authority: "CAA" },
    ],
    rules: {
      maxAltitude: "120 m (400 ft) AGL",
      vlosRequired: true,
      registrationThreshold: "Operator ID altijd; Flyer ID ≥100 g (vanaf 2026)",
      minPilotAge: 18,
      distanceRules: "A1: overvliegen minimaliseren · A2 (Near People): 5–30 m naar massa · A3: ≥50 m, ≥150 m van bebouwd gebied",
      remoteId: "Remote ID verplicht voor UK1–UK3 (vanaf 2026)",
    },
    legal: {
      governingLaw: "English law (Engeland & Wales)",
      privacyRegime: "UK GDPR + Data Protection Act 2018",
      dpa: { name: "ICO (Information Commissioner's Office)", url: "https://ico.org.uk" },
      vatRatePct: 20,
      recordRetentionYears: 6,
    },
  },

  DE: {
    code: "DE",
    name: "Germany",
    easaMember: true,
    regime: "EASA",
    currency: "EUR",
    authority: {
      short: "LBA",
      full: "Luftfahrt-Bundesamt (registratie via dipul)",
      url: "https://www.lba.de",
    },
    operatorId: {
      label: "eID (LBA)",
      example: "DEU-••••",
      note: "Registratie via LBA/dipul; geldig in de hele EU.",
    },
    insurance: {
      minMajor: 1_000_000,
      currency: "EUR",
      basis: "Halterhaftpflicht — verplicht voor álle operators (ook hobby), doorgaans €1 mln.",
    },
    capabilities: [
      { level: "registered", code: "eID", name: "Betreiber-Registrierung (eID)", authority: "LBA" },
      { level: "basic", code: "A1/A3", name: "EU-Kompetenznachweis A1/A3", authority: "LBA" },
      { level: "advanced", code: "A2", name: "Fernpiloten-Zeugnis A2", authority: "LBA" },
      { level: "specific", code: "STS · Betriebsgenehmigung", name: "Standardszenario of operationele autorisatie", authority: "LBA" },
      { level: "org", code: "LUC", name: "Light UAS Operator Certificate", authority: "LBA" },
    ],
    rules: {
      maxAltitude: "120 m AGL",
      vlosRequired: true,
      registrationThreshold: "≥250 g, of lichter mét camera",
      minPilotAge: 16,
      distanceRules: "A1: omstanders vermijden · A2: ≥30 m (5 m langzaam) · A3: ≥150 m van bebouwing",
      remoteId: "Verplicht voor klasse-gemarkeerde (C1–C3) drones",
    },
    legal: {
      governingLaw: "Deutsches Recht",
      privacyRegime: "DSGVO (EU GDPR)",
      dpa: { name: "BfDI / Landesdatenschutzbehörde", url: "https://www.bfdi.bund.de" },
      vatRatePct: 19,
      recordRetentionYears: 10,
    },
  },

  // ── Scaffold: data-ready for later rollout (EASA, harmonised) ──
  BE: {
    code: "BE",
    name: "Belgium",
    easaMember: true,
    regime: "EASA",
    currency: "EUR",
    authority: { short: "DGLV/BCAA", full: "Directoraat-generaal Luchtvaart", url: "https://mobilit.belgium.be" },
    operatorId: { label: "Operator ID (DGLV)", example: "BEL-••••", note: "Registratie via het Belgische drone-portaal." },
    insurance: { minMajor: 1_000_000, currency: "EUR", basis: "EC 785/2004; commercieel doorgaans €1 mln." },
    capabilities: [
      { level: "registered", code: "Operator ID", name: "Operator-registratie", authority: "DGLV" },
      { level: "basic", code: "A1/A3", name: "EU-dronebewijs A1/A3", authority: "DGLV" },
      { level: "advanced", code: "A2", name: "Bewijs van bekwaamheid A2", authority: "DGLV" },
      { level: "specific", code: "STS/OA", name: "Standaardscenario of operationele autorisatie", authority: "DGLV" },
      { level: "org", code: "LUC", name: "Light UAS Operator Certificate", authority: "DGLV" },
    ],
    rules: {
      maxAltitude: "120 m AGL", vlosRequired: true, registrationThreshold: "≥250 g of mét camera",
      minPilotAge: 16, distanceRules: "EASA: A1/A2/A3", remoteId: "Verplicht voor C1–C3",
    },
    legal: {
      governingLaw: "Belgisch recht", privacyRegime: "AVG (EU GDPR)",
      dpa: { name: "Gegevensbeschermingsautoriteit", url: "https://www.gegevensbeschermingsautoriteit.be" },
      vatRatePct: 21, recordRetentionYears: 7,
    },
  },

  FR: {
    code: "FR",
    name: "France",
    easaMember: true,
    regime: "EASA",
    currency: "EUR",
    authority: { short: "DGAC", full: "Direction générale de l'Aviation civile (AlphaTango)", url: "https://www.alphatango.fr" },
    operatorId: { label: "Numéro d'exploitant (DGAC)", example: "FRA-••••", note: "Inschrijving via AlphaTango." },
    insurance: { minMajor: 1_000_000, currency: "EUR", basis: "EC 785/2004; verplicht voor alle operators." },
    capabilities: [
      { level: "registered", code: "Exploitant", name: "Enregistrement exploitant", authority: "DGAC" },
      { level: "basic", code: "A1/A3", name: "Brevet A1/A3", authority: "DGAC" },
      { level: "advanced", code: "A2", name: "Brevet A2", authority: "DGAC" },
      { level: "specific", code: "STS/CATS", name: "Scénario standard / autorisation", authority: "DGAC" },
      { level: "org", code: "LUC", name: "Light UAS Operator Certificate", authority: "DGAC" },
    ],
    rules: {
      maxAltitude: "120 m AGL", vlosRequired: true, registrationThreshold: "≥250 g of mét camera",
      minPilotAge: 16, distanceRules: "EASA: A1/A2/A3", remoteId: "Verplicht; handhaving vanaf 2026",
    },
    legal: {
      governingLaw: "Droit français", privacyRegime: "RGPD (EU GDPR)",
      dpa: { name: "CNIL", url: "https://www.cnil.fr" }, vatRatePct: 20, recordRetentionYears: 6,
    },
  },
};

export function getJurisdiction(code: CountryCode): Jurisdiction {
  return JURISDICTIONS[code] ?? JURISDICTIONS.NL;
}

export function getCredential(code: CountryCode, level: CapabilityLevel): Credential | undefined {
  return getJurisdiction(code).capabilities.find((c) => c.level === level);
}

/** Country-correct short label for a capability level, e.g. NL "A2" vs GB "A2 CofC". */
export function capabilityLabel(code: CountryCode, level: CapabilityLevel): string {
  return getCredential(code, level)?.code ?? level;
}

/** Markets that are live for matching/SEO right now. */
export const ACTIVE_COUNTRIES: CountryCode[] = ["NL", "GB", "DE"];
