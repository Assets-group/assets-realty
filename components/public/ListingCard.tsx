import Link from "next/link";
import Image from "next/image";
import type { Locale, Listing } from "@/lib/types";
import type { dictionary } from "@/lib/dictionary";

function formatPrice(status: string, price: number | null, contactForPrice: string) {
  if (price === null) return contactForPrice;
  const val = price.toLocaleString("en-US");
  return status === "For Rent" ? `SAR ${val} / yr` : `SAR ${val}`;
}

export default function ListingCard({
  listing,
  locale,
  dict,
}: {
  listing: Listing;
  locale: Locale;
  dict: (typeof dictionary)[Locale];
}) {
  const name = locale === "en" ? listing.name_en : listing.name_ar;
  const area = locale === "en" ? listing.area_en : listing.area_ar;

  return (
    <Link href={`/${locale}/residences/${listing.slug}`} className="group block">
      <div className="card-media group-hover:shadow-xl relative aspect-[4/3] bg-ink/5">
        {listing.main_image_url && (
          <Image
            src={listing.main_image_url}
            alt={name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        )}
        <span
          className={`absolute left-4 top-4 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white ${
            listing.status === "For Rent" ? "bg-maroon" : "bg-ink"
          }`}
        >
          {listing.status === "For Rent" ? dict.residences.forRent : listing.status === "For Sale" ? dict.residences.forSale : listing.status}
        </span>
        <span className="absolute bottom-0 right-0 bg-maroon px-4 py-2 text-sm font-bold text-white">
          {formatPrice(listing.status, listing.price, dict.residences.contactForPrice)}
        </span>
      </div>
      <p className="mt-6 text-xs font-bold uppercase tracking-wider text-maroon">
        {listing.property_type}
      </p>
      <h3 className="mt-2 text-xl font-light text-ink">{name}</h3>
      <p className="mt-1 text-sm text-ink/55">{area}</p>
      <div className="mt-4 flex gap-4 border-t border-line pt-4 text-xs text-ink/70">
        <span>
          <b className="text-ink">{listing.bedrooms}</b> {dict.residences.beds}
        </span>
        <span>
          <b className="text-ink">{listing.bathrooms}</b> {dict.residences.baths}
        </span>
        <span>
          <b className="text-ink">{listing.area_sqm}</b> {dict.residences.sqm}
        </span>
      </div>
    </Link>
  );
}
