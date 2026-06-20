// Contact-sharing detection + redaction. Used client-side in the demo inbox composer,
// and reusable server-side once messaging runs on a live server.

export const REDACTION_MARK = "•••••••";

export type RedactionFlag = "phone" | "email" | "url" | "handle" | "intent";

const PATTERNS: { flag: RedactionFlag; re: RegExp }[] = [
  { flag: "email", re: /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g },
  // phone: 7+ digits possibly spaced/dotted, optional +, parens, dashes
  { flag: "phone", re: /(\+?\d[\d\s().-]{6,}\d)/g },
  { flag: "url", re: /\b(?:https?:\/\/|www\.)[^\s]+/gi },
  { flag: "handle", re: /\b(?:wa\.me|t\.me|instagram\.com|insta|@[A-Za-z0-9_.]{3,})\b/gi },
  {
    flag: "intent",
    re: /\b(whatsapp|app(?:\s|-)?me|bel\s?me|tikkie|paypal|buiten\s+(?:het\s+)?platform|rechtstreeks|mijn\s+(?:nummer|mail|e-?mail)|dm\s?me|call\s?me|ring\s?me|outside\s+(?:the\s+)?platform|direct\b)\b/gi,
  },
];

export interface RedactionResult {
  redacted: string;
  flags: RedactionFlag[];
  changed: boolean;
}

/** Replace phone/email/url/handles/off-platform-intent with a marker; report which categories hit. */
export function redactContact(input: string): RedactionResult {
  let redacted = input;
  const flags = new Set<RedactionFlag>();
  for (const { flag, re } of PATTERNS) {
    redacted = redacted.replace(re, (m) => {
      flags.add(flag);
      // keep intent keywords readable but mark them; mask hard identifiers fully
      return flag === "intent" ? m : REDACTION_MARK;
    });
  }
  return { redacted, flags: [...flags], changed: flags.size > 0 };
}
