-- ============================================================
-- Current projects (homepage slideshow)
-- ============================================================

create table if not exists current_projects (
  id uuid primary key default gen_random_uuid(),
  name_en text not null,
  name_ar text not null,
  description_en text default '',
  description_ar text default '',
  image_url text,
  sort_order integer not null default 0,
  published boolean not null default true,
  created_by uuid references employees(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists current_projects_touch on current_projects;
create trigger current_projects_touch before update on current_projects
  for each row execute function touch_updated_at();

alter table current_projects enable row level security;

create policy "Public can view published current projects"
  on current_projects for select
  using (published = true or is_employee());

create policy "Employees can insert current projects"
  on current_projects for insert
  with check (is_employee());

create policy "Employees can update current projects"
  on current_projects for update
  using (is_employee());

create policy "Employees can delete current projects"
  on current_projects for delete
  using (is_employee());
