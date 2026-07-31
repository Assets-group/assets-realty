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
    }, 5000);
    return () => clearInterval(timer);
  }, [projects.length]);

  if (!projects.length) return null;

  const project = projects[index];
  const name = locale === "en" ? project.name_en : project.name_ar;
  const description = locale === "en" ? project.description_en : project.description_ar;

  return (
    <div className="grid grid-cols-1 overflow-hidden border border-line md:grid-cols-2">
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
      <div className="flex flex-col justify-center bg-ivory p-10 sm:p-14">
        <h3 className="text-2xl font-light text-ink sm:text-3xl">{name}</h3>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/70">{description}</p>
        {projects.length > 1 && (
          <div className="mt-8 flex gap-2">
            {projects.map((p, i) => (
              <button
                key={p.id}
                aria-label={`Show project ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-8 bg-gold" : "w-1.5 bg-ink/20"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
