-- Migration: initial schema for hug-buddy
-- Tables: article_views, article_reactions, messages

-- =====================================================================
-- article_views: track view count per blog article
-- =====================================================================
create table if not exists public.article_views (
  slug text primary key,
  view_count integer not null default 0,
  last_viewed_at timestamptz default now()
);

-- =====================================================================
-- article_reactions: aggregated reaction counts per article
-- =====================================================================
create table if not exists public.article_reactions (
  id uuid primary key default gen_random_uuid(),
  article_slug text not null,
  reaction_type text not null,
  count integer not null default 0,
  updated_at timestamptz default now(),
  unique (article_slug, reaction_type)
);

create index if not exists article_reactions_slug_idx
  on public.article_reactions (article_slug);

-- =====================================================================
-- messages: community wall notes
-- =====================================================================
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  message text not null,
  patternindex integer not null default 0,
  rotation integer not null default 0,
  user_id uuid,
  creator_name text,
  creator_avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists messages_created_at_idx
  on public.messages (created_at desc);

-- =====================================================================
-- Row Level Security
-- article_views / article_reactions are written via the service-role
-- admin client (which bypasses RLS), but we still enable RLS and add
-- read policies so the anon/public role can read counts.
-- =====================================================================
alter table public.article_views enable row level security;
alter table public.article_reactions enable row level security;
alter table public.messages enable row level security;

-- article_views: public read
drop policy if exists "article_views public read" on public.article_views;
create policy "article_views public read"
  on public.article_views for select
  using (true);

-- article_reactions: public read
drop policy if exists "article_reactions public read" on public.article_reactions;
create policy "article_reactions public read"
  on public.article_reactions for select
  using (true);

-- messages: public read
drop policy if exists "messages public read" on public.messages;
create policy "messages public read"
  on public.messages for select
  using (true);

-- messages: authenticated users can insert
drop policy if exists "messages authenticated insert" on public.messages;
create policy "messages authenticated insert"
  on public.messages for insert
  to authenticated
  with check (true);
