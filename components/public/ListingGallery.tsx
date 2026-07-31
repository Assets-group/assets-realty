"use client";

import { useState } from "react";
import Image from "next/image";

export default function ListingGallery({
  mainImageUrl,
  galleryUrls,
  alt,
}: {
  mainImageUrl: string | null;
  galleryUrls: string[];
  alt: string;
}) {
  const images = [mainImageUrl, ...(galleryUrls ?? [])].filter(Boolean) as string[];
  const [selected, setSelected] = useState(0);

  if (images.length === 0) return null;

  const showArrows = images.length > 1;
  const goPrev = () => setSelected((i) => (i === 0 ? images.length - 1 : i - 1));
  const goNext = () => setSelected((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div>
      <div className="max-w-content mx-auto px-8 pt-8">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-ink/5">
          <Image src={images[selected]} alt={alt} fill className="object-cover" priority />
          {showArrows && (
            <>
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous photo"
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-ink/50 p-2 text-white transition-colors hover:bg-ink/80"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                  <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next photo"
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-ink/50 p-2 text-white transition-colors hover:bg-ink/80"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                  <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>

      {images.length > 1 && (
        <div className="max-w-content mx-auto px-8 pt-4">
          <div className="flex gap-3 overflow-x-auto pb-2">
            {images.map((url, i) => (
              <button
                key={url + i}
                type="button"
                onClick={() => setSelected(i)}
                aria-label={`Show photo ${i + 1}`}
                className={`relative h-20 w-28 shrink-0 overflow-hidden border-2 transition-colors ${
                  i === selected ? "border-maroon" : "border-transparent"
                }`}
              >
                <Image src={url} alt={`${alt} thumbnail ${i + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
