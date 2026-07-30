import { createClient } from "@/lib/supabase/server";
import type { Inquiry, Listing } from "@/lib/types";
import InquiryRow from "@/components/admin/InquiryRow";

export default async function AdminInquiriesPage() {
  const supabase = createClient();

  const { data: inquiries } = await supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  const listingIds = [
    ...new Set((inquiries as Inquiry[] | null)?.map((i) => i.listing_id).filter(Boolean)),
  ] as string[];

  let listingsById: Record<string, Listing> = {};
  if (listingIds.length) {
    const { data: listings } = await supabase
      .from("listings")
      .select("id, name_en")
      .in("id", listingIds);
    listingsById = Object.fromEntries((listings ?? []).map((l) => [l.id, l as Listing]));
  }

  return (
    <div>
      <h1 className="text-2xl font-light text-ink">Inquiries</h1>

      <div className="mt-8 overflow-hidden border border-line bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-line bg-cream/60 text-xs uppercase tracking-wider text-ink/50">
            <tr>
              <th className="px-5 py-3"></th>
              <th className="px-5 py-3">From</th>
              <th className="px-5 py-3">Message</th>
              <th className="px-5 py-3">Regarding</th>
              <th className="px-5 py-3">Received</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {(inquiries as Inquiry[] | null)?.map((inquiry) => (
              <InquiryRow
                key={inquiry.id}
                inquiry={inquiry}
                listingName={
                  inquiry.listing_id ? listingsById[inquiry.listing_id]?.name_en : undefined
                }
              />
            ))}
            {!inquiries?.length && (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-ink/50">
                  No inquiries yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
