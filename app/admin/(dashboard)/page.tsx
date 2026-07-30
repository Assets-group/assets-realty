import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getCurrentEmployee } from "@/lib/supabase/server";

export default async function AdminHome() {
  const supabase = createClient();
  const employee = await getCurrentEmployee();

  const [{ count: listingsCount }, { count: projectsCount }] = await Promise.all([
    supabase.from("listings").select("*", { count: "exact", head: true }),
    supabase.from("past_projects").select("*", { count: "exact", head: true }),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-light text-ink">Welcome, {employee?.full_name?.split(" ")[0]}</h1>
      <p className="mt-1 text-ink/60">Here's what's on the site right now.</p>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Link
          href="/admin/listings"
          className="border border-line bg-white p-8 transition-colors hover:border-maroon"
        >
          <p className="text-4xl font-light text-ink">{listingsCount ?? 0}</p>
          <p className="mt-2 text-sm font-bold uppercase tracking-wider text-maroon">Listings</p>
        </Link>
        <Link
          href="/admin/past-projects"
          className="border border-line bg-white p-8 transition-colors hover:border-maroon"
        >
          <p className="text-4xl font-light text-ink">{projectsCount ?? 0}</p>
          <p className="mt-2 text-sm font-bold uppercase tracking-wider text-maroon">
            Past Projects
          </p>
        </Link>
      </div>
    </div>
  );
}
