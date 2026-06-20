"use client";

import { useEffect } from "react";

/** Root → default locale. Static-export safe (client redirect). */
export default function RootRedirect() {
  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
    window.location.replace(`${base}/nl/`);
  }, []);
  return (
    <div className="grid min-h-dvh place-items-center text-ink-muted">
      <a href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/nl/`} className="link-underline">
        Skylens →
      </a>
    </div>
  );
}
