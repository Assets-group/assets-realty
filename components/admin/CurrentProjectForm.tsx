import type { CurrentProject } from "@/lib/types";
import { saveCurrentProject } from "@/lib/actions/currentProjects";
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

export default function CurrentProjectForm({ project }: { project?: CurrentProject }) {
  return (
    <form action={saveCurrentProject} className="max-w-2xl space-y-8">
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
        <Field label="Order (lower shows first)">
          <input
            type="number"
            name="sort_order"
            defaultValue={project?.sort_order ?? 0}
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="Short description (English) — shown in the homepage slideshow">
        <textarea
          name="description_en"
          rows={3}
          defaultValue={project?.description_en}
          className={inputClass}
        />
      </Field>
      <Field label="Short description (Arabic)">
        <textarea
          name="description_ar"
          dir="rtl"
          rows={3}
          defaultValue={project?.description_ar}
          className={inputClass}
        />
      </Field>

      <Field label="Full details (English) — shown on the project's own page">
        <textarea
          name="body_en"
          rows={10}
          defaultValue={project?.body_en}
          className={inputClass}
        />
      </Field>
      <Field label="Full details (Arabic)">
        <textarea
          name="body_ar"
          dir="rtl"
          rows={10}
          defaultValue={project?.body_ar}
          className={inputClass}
        />
      </Field>

      <ImageUploader
        bucket="project-photos"
        name="image_url"
        label="Main Image"
        defaultValue={project?.image_url ?? undefined}
      />
      <ImageUploader
        bucket="project-photos"
        name="gallery_urls"
        label="Gallery photos (optional, multiple)"
        multiple
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
