import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Locale, CurrentProject } from "@/lib/types";
import ListingGallery from "@/components/public/ListingGallery";
import Reveal from "@/components/public/Reveal";

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale; id: string };
}): Promise<Metadata> {
  const supabase = createClient();
  const { data: project } = await supabase
    .from("current_projects")
    .select("*")
    .eq("id", params.id)
    .eq("published", true)
    .single();

  if (!project) return {};

  const p = project as CurrentProject;
  const name = params.locale === "en" ? p.name_en : p.name_ar;
  const description = params.locale === "en" ? p.description_en : p.description_ar;

  return {
    title: name,
    description: description || undefined,
    openGraph: {
      title: name,
      description: description || undefined,
      images: p.image_url ? [{ url: p.image_url }] : undefined,
    },
  };
}

export default async function CurrentProjectDetailPage({
  params,
}: {
  params: { locale: Locale; id: string };
}) {
  const supabase = createClient();
  const { data: project } = await supabase
    .from("current_projects")
    .select("*")
    .eq("id", params.id)
    .eq("published", true)
    .single();

  if (!project) notFound();

  const p = project as CurrentProject;
  const name = params.locale === "en" ? p.name_en : p.name_ar;
  const description = params.locale === "en" ? p.description_en : p.description_ar;
  const body = params.locale === "en" ? p.body_en : p.body_ar;
  const paragraphs = body ? body.split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean) : [];
  const galleryImages = p.gallery_urls ?? [];

  const positions = [
    { margin: "sm:mr-auto", width: "max-w-xl", numColor: "text-burgundy/20" },
    { margin: "sm:ml-auto", width: "max-w-xl", numColor: "text-maroon/20" },
  ];
  const imgPositions = [
    { margin: "sm:mr-auto", width: "sm:w-2/3", aspect: "aspect-[4/3]" },
    { margin: "sm:ml-auto", width: "sm:w-1/2", aspect: "aspect-[3/4]" },
    { margin: "sm:mr-[8%]", width: "sm:w-3/5", aspect: "aspect-[4/3]" },
  ];

  return (
    <article>
      <ListingGallery mainImageUrl={p.image_url} galleryUrls={galleryImages} alt={name} />

      <div className="max-w-content mx-auto px-8 py-16">
        <h1 className="max-w-2xl text-4xl font-light text-ink sm:text-5xl">{name}</h1>
        {description && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/75">{description}</p>
        )}
      </div>

      {(paragraphs.length > 0 || galleryImages.length > 0) && (
        <div className="max-w-content mx-auto space-y-16 px-8 pb-28 sm:space-y-24">
          {paragraphs.map((para, i) => {
            const pos = positions[i % positions.length];
            const img = galleryImages[i];
            const imgPos = imgPositions[i % imgPositions.length];

            return (
              <div key={i} className="space-y-16 sm:space-y-24">
                <Reveal>
                  <div className={`${pos.width} ${pos.margin} ${i % 2 === 1 ? "sm:text-right" : ""}`}>
                    <span className={`mb-4 block text-6xl font-light leading-none sm:text-7xl ${pos.numColor}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-lg leading-relaxed text-ink/75">{para}</p>
                  </div>
                </Reveal>

                {img && (
                  <Reveal>
                    <div
                      className={`relative ${imgPos.aspect} w-full ${imgPos.width} ${imgPos.margin} overflow-hidden rounded-2xl shadow-lg`}
                    >
                      <Image src={img} alt={`${name} ${i + 1}`} fill className="object-cover" />
                    </div>
                  </Reveal>
                )}
              </div>
            );
          })}

          {galleryImages.slice(paragraphs.length).map((img, i) => {
            const imgPos = imgPositions[(paragraphs.length + i) % imgPositions.length];
            return (
              <Reveal key={`extra-${i}`}>
                <div
                  className={`relative ${imgPos.aspect} w-full ${imgPos.width} ${imgPos.margin} overflow-hidden rounded-2xl shadow-lg`}
                >
                  <Image src={img} alt={`${name} extra ${i + 1}`} fill className="object-cover" />
                </div>
              </Reveal>
            );
          })}
        </div>
      )}
    </article>
  );
}
