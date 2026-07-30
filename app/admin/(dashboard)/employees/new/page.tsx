import { redirect } from "next/navigation";
import { getCurrentEmployee } from "@/lib/supabase/server";
import { inviteEmployee } from "@/lib/actions/employees";

const inputClass = "w-full border border-line px-4 py-3 focus:border-maroon focus:outline-none";

export default async function NewEmployeePage() {
  const currentEmployee = await getCurrentEmployee();
  if (currentEmployee?.role !== "admin") redirect("/admin");

  return (
    <div>
      <h1 className="mb-8 text-2xl font-light text-ink">Invite Employee</h1>
      <form action={inviteEmployee} className="max-w-md space-y-6">
        <div>
          <label className="mb-1 block text-sm font-medium text-ink/70">Full name</label>
          <input required name="full_name" className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-ink/70">Email</label>
          <input required type="email" name="email" className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-ink/70">Role</label>
          <select name="role" defaultValue="agent" className={inputClass}>
            <option value="agent">Agent — manages listings &amp; projects</option>
            <option value="admin">Admin — also manages employees</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-ink px-8 py-3 text-sm font-bold uppercase tracking-wider text-white hover:bg-maroon"
        >
          Send Invite
        </button>
      </form>
    </div>
  );
}
