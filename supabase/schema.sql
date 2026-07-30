-- ============================================================
-- Assets Realty — Supabase schema
-- Run this once in the Supabase SQL Editor (Dashboard > SQL Editor > New query)
-- ============================================================

-- ---------- EMPLOYEES ----------
-- One row per staff member, linked 1:1 to a Supabase Auth user.
-- role: 'admin' can manage employees + everything else.
--       'agent' can manage listings and past projects only.
create table if not exists employees (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null,
  role text not null default 'agent' check (role in ('admin', 'agent')),
  created_at timestamptz not null default now()
);

-- ---------- LISTINGS ----------
create table if not exists listings (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name_en text not null,
  name_ar text not null,
  property_type text not null check (property_type in ('Villa', 'Apartment', 'Penthouse', 'Branded Residence')),
  status text not null check (status in ('For Sale', 'For Rent', 'Sold', 'Coming Soon')),
  area_en text not null,
  area_ar text not null,
  price numeric not null,
  bedrooms int not null default 0,
  bathrooms int not null default 0,
  area_sqm int not null default 0,
  description_en text default '',
  description_ar text default '',
  main_image_url text,
  gallery_urls text[] default '{}',
  featured boolean not null default false,
  published boolean not null default true,
  created_by uuid references employees(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------- PAST PROJECTS ----------
create table if not exists past_projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name_en text not null,
  name_ar text not null,
  location_en text not null,
  location_ar text not null,
  year text,
  description_en text default '',
  description_ar text default '',
  photo_url text,
  published boolean not null default true,
  created_by uuid references employees(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------- updated_at auto-touch ----------
create or replace function touch_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists listings_touch on listings;
create trigger listings_touch before update on listings
  for each row execute function touch_updated_at();

drop trigger if exists past_projects_touch on past_projects;
create trigger past_projects_touch before update on past_projects
  for each row execute function touch_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY
-- Public visitors: read-only, published rows only.
-- Logged-in employees: full read/write on listings & past_projects.
-- Only admins: manage the employees table.
-- ============================================================

alter table employees enable row level security;
alter table listings enable row level security;
alter table past_projects enable row level security;

-- Helper: is the current user an employee, and are they an admin?
create or replace function is_employee()
returns boolean as $$
  select exists (select 1 from employees where id = auth.uid());
$$ language sql stable security definer;

create or replace function is_admin()
returns boolean as $$
  select exists (select 1 from employees where id = auth.uid() and role = 'admin');
$$ language sql stable security definer;

-- Listings policies
create policy "Public can view published listings"
  on listings for select
  using (published = true or is_employee());

create policy "Employees can insert listings"
  on listings for insert
  with check (is_employee());

create policy "Employees can update listings"
  on listings for update
  using (is_employee());

create policy "Employees can delete listings"
  on listings for delete
  using (is_employee());

-- Past projects policies
create policy "Public can view published past projects"
  on past_projects for select
  using (published = true or is_employee());

create policy "Employees can insert past projects"
  on past_projects for insert
  with check (is_employee());

create policy "Employees can update past projects"
  on past_projects for update
  using (is_employee());

create policy "Employees can delete past projects"
  on past_projects for delete
  using (is_employee());

-- Employees policies
create policy "Employees can view the employee list"
  on employees for select
  using (is_employee());

create policy "Admins can insert employees"
  on employees for insert
  with check (is_admin());

create policy "Admins can update employees"
  on employees for update
  using (is_admin());

create policy "Admins can delete employees"
  on employees for delete
  using (is_admin());

-- ============================================================
-- STORAGE
-- Two public buckets for photos. Public can view; only employees can upload.
-- ============================================================

insert into storage.buckets (id, name, public)
values ('listing-photos', 'listing-photos', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('project-photos', 'project-photos', true)
on conflict (id) do nothing;

create policy "Public can view listing photos"
  on storage.objects for select
  using (bucket_id = 'listing-photos');

create policy "Employees can upload listing photos"
  on storage.objects for insert
  with check (bucket_id = 'listing-photos' and is_employee());

create policy "Employees can delete listing photos"
  on storage.objects for delete
  using (bucket_id = 'listing-photos' and is_employee());

create policy "Public can view project photos"
  on storage.objects for select
  using (bucket_id = 'project-photos');

create policy "Employees can upload project photos"
  on storage.objects for insert
  with check (bucket_id = 'project-photos' and is_employee());

create policy "Employees can delete project photos"
  on storage.objects for delete
  using (bucket_id = 'project-photos' and is_employee());

-- ============================================================
-- FIRST ADMIN
-- After you sign up your first user through Supabase Auth (or the
-- /admin/login "forgot password" flow set up manually in the Dashboard),
-- run this once with that user's real UUID and email to make them admin:
--
-- insert into employees (id, full_name, email, role)
-- values ('paste-user-uuid-here', 'Your Name', 'you@assets-group.com', 'admin');
-- ============================================================
