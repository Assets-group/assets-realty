export type Locale = "en" | "ar";

export type PropertyType = "Villa" | "Apartment" | "Penthouse" | "Branded Residence";
export type ListingStatus = "For Sale" | "For Rent" | "Sold" | "Coming Soon";
export type EmployeeRole = "admin" | "agent";

export interface Listing {
  id: string;
  slug: string;
  name_en: string;
  name_ar: string;
  property_type: PropertyType;
  status: ListingStatus;
  area_en: string;
  area_ar: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area_sqm: number;
  description_en: string;
  description_ar: string;
  main_image_url: string | null;
  gallery_urls: string[];
  featured: boolean;
  published: boolean;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface PastProject {
  id: string;
  slug: string;
  name_en: string;
  name_ar: string;
  location_en: string;
  location_ar: string;
  year: string | null;
  description_en: string;
  description_ar: string;
  photo_url: string | null;
  published: boolean;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface Employee {
  id: string;
  full_name: string;
  email: string;
  role: EmployeeRole;
  created_at: string;
}
