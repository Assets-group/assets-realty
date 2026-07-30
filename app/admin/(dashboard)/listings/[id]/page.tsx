import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Listing } from "@/lib/types";
import ListingForm from "@/components/admin/ListingForm";

export default async function EditListingPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: listing } = await supabase
    .from("listings")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!listing) notFound();

  return (
    <div>
      <h1 className="mb-8 text-2xl font-light text-ink">Edit Listing</h1>
      <ListingForm listing={listing as Listing} />
    </div>
  );
}
