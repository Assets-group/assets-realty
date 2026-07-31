import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { CurrentProject } from "@/lib/types";
import CurrentProjectForm from "@/components/admin/CurrentProjectForm";

export default async function EditCurrentProjectPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: project } = await supabase
    .from("current_projects")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!project) notFound();

  return (
    <div>
      <h1 className="mb-8 text-2xl font-light text-ink">Edit Current Project</h1>
      <CurrentProjectForm project={project as CurrentProject} />
    </div>
  );
}
