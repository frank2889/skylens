import type { Metadata } from "next";
import { Suspense } from "react";
import { BedanktContent } from "@/components/bedankt-content";

export const metadata: Metadata = {
  title: "Aanvraag ontvangen · Skylens",
  description:
    "Bedankt voor je aanvraag. We koppelen je aan geverifieerde dronepiloten bij jou in de buurt.",
  robots: { index: false, follow: false },
};

export default function BedanktPage() {
  return (
    <Suspense fallback={<div className="container-x py-24 text-ink-muted">Laden…</div>}>
      <BedanktContent />
    </Suspense>
  );
}
