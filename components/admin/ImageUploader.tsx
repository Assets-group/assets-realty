"use client";

import { useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

export default function ImageUploader({
  bucket,
  name,
  label,
  defaultValue,
  multiple = false,
}: {
  bucket: "listing-photos" | "project-photos";
  name: string;
  label: string;
  defaultValue?: string;
  multiple?: boolean;
}) {
  const [urls, setUrls] = useState<string[]>(defaultValue ? [defaultValue] : []);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    setError(null);

    const supabase = createClient();
    const newUrls: string[] = [];

    for (const file of Array.from(files)) {
      const path = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
      const { error: uploadError } = await supabase.storage.from(bucket).upload(path, file);

      if (uploadError) {
        setError(uploadError.message);
        continue;
      }

      const { data } = supabase.storage.from(bucket).getPublicUrl(path);
      newUrls.push(data.publicUrl);
    }

    setUrls((prev) => (multiple ? [...prev, ...newUrls] : newUrls));
    setUploading(false);
  }

  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-ink/70">{label}</label>
      <input
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={(e) => handleFiles(e.target.files)}
        className="block w-full text-sm text-ink/70 file:mr-4 file:border-0 file:bg-ink file:px-4 file:py-2 file:text-sm file:font-bold file:uppercase file:text-white hover:file:bg-maroon"
      />
      {uploading && <p className="mt-2 text-sm text-ink/50">Uploading…</p>}
      {error && <p className="mt-2 text-sm text-maroon">{error}</p>}
      {urls.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {urls.map((url) => (
            <div key={url} className="relative h-20 w-20 overflow-hidden bg-ink/5">
              <Image src={url} alt="" fill className="object-cover" />
            </div>
          ))}
        </div>
      )}
      {/* Hidden field(s) carrying the uploaded URL(s) into the form submission */}
      <input type="hidden" name={name} value={multiple ? urls.join(",") : urls[0] ?? ""} />
    </div>
  );
}
