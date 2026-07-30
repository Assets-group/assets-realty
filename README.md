# Assets Realty

A bilingual (English/Arabic), Sotheby's-style real estate site with a
built-in admin dashboard for managing listings, past projects, and staff
accounts — no coding required day-to-day.

**Stack:** Next.js (App Router) · Supabase (database, auth, storage) · Tailwind CSS · Vercel

---

## 1. Create your Supabase project

1. Go to [supabase.com](https://supabase.com) → New Project.
2. Once it's created, go to **Project Settings → API**. You'll need three values in a minute:
   - Project URL
   - `anon` `public` key
   - `service_role` key (keep this one secret — never share it or put it in the browser)

## 2. Set up the database

1. In your Supabase project, open **SQL Editor → New query**.
2. Copy the entire contents of `supabase/schema.sql` from this project and run it.
   This creates the `listings`, `past_projects`, and `employees` tables, sets up
   security rules (so only logged-in staff can edit content), and creates the
   photo storage buckets.

## 3. Create your first admin account

1. In Supabase, go to **Authentication → Users → Add user** (create a user
   with your email and a password, or use "Send invite").
2. Copy that user's **UUID** from the users list.
3. Back in **SQL Editor**, run (replacing the placeholders):

   ```sql
   insert into employees (id, full_name, email, role)
   values ('paste-the-uuid-here', 'Your Name', 'you@assets-group.com', 'admin');
   ```

You can now sign in to `/admin/login` with that email and password, and
you'll have full admin access — including inviting other employees directly
from the dashboard (Employees → Invite Employee) from then on.

## 4. Configure environment variables locally

1. Copy `.env.local.example` to `.env.local`.
2. Fill in the three values from step 1.

```bash
cp .env.local.example .env.local
```

## 5. Run it locally

```bash
npm install
npm run dev
```

- Public site: `http://localhost:3000/en` (or `/ar`)
- Admin dashboard: `http://localhost:3000/admin/login`

## 6. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/assets-realty.git
git push -u origin main
```

## 7. Deploy on Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and import the GitHub repo.
2. In the import screen, add the same three environment variables from your
   `.env.local` (Vercel → Environment Variables).
3. Deploy. Vercel will give you a live URL, and you can connect your real
   domain (assets-group.com) under **Project Settings → Domains** whenever
   you're ready to cut over.

---

## Day-to-day use (no coding)

- **Add/edit a listing:** `/admin/listings` → Add Listing. Upload the main
  photo and gallery photos directly in the form.
- **Add/edit a past project:** `/admin/past-projects` → Add Project.
- **Add a staff member:** `/admin/employees` → Invite Employee (admins only).
  They'll get an email to set their own password.
- **Unpublish something without deleting it:** uncheck "Published" on the
  listing/project — it disappears from the public site but stays in the
  dashboard.

## Project structure

```
app/
  [locale]/          Public site (en/ar) — home, residences, past-projects, about, contact
  admin/
    login/           Sign-in page
    (dashboard)/     Everything behind auth — listings, projects, employees
components/
  public/            Nav, Footer, listing/project cards, filters
  admin/             Sidebar, forms, image uploader, delete/role controls
lib/
  supabase/          Browser client, server client, auth middleware
  actions/           Server actions — all the actual create/update/delete logic
  types.ts           Shared TypeScript types
  dictionary.ts      English/Arabic UI text
supabase/
  schema.sql         Run this once in Supabase's SQL editor
```

## Notes / things to revisit before going fully live

- The contact form on `/contact` currently just shows a success message —
  wire it to a Supabase table or an email service (e.g. Resend) before launch.
- Row Level Security is already configured so the public can only ever
  *read* published content, and only signed-in employees can write — you
  don't need to change this unless your access model changes.
- Employee invites require `SUPABASE_SERVICE_ROLE_KEY` to be set correctly
  on Vercel — double check it's there if invites fail in production.
