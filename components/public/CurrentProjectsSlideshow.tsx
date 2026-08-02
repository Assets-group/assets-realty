"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { dictionary } from "@/lib/dictionary";
import type { CurrentProject, Locale } from "@/lib/types";

export default function CurrentProjectsSlideshow({
  projects,
  locale,
  dict,
}: {
  projects: CurrentProject[];
  locale: Locale;
  dict: (typeof dictionary)[Locale];
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (projects.length < 2) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % projects.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [projects.length]);

  if (!projects.length) return null;

  const project = projects[index];
  const name = locale === "en" ? project.name_en : project.name_ar;
  const description = locale === "en" ? project.description_en : project.description_ar;
  const showArrows = projects.length > 1;
  const goPrev = () => setIndex((i) => (i === 0 ? projects.length - 1 : i - 1));
  const goNext = () => setIndex((i) => (i === projects.length - 1 ? 0 : i + 1));

  return (
    <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-line shadow-lg md:min-h-[560px] md:grid-cols-2">
      <div className="relative aspect-[4/3] w-full md:aspect-auto">
        {project.image_url && (
          <Image
            key={project.id}
            src={project.image_url}
            alt={name}
            fill
            className="object-cover transition-opacity duration-700"
          />
        )}
        {showArrows && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous project"
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-ink/50 p-2 text-white transition-colors hover:bg-ink/80"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next project"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-ink/50 p-2 text-white transition-colors hover:bg-ink/80"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </>
        )}
      </div>
      <div className="flex flex-col justify-center bg-ivory p-12 sm:p-16">
        <h3 className="text-3xl font-light text-ink sm:text-4xl">{name}</h3>
        <p className="mt-5 max-w-md text-base leading-relaxed text-ink/70">{description}</p>
        <Link
          href={`/${locale}/current-projects/${project.id}`}
          className="mt-6 inline-block w-fit text-xs font-semibold uppercase tracking-[0.14em] text-maroon transition-colors hover:text-ink"
        >
          {dict.currentProjects.moreDetails} →
        </Link>
        {projects.length > 1 && (
          <div className="mt-8 flex gap-2">
            {projects.map((p, i) => (
              <button
                key={p.id}
                aria-label={`Show project ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-8 bg-burgundy" : "w-1.5 bg-ink/20"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
