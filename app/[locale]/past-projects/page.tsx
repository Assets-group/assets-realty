import { createClient } from "@/lib/supabase/server";
import { getDictionary } from "@/lib/dictionary";
import type { Locale, PastProject } from "@/lib/types";
import ProjectCard from "@/components/public/ProjectCard";

export default async function PastProjectsPage({ params }: { params: { locale: Locale } }) {
  const dict = getDictionary(params.locale);
  const supabase = createClient();

  const { data: projects } = await supabase
    .from("past_projects")
    .select("*")
    .eq("published", true)
    .order("year", { ascending: false });

  return (
    <div className="max-w-content mx-auto px-8 py-16">
      <h1 className="text-4xl font-light text-ink">{dict.pastProjects.title}</h1>
      <p className="mt-4 max-w-lg text-ink/60">{dict.pastProjects.subtitle}</p>

      <div className="mt-16 grid grid-cols-1 gap-16 sm:grid-cols-2">
        {(projects as PastProject[] | null)?.map((project) => (
          <ProjectCard key={project.id} project={project} locale={params.locale} />
        ))}
      </div>
    </div>
  );
}
