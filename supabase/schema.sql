-- FESTORA newsletter + private admin access
-- Run this entire script in Supabase Dashboard → SQL Editor.
create extension if not exists pgcrypto;

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now(),
  constraint newsletter_email_format check (email = lower(trim(email)) and email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$')
);

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.newsletter_subscribers enable row level security;
alter table public.admin_users enable row level security;

revoke all on public.newsletter_subscribers from anon, authenticated;
revoke all on public.admin_users from anon, authenticated;
grant insert on public.newsletter_subscribers to anon, authenticated;
grant select, delete on public.newsletter_subscribers to authenticated;
grant select on public.admin_users to authenticated;

drop policy if exists "Anyone can subscribe" on public.newsletter_subscribers;
create policy "Anyone can subscribe"
  on public.newsletter_subscribers for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Admins can view subscribers" on public.newsletter_subscribers;
create policy "Admins can view subscribers"
  on public.newsletter_subscribers for select
  to authenticated
  using (exists (
    select 1 from public.admin_users a where a.user_id = (select auth.uid())
  ));

drop policy if exists "Admins can remove subscribers" on public.newsletter_subscribers;
create policy "Admins can remove subscribers"
  on public.newsletter_subscribers for delete
  to authenticated
  using (exists (
    select 1 from public.admin_users a where a.user_id = (select auth.uid())
  ));

drop policy if exists "Admins can view their own admin record" on public.admin_users;
create policy "Admins can view their own admin record"
  on public.admin_users for select
  to authenticated
  using (user_id = (select auth.uid()));

-- After creating your admin user in Supabase Authentication → Users,
-- replace the email below and run this insert to grant dashboard access:
-- insert into public.admin_users (user_id)
-- select id from auth.users where email = 'YOUR_ADMIN_EMAIL@example.com'
-- on conflict (user_id) do nothing;

-- Note: do not enable public SELECT access and never expose the service_role key.
