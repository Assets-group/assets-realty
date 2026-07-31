import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { getDictionary } from "@/lib/dictionary";
import type { Locale, PastProject } from "@/lib/types";
import ProjectCard from "@/components/public/ProjectCard";

export default async function HomePage({ params }: { params: { locale: Locale } }) {
  const dict = getDictionary(params.locale);
  const supabase = createClient();

  const { data: projects } = await supabase
    .from("past_projects")
    .select("*")
    .eq("published", true)
    .order("year", { ascending: false })
    .limit(4);

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden bg-ink px-6 text-center">
        <div
          className="absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/40 to-maroon/60"
          aria-hidden
        />
        <div className="relative z-10 max-w-2xl">
          <p className="eyebrow mx-auto w-fit text-ivory/70">{dict.hero.eyebrow}</p>
          <h1 className="mt-6 text-6xl font-light text-ivory sm:text-7xl">
            {dict.hero.title}
          </h1>
          <p className="mx-auto mt-7 max-w-lg text-lg font-light text-ivory/85">
            {dict.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Trust / Building Value */}
      <section className="max-w-content mx-auto px-8 py-28">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-[1fr_1px_1.1fr]">
          <h2 className="max-w-md text-3xl font-light leading-snug text-ink sm:text-4xl">
            {dict.trustSection.title}
          </h2>
          <div className="hidden bg-gold/40 md:block" aria-hidden />
          <div className="space-y-6 text-base leading-relaxed text-ink/70">
            <p>{dict.trustSection.paragraph1}</p>
            <p>{dict.trustSection.paragraph2}</p>
            <p>{dict.trustSection.paragraph3}</p>
          </div>
        </div>
      </section>

      {/* Past projects — editorial gallery */}
      <section className="bg-stone/50 px-8 py-28">
        <div className="max-w-content mx-auto">
          <p className="eyebrow text-maroon">{dict.pastProjects.title}</p>
          <h2 className="mt-4 max-w-lg text-3xl font-light text-ink sm:text-4xl">
            {dict.pastProjects.subtitle}
          </h2>
          <div className="mt-16 grid grid-cols-1 gap-16 sm:grid-cols-2">
            {(projects as PastProject[] | null)?.map((project) => (
              <ProjectCard key={project.id} project={project} locale={params.locale} />
            ))}
          </div>
          {!projects?.length && (
            <p className="mt-4 text-ink/50">
              No past projects yet — add some from the admin dashboard.
            </p>
          )}
          <div className="mt-16 text-center">
            <Link href={`/${params.locale}/residences`} className="btn-boutique">
              {dict.nav.residences}
            </Link>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="border-t border-line bg-ivory">
        <div className="max-w-content mx-auto px-8 py-16">
          <p className="eyebrow text-maroon">{dict.visitUs.title}</p>
          <h2 className="mt-4 text-3xl font-light text-ink">
            {dict.visitUs.subtitle}
          </h2>
        </div>
        <div className="max-w-content mx-auto h-[300px] w-full px-8 pb-4">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d221.94976700425855!2d39.1344587!3d21.5610159!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c3dbd76dfc87cd%3A0x8f4d3a4901fccd41!2z2KPYtdmI2YQg2KfZhNin2YLZhNmK2YXZitipINmE2YTYp9iz2KrYq9mF2KfYsdin2Kog2KfZhNi52YLYp9ix2YrYqQ!5e1!3m2!1sen!2ssa!4v1785399947693!5m2!1sen!2ssa"
            width="100%"
            height="100%"
            style={{ border: 0, filter: "grayscale(0.3) contrast(1.05)" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title="Assets Real Estate Investments location"
          />
        </div>
      </section>
    </>
  );
}
