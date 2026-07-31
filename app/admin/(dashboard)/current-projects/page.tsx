import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { CurrentProject } from "@/lib/types";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteCurrentProject } from "@/lib/actions/currentProjects";

export default async function AdminCurrentProjectsPage() {
  const supabase = createClient();
  const { data: projects } = await supabase
    .from("current_projects")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-light text-ink">Current Projects</h1>
        <Link
          href="/admin/current-projects/new"
          className="bg-ink px-6 py-3 text-sm font-bold uppercase tracking-wider text-white hover:bg-maroon"
        >
          + Add Project
        </Link>
      </div>

      <div className="mt-8 overflow-hidden border border-line bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-line bg-cream/60 text-xs uppercase tracking-wider text-ink/50">
            <tr>
              <th className="px-5 py-3">Order</th>
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Published</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {(projects as CurrentProject[] | null)?.map((project) => (
              <tr key={project.id} className="border-b border-line last:border-0">
                <td className="px-5 py-4 text-ink/70">{project.sort_order}</td>
                <td className="px-5 py-4 font-medium text-ink">{project.name_en}</td>
                <td className="px-5 py-4">
                  {project.published ? (
                    <span className="text-green-700">Yes</span>
                  ) : (
                    <span className="text-ink/40">Draft</span>
                  )}
                </td>
                <td className="px-5 py-4 text-right">
                  <Link
                    href={`/admin/current-projects/${project.id}`}
                    className="mr-4 font-medium text-maroon hover:underline"
                  >
                    Edit
                  </Link>
                  <DeleteButton id={project.id} action={deleteCurrentProject} label="project" />
                </td>
              </tr>
            ))}
            {!projects?.length && (
              <tr>
                <td colSpan={4} className="px-5 py-10 text-center text-ink/50">
                  No current projects yet — add your first one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
