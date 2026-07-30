import type { Listing } from "@/lib/types";
import { saveListing } from "@/lib/actions/listings";
import ImageUploader from "./ImageUploader";

const TYPES = ["Villa", "Apartment", "Penthouse", "Branded Residence"];
const STATUSES = ["For Sale", "For Rent", "Sold", "Coming Soon"];

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-ink/70">{label}</label>
      {children}
    </div>
  );
}

const inputClass = "w-full border border-line px-4 py-3 focus:border-maroon focus:outline-none";

export default function ListingForm({ listing }: { listing?: Listing }) {
  return (
    <form action={saveListing} className="max-w-3xl space-y-8">
      {listing && <input type="hidden" name="id" value={listing.id} />}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="Name (English)">
          <input
            required
            name="name_en"
            defaultValue={listing?.name_en}
            className={inputClass}
          />
        </Field>
        <Field label="Name (Arabic)">
          <input
            required
            name="name_ar"
            dir="rtl"
            defaultValue={listing?.name_ar}
            className={inputClass}
          />
        </Field>
        <Field label="Slug (leave blank to auto-generate)">
          <input name="slug" defaultValue={listing?.slug} className={inputClass} />
        </Field>
        <Field label="Property Type">
          <select
            name="property_type"
            defaultValue={listing?.property_type ?? TYPES[0]}
            className={inputClass}
          >
            {TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Status">
          <select
            name="status"
            defaultValue={listing?.status ?? STATUSES[0]}
            className={inputClass}
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Price (SAR)">
          <input
            required
            type="number"
            name="price"
            defaultValue={listing?.price}
            className={inputClass}
          />
        </Field>
        <Field label="Area (English, e.g. Al Shati)">
          <input
            required
            name="area_en"
            defaultValue={listing?.area_en}
            className={inputClass}
          />
        </Field>
        <Field label="Area (Arabic)">
          <input
            required
            name="area_ar"
            dir="rtl"
            defaultValue={listing?.area_ar}
            className={inputClass}
          />
        </Field>
        <Field label="Bedrooms">
          <input
            required
            type="number"
            name="bedrooms"
            defaultValue={listing?.bedrooms ?? 0}
            className={inputClass}
          />
        </Field>
        <Field label="Bathrooms">
          <input
            required
            type="number"
            name="bathrooms"
            defaultValue={listing?.bathrooms ?? 0}
            className={inputClass}
          />
        </Field>
        <Field label="Area (sqm)">
          <input
            required
            type="number"
            name="area_sqm"
            defaultValue={listing?.area_sqm ?? 0}
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="Description (English)">
        <textarea
          name="description_en"
          rows={4}
          defaultValue={listing?.description_en}
          className={inputClass}
        />
      </Field>
      <Field label="Description (Arabic)">
        <textarea
          name="description_ar"
          dir="rtl"
          rows={4}
          defaultValue={listing?.description_ar}
          className={inputClass}
        />
      </Field>

      <ImageUploader
        bucket="listing-photos"
        name="main_image_url"
        label="Main photo"
        defaultValue={listing?.main_image_url ?? undefined}
      />
      <ImageUploader
        bucket="listing-photos"
        name="gallery_urls"
        label="Gallery photos (optional, multiple)"
        multiple
      />

      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 text-sm font-medium text-ink/70">
          <input type="checkbox" name="featured" defaultChecked={listing?.featured} />
          Featured
        </label>
        <label className="flex items-center gap-2 text-sm font-medium text-ink/70">
          <input
            type="checkbox"
            name="published"
            defaultChecked={listing?.published ?? true}
          />
          Published (visible on the live site)
        </label>
      </div>

      <button
        type="submit"
        className="bg-ink px-8 py-3 text-sm font-bold uppercase tracking-wider text-white hover:bg-maroon"
      >
        Save Listing
      </button>
    </form>
  );
}
