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

  return (
    <div>
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-ink/5">
        <Image src={images[selected]} alt={alt} fill className="object-cover" priority />
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
