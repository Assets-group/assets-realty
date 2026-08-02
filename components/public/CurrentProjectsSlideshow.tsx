"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { CurrentProject, Locale } from "@/lib/types";

export default function CurrentProjectsSlideshow({
  projects,
  locale,
}: {
  projects: CurrentProject[];
  locale: Locale;
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
      </div>
      <div className="flex flex-col justify-center bg-ivory p-12 sm:p-16">
        <h3 className="text-3xl font-light text-ink sm:text-4xl">{name}</h3>
        <p className="mt-5 max-w-md text-base leading-relaxed text-ink/70">{description}</p>
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
