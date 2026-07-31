import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getDictionary } from "@/lib/dictionary";
import type { Locale, Listing } from "@/lib/types";
import ListingInquiryForm from "@/components/public/ListingInquiryForm";

function formatPrice(status: string, price: number) {
  const val = price.toLocaleString("en-US");
  return status === "For Rent" ? `SAR ${val} / yr` : `SAR ${val}`;
}

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale; slug: string };
}): Promise<Metadata> {
  const supabase = createClient();
  const { data: listing } = await supabase
    .from("listings")
    .select("*")
    .eq("slug", params.slug)
    .eq("published", true)
    .single();

  if (!listing) return {};

  const l = listing as Listing;
  const name = params.locale === "en" ? l.name_en : l.name_ar;
  const area = params.locale === "en" ? l.area_en : l.area_ar;
  const description = params.locale === "en" ? l.description_en : l.description_ar;

  return {
    title: name,
    description: description || `${l.property_type} in ${area} — ${formatPrice(l.status, l.price)}`,
    openGraph: {
      title: name,
      description: description || undefined,
      images: l.main_image_url ? [{ url: l.main_image_url }] : undefined,
    },
  };
}

export default async function ListingDetailPage({
  params,
}: {
  params: { locale: Locale; slug: string };
}) {
  const dict = getDictionary(params.locale);
  const supabase = createClient();

  const { data: listing } = await supabase
    .from("listings")
    .select("*")
    .eq("slug", params.slug)
    .eq("published", true)
    .single();

  if (!listing) notFound();

  const l = listing as Listing;
  const name = params.locale === "en" ? l.name_en : l.name_ar;
  const area = params.locale === "en" ? l.area_en : l.area_ar;
  const description = params.locale === "en" ? l.description_en : l.description_ar;

  return (
    <article>
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-ink/5">
        {l.main_image_url && (
          <Image src={l.main_image_url} alt={name} fill className="object-cover" priority />
        )}
      </div>

      <div className="max-w-content mx-auto px-8 py-16">
        <p className="text-xs font-bold uppercase tracking-wider text-maroon">
          {l.property_type} · {l.status === "For Rent" ? dict.residences.forRent : dict.residences.forSale}
        </p>
        <h1 className="mt-2 text-4xl font-light text-ink">{name}</h1>
        <p className="mt-1 text-ink/55">{area}</p>

        <div className="mt-8 flex gap-10 border-y border-line py-6">
          <div>
            <p className="text-2xl font-light text-ink">{l.bedrooms}</p>
            <p className="text-xs uppercase tracking-wider text-ink/50">{dict.residences.beds}</p>
          </div>
          <div>
            <p className="text-2xl font-light text-ink">{l.bathrooms}</p>
            <p className="text-xs uppercase tracking-wider text-ink/50">{dict.residences.baths}</p>
          </div>
          <div>
            <p className="text-2xl font-light text-ink">{l.area_sqm}</p>
            <p className="text-xs uppercase tracking-wider text-ink/50">{dict.residences.sqm}</p>
          </div>
        </div>

        {description && (
          <p className="mt-8 max-w-2xl leading-relaxed text-ink/75">{description}</p>
        )}

        <p className="mt-8 text-3xl font-light text-maroon">
          {formatPrice(l.status, l.price)}
        </p>

        <div className="mt-10 max-w-lg">
          <ListingInquiryForm dict={dict} listingId={l.id} />
        </div>

        {l.gallery_urls?.length > 0 && (
          <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {l.gallery_urls.map((url, i) => (
              <div key={i} className="relative aspect-square overflow-hidden bg-ink/5">
                <Image src={url} alt={`${name} photo ${i + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
