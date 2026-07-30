import type { PastProject } from "@/lib/types";
import { savePastProject } from "@/lib/actions/pastProjects";
import ImageUploader from "./ImageUploader";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-ink/70">{label}</label>
      {children}
    </div>
  );
}

const inputClass = "w-full border border-line px-4 py-3 focus:border-maroon focus:outline-none";

export default function ProjectForm({ project }: { project?: PastProject }) {
  return (
    <form action={savePastProject} className="max-w-2xl space-y-8">
      {project && <input type="hidden" name="id" value={project.id} />}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="Name (English)">
          <input required name="name_en" defaultValue={project?.name_en} className={inputClass} />
        </Field>
        <Field label="Name (Arabic)">
          <input
            required
            name="name_ar"
            dir="rtl"
            defaultValue={project?.name_ar}
            className={inputClass}
          />
        </Field>
        <Field label="Slug (leave blank to auto-generate)">
          <input name="slug" defaultValue={project?.slug} className={inputClass} />
        </Field>
        <Field label="Year">
          <input name="year" defaultValue={project?.year ?? ""} className={inputClass} />
        </Field>
        <Field label="Location (English)">
          <input
            required
            name="location_en"
            defaultValue={project?.location_en}
            className={inputClass}
          />
        </Field>
        <Field label="Location (Arabic)">
          <input
            required
            name="location_ar"
            dir="rtl"
            defaultValue={project?.location_ar}
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="Description (English)">
        <textarea
          name="description_en"
          rows={4}
          defaultValue={project?.description_en}
          className={inputClass}
        />
      </Field>
      <Field label="Description (Arabic)">
        <textarea
          name="description_ar"
          dir="rtl"
          rows={4}
          defaultValue={project?.description_ar}
          className={inputClass}
        />
      </Field>

      <ImageUploader
        bucket="project-photos"
        name="photo_url"
        label="Photo"
        defaultValue={project?.photo_url ?? undefined}
      />

      <label className="flex items-center gap-2 text-sm font-medium text-ink/70">
        <input type="checkbox" name="published" defaultChecked={project?.published ?? true} />
        Published (visible on the live site)
      </label>

      <button
        type="submit"
        className="bg-ink px-8 py-3 text-sm font-bold uppercase tracking-wider text-white hover:bg-maroon"
      >
        Save Project
      </button>
    </form>
  );
}
