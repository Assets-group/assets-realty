import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getDictionary } from "@/lib/dictionary";
import type { BlogPost, CurrentProject, Locale } from "@/lib/types";
import CurrentProjectsSlideshow from "@/components/public/CurrentProjectsSlideshow";
import BlogCard from "@/components/public/BlogCard";
import Reveal from "@/components/public/Reveal";

const CLIENTS = [
  { name: "Four Seasons Jeddah", file: "four-seasons" },
  { name: "KAUST", file: "kaust" },
  { name: "Saudi Aramco", file: "aramco" },
  { name: "Lamar Towers", file: "lamar-towers" },
  { name: "Al Mada Towers", file: "al-mada-towers" },
  { name: "Golden Tower", file: "golden-tower" },
  { name: "Thakher Development", file: "thakher" },
];

export default async function HomePage({ params }: { params: { locale: Locale } }) {
  const dict = getDictionary(params.locale);
  const supabase = createClient();

  const { data: currentProjects } = await supabase
    .from("current_projects")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  const { data: blogPosts } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(3);

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden bg-ink px-6 text-center">
        <Image
          src="/hero-bg.png"
          alt=""
          fill
          priority
          className="object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/40 to-maroon/60"
          aria-hidden
        />
        <div className="relative z-10 max-w-2xl">
          <p className="eyebrow mx-auto w-fit text-ivory/70">{dict.hero.eyebrow}</p>
          <h1 className="mt-6 text-6xl font-light text-ivory sm:text-7xl">{dict.hero.title}</h1>
          <p className="mx-auto mt-7 max-w-lg text-lg font-light text-ivory/85">
            {dict.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Trust / Building Value */}
      <Reveal>
        <section className="max-w-content mx-auto px-8 py-28">
          <div className="grid grid-cols-1 gap-14 md:grid-cols-[1fr_1px_1.1fr]">
            <h2 className="max-w-md text-3xl font-light leading-snug text-ink sm:text-4xl">
              {dict.trustSection.title}
            </h2>
            <div className="hidden bg-burgundy/40 md:block" aria-hidden />
            <div className="space-y-6 text-base leading-relaxed text-ink/70">
              <p>{dict.trustSection.paragraph1}</p>
              <p>{dict.trustSection.paragraph2}</p>
              <p>{dict.trustSection.paragraph3}</p>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Trusted By — auto-scrolling marquee */}
      <Reveal>
        <section className="border-y border-line bg-stone/40 py-16">
          <p className="eyebrow mx-auto mb-10 w-fit text-maroon">{dict.trustedBy.eyebrow}</p>
          <div className="overflow-hidden">
            <div className="marquee-track flex w-max items-center gap-16">
              {[...CLIENTS, ...CLIENTS].map((client, i) => (
                <img
                  key={client.file + i}
                  src={`/clients/${client.file}.png`}
                  alt={client.name}
                  className="h-10 w-auto shrink-0 object-contain opacity-70 grayscale transition-opacity hover:opacity-100 sm:h-12"
                />
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Company Profile */}
      <Reveal>
        <section className="bg-stone/50 px-8 py-28 text-center">
          <div className="max-w-content mx-auto">
            <p className="eyebrow mx-auto w-fit text-maroon">{dict.nav.businessProfile}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a href="/assets-business-profile.pdf" target="_blank" rel="noopener noreferrer" className="btn-boutique">
                {dict.nav.businessProfile}
              </a>
              <a href="/fal-license.pdf" target="_blank" rel="noopener noreferrer" className="btn-boutique">
                {dict.nav.falLicense}
              </a>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Current Projects */}
      {currentProjects && currentProjects.length > 0 && (
        <Reveal>
          <section className="max-w-content mx-auto px-8 py-32">
            <p className="eyebrow mx-auto w-fit text-maroon">{dict.currentProjects.eyebrow}</p>
            <div className="mt-10">
              <CurrentProjectsSlideshow
                projects={currentProjects as CurrentProject[]}
                locale={params.locale}
              />
            </div>
          </section>
        </Reveal>
      )}

      {/* Personal Real Estate */}
      <Reveal>
        <section className="border-t border-line bg-stone/40 px-8 py-28">
          <div className="max-w-content mx-auto grid grid-cols-1 gap-14 md:grid-cols-2">
            <div>
              <p className="eyebrow text-maroon">{dict.personalRealEstate.eyebrow}</p>
              <h2 className="mt-5 text-3xl font-light leading-snug text-ink sm:text-4xl">
                {dict.personalRealEstate.title}
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-ink/70">
                {dict.personalRealEstate.body}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/50">
                {dict.personalRealEstate.servicesLabel}
              </p>
              <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2">
                {dict.personalRealEstate.services.map((service, i) => (
                  <div
                    key={service}
                    className="rounded-lg border-t border-line pt-4 transition-shadow hover:shadow-md"
                  >
                    <span className="text-2xl font-light text-burgundy">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-2 text-sm font-medium text-ink">{service}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* From the Blog */}
      {blogPosts && blogPosts.length > 0 && (
        <Reveal>
          <section className="max-w-content mx-auto px-8 py-32">
            <p className="eyebrow mx-auto w-fit text-maroon">{dict.blogSection.eyebrow}</p>
            <h2 className="mt-5 text-center text-3xl font-light text-ink sm:text-4xl">
              {dict.blogSection.title}
            </h2>
            <div className="mt-16 grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-3">
              {(blogPosts as BlogPost[]).map((post) => (
                <BlogCard key={post.id} post={post} locale={params.locale} dict={dict} />
              ))}
            </div>
            <div className="mt-16 text-center">
              <Link href={`/${params.locale}/blog`} className="btn-boutique">
                {dict.blogSection.viewAll}
              </Link>
            </div>
          </section>
        </Reveal>
      )}
    </>
  );
}
