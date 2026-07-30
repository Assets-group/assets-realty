import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Listing } from "@/lib/types";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteListing } from "@/lib/actions/listings";

export default async function AdminListingsPage() {
  const supabase = createClient();
  const { data: listings } = await supabase
    .from("listings")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-light text-ink">Listings</h1>
        <Link
          href="/admin/listings/new"
          className="bg-ink px-6 py-3 text-sm font-bold uppercase tracking-wider text-white hover:bg-maroon"
        >
          + Add Listing
        </Link>
      </div>

      <div className="mt-8 overflow-hidden border border-line bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-line bg-cream/60 text-xs uppercase tracking-wider text-ink/50">
            <tr>
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Type</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Price</th>
              <th className="px-5 py-3">Published</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {(listings as Listing[] | null)?.map((listing) => (
              <tr key={listing.id} className="border-b border-line last:border-0">
                <td className="px-5 py-4 font-medium text-ink">{listing.name_en}</td>
                <td className="px-5 py-4 text-ink/70">{listing.property_type}</td>
                <td className="px-5 py-4 text-ink/70">{listing.status}</td>
                <td className="px-5 py-4 text-ink/70">
                  SAR {listing.price.toLocaleString("en-US")}
                </td>
                <td className="px-5 py-4">
                  {listing.published ? (
                    <span className="text-green-700">Yes</span>
                  ) : (
                    <span className="text-ink/40">Draft</span>
                  )}
                </td>
                <td className="px-5 py-4 text-right">
                  <Link
                    href={`/admin/listings/${listing.id}`}
                    className="mr-4 font-medium text-maroon hover:underline"
                  >
                    Edit
                  </Link>
                  <DeleteButton id={listing.id} action={deleteListing} label="listing" />
                </td>
              </tr>
            ))}
            {!listings?.length && (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-ink/50">
                  No listings yet — add your first one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
