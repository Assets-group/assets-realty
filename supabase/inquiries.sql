-- ============================================================
-- Contact form inquiries
-- ============================================================

create table if not exists inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  listing_id uuid references listings(id) on delete set null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

alter table inquiries enable row level security;

create policy "Anyone can submit an inquiry"
  on inquiries for insert
  with check (true);

create policy "Employees can view inquiries"
  on inquiries for select
  using (is_employee());

create policy "Employees can update inquiries"
  on inquiries for update
  using (is_employee());

create policy "Employees can delete inquiries"
  on inquiries for delete
  using (is_employee());
