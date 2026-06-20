"use client";

import { useEffect } from "react";

/** Sets <html lang> to the active locale (root layout renders a static default). */
export function HtmlLangSync({ lang }: { lang: string }) {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return null;
}
