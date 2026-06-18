-- Run this in the Supabase SQL editor.

create table if not exists public.admin_videos (
  id text primary key,
  title_en text not null,
  title_am text not null,
  thumb text not null,
  youtube_url text,
  duration text not null default '00:00',
  views integer not null default 0,
  channel text not null default 'Shamo Admin',
  channel_am text not null default 'ሻሞ አስተዳዳሪ',
  category text not null,
  posted_days integer not null default 0,
  status text not null default 'Draft',
  created_at_label text not null default 'Just now',
  keywords text not null default '',
  description_en text not null default '',
  description_am text not null default '',
  share_to jsonb not null default '[]'::jsonb,
  source text not null default 'admin',
  inserted_at timestamptz not null default now()
);

create table if not exists public.job_registrations (
  id text primary key,
  created_at timestamptz not null default now(),
  first_name text,
  last_name text,
  gender text,
  age integer,
  last_worked_in text,
  profession text not null,
  sub_city text not null,
  mobile1 text,
  mobile2 text,
  has_job text,
  name text not null,
  phone text not null,
  status text not null default 'New'
);

create table if not exists public.admin_settings (
  id integer primary key,
  site_title text not null,
  support_email text not null,
  default_language text not null default 'en',
  auto_publish boolean not null default false,
  notify_on_registration boolean not null default true
);

insert into public.admin_settings (id, site_title, support_email, default_language, auto_publish, notify_on_registration)
values (1, 'Shamo Business Portal', 'admin@shamobusiness.com', 'en', false, true)
on conflict (id) do nothing;

alter table public.admin_videos enable row level security;
alter table public.job_registrations enable row level security;
alter table public.admin_settings enable row level security;

drop policy if exists "public read admin_videos" on public.admin_videos;
create policy "public read admin_videos"
on public.admin_videos for select
using (true);

drop policy if exists "service role full admin_videos" on public.admin_videos;
create policy "service role full admin_videos"
on public.admin_videos for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');

drop policy if exists "service role full admin_settings" on public.admin_settings;
create policy "service role full admin_settings"
on public.admin_settings for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');

drop policy if exists "service role full job_registrations" on public.job_registrations;
create policy "service role full job_registrations"
on public.job_registrations for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');

drop policy if exists "public insert job_registrations" on public.job_registrations;
create policy "public insert job_registrations"
on public.job_registrations for insert
with check (true);

drop policy if exists "service role select job_registrations" on public.job_registrations;
create policy "service role select job_registrations"
on public.job_registrations for select
using (auth.role() = 'service_role');