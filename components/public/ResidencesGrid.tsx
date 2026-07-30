"use client";

import { useMemo, useState } from "react";
import type { Locale, Listing } from "@/lib/types";
import type { dictionary } from "@/lib/dictionary";
import ListingCard from "./ListingCard";

const TYPES = ["Villa", "Apartment", "Penthouse", "Branded Residence"] as const;
const PRICE_BANDS = [
  { label: "any", min: 0, max: Infinity },
  { label: "under3", min: 0, max: 3_000_000 },
  { label: "3to8", min: 3_000_000, max: 8_000_000 },
  { label: "8plus", min: 8_000_000, max: Infinity },
];

export default function ResidencesGrid({
  listings,
  locale,
  dict,
}: {
  listings: Listing[];
  locale: Locale;
  dict: (typeof dictionary)[Locale];
}) {
  const [type, setType] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");
  const [priceBand, setPriceBand] = useState(0);

  const areas = useMemo(() => {
    const key = locale === "en" ? "area_en" : "area_ar";
    return Array.from(new Set(listings.map((l) => l[key]))).sort();
  }, [listings, locale]);
  const [area, setArea] = useState<string>("all");

  const filtered = listings.filter((l) => {
    if (type !== "all" && l.property_type !== type) return false;
    if (status !== "all" && l.status !== status) return false;
    const areaVal = locale === "en" ? l.area_en : l.area_ar;
    if (area !== "all" && areaVal !== area) return false;
    const band = PRICE_BANDS[priceBand];
    if (l.price < band.min || l.price > band.max) return false;
    return true;
  });

  return (
    <div>
      <div className="sticky top-0 z-10 border-y border-line bg-white/95 px-8 py-4 backdrop-blur">
        <div className="max-w-content mx-auto flex flex-wrap items-center gap-3">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border border-line px-4 py-2 text-sm font-medium"
          >
            <option value="all">{dict.residences.allTypes}</option>
            {TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <select
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="border border-line px-4 py-2 text-sm font-medium"
          >
            <option value="all">{dict.residences.allAreas}</option>
            {areas.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border border-line px-4 py-2 text-sm font-medium"
          >
            <option value="all">
              {dict.residences.forSale} / {dict.residences.forRent}
            </option>
            <option value="For Sale">{dict.residences.forSale}</option>
            <option value="For Rent">{dict.residences.forRent}</option>
          </select>
          <select
            value={priceBand}
            onChange={(e) => setPriceBand(Number(e.target.value))}
            className="border border-line px-4 py-2 text-sm font-medium"
          >
            <option value={0}>{dict.residences.anyPrice}</option>
            <option value={1}>Under SAR 3M</option>
            <option value={2}>SAR 3M – 8M</option>
            <option value={3}>SAR 8M+</option>
          </select>
          <div className="ms-auto text-sm text-ink/55">
            <b className="text-maroon">{filtered.length}</b> {dict.residences.match}
          </div>
        </div>
      </div>

      <div className="max-w-content mx-auto px-8 py-16">
        {filtered.length === 0 ? (
          <p className="py-20 text-center text-lg font-light text-ink/50">
            {dict.residences.empty}
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2">
            {filtered.map((listing) => (
              <ListingCard key={listing.id} listing={listing} locale={locale} dict={dict} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
