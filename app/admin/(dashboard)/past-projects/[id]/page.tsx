import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { PastProject } from "@/lib/types";
import ProjectForm from "@/components/admin/ProjectForm";

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: project } = await supabase
    .from("past_projects")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!project) notFound();

  return (
    <div>
      <h1 className="mb-8 text-2xl font-light text-ink">Edit Past Project</h1>
      <ProjectForm project={project as PastProject} />
    </div>
  );
}
