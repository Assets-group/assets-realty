import Link from "next/link";
import type { Employee } from "@/lib/types";
import SignOutButton from "./SignOutButton";

export default function AdminSidebar({ employee }: { employee: Employee }) {
  const links = [
    { href: "/admin", label: "Overview" },
    { href: "/admin/listings", label: "Listings" },
    { href: "/admin/past-projects", label: "Past Projects" },
    { href: "/admin/current-projects", label: "Current Projects" },
    { href: "/admin/blog", label: "Blog" },
    { href: "/admin/inquiries", label: "Inquiries" },
  ];

  if (employee.role === "admin") {
    links.push({ href: "/admin/employees", label: "Employees" });
  }

  return (
    <aside className="flex w-64 flex-col justify-between border-r border-line bg-ink px-6 py-8 text-white">
      <div>
        <p className="mb-10 text-lg font-extrabold tracking-wide">
          ASSET<span className="text-rose">S</span>
        </p>
        <nav className="space-y-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-3 py-2.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div>
        <p className="mb-2 truncate text-xs text-white/50">{employee.email}</p>
        <SignOutButton />
      </div>
    </aside>
  );
}
