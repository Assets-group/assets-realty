import Image from "next/image";
import type { Locale, PastProject } from "@/lib/types";

export default function ProjectCard({
  project,
  locale,
}: {
  project: PastProject;
  locale: Locale;
}) {
  const name = locale === "en" ? project.name_en : project.name_ar;
  const location = locale === "en" ? project.location_en : project.location_ar;
  const description = locale === "en" ? project.description_en : project.description_ar;

  return (
    <article>
      <div className="group relative aspect-[4/3] overflow-hidden bg-ink/5">
        {project.photo_url && (
          <Image
            src={project.photo_url}
            alt={name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        )}
      </div>
      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-burgundy">
        {location}
        {project.year ? ` — ${project.year}` : ""}
      </p>
      <h3 className="mt-2 text-2xl font-light text-ink">{name}</h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-ink/60">{description}</p>
    </article>
  );
}
