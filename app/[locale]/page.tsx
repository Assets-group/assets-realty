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
          className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/30 to-maroon/70"
          aria-hidden
        />
        <div className="relative z-10 max-w-2xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-white/70">
            {dict.hero.eyebrow}
          </p>
          <h1 className="font-sans text-6xl font-light text-white sm:text-7xl">
            {dict.hero.title}
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-lg text-white/85">{dict.hero.subtitle}</p>
        </div>
      </section>

      {/* Past projects — editorial gallery */}
      <section className="max-w-content mx-auto px-8 py-24">
        <h2 className="mb-2 text-3xl font-light text-ink">{dict.pastProjects.title}</h2>
        <p className="mb-14 text-ink/60">{dict.pastProjects.subtitle}</p>
        <div className="grid grid-cols-1 gap-16 sm:grid-cols-2">
          {(projects as PastProject[] | null)?.map((project) => (
            <ProjectCard key={project.id} project={project} locale={params.locale} />
          ))}
        </div>
        {!projects?.length && (
          <p className="text-ink/50">
            No past projects yet — add some from the admin dashboard.
          </p>
        )}
        <div className="mt-14 text-center">
          <Link
            href={`/${params.locale}/residences`}
            className="inline-block bg-ink px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-maroon"
          >
            {dict.nav.residences}
          </Link>
        </div>
      </section>

      {/* Location */}
      <section className="border-t border-line">
        <div className="max-w-content mx-auto px-8 py-16">
          <h2 className="mb-1 text-3xl font-light text-ink">{dict.visitUs.title}</h2>
          <p className="mb-8 text-ink/60">{dict.visitUs.subtitle}</p>
        </div>
        <div className="h-[420px] w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d221.94976700425855!2d39.1344587!3d21.5610159!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c3dbd76dfc87cd%3A0x8f4d3a4901fccd41!2z2KPYtdmI2YQg2KfZhNin2YLZhNmK2YXZitipINmE2YTYp9iz2KrYq9mF2KfYsdin2Kog2KfZhNi52YLYp9ix2YrYqQ!5e1!3m2!1sen!2ssa!4v1785399947693!5m2!1sen!2ssa"
            width="100%"
            height="100%"
            style={{ border: 0 }}
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
