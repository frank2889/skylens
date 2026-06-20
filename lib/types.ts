// Shared domain types for Skylens.

export type Tier = "bronze" | "silver" | "gold" | "platinum";
export type CertLevel = "a1_a3" | "a2" | "sts_01" | "sts_02" | "operational_auth";
export type MembershipKey = "free" | "pro" | "elite";

export interface Segment {
  slug: string;
  name: string; // NL
  tagline: string;
  description: string;
  icon: string; // lucide-react icon name
  deliverables: string[];
  gear: string;
  priceFrom: number; // EUR ex BTW
  tier: Tier; // the typical package tier this maps to
  certHint: string;
}

export interface City {
  slug: string;
  name: string;
  province: string;
  region: string; // e.g. "Randstad"
  inhabitants: number;
}

export interface Package {
  tier: Tier;
  name: string; // NL
  oneLiner: string;
  priceLabel: string;
  priceFrom: number;
  useCase: string;
  gear: string;
  photos: string;
  video: string;
  technical: string;
  turnaround: string;
  certRequired: string;
  highlight?: boolean;
}

export interface Membership {
  key: MembershipKey;
  name: string;
  price: string;
  priceSub: string;
  forWho: string;
  leadModifier: string;
  commission: string;
  perks: string[];
  highlight?: boolean;
}

export interface LeadTier {
  tier: Tier;
  jobValue: string;
  leadPrice: string;
  exclusivity: string;
}

export interface Review {
  author: string;
  role: string;
  city: string;
  rating: number;
  text: string;
}

export interface Pilot {
  slug: string;
  name: string;
  company: string;
  citySlug: string;
  region: string;
  tier: Tier;
  membership: MembershipKey;
  verified: boolean;
  certs: CertLevel[];
  insured: boolean;
  operatorId: string; // masked RDW exploitantnummer
  segments: string[]; // segment slugs
  serviceRadiusKm: number;
  rating: number;
  reviewCount: number;
  jobsDone: number;
  responseTime: string;
  gear: string[];
  bio: string;
  reviews: Review[];
}

export interface ShowcaseItem {
  id: string;
  title: string;
  segment: string; // segment slug
  citySlug: string;
  tier: Tier;
  pilotSlug: string;
  isVideo: boolean;
}

export interface RequestInput {
  segment: string;
  citySlug: string;
  date?: string;
  budgetBand?: string;
  details?: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  marketingConsent: boolean;
}
