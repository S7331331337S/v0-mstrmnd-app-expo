-- MSTRMND Priority 1 schema
-- users are managed by Supabase Auth in auth.users

create extension if not exists pgcrypto;

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  description text,
  agents_config jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.pipelines (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  nodes jsonb not null default '[]'::jsonb,
  metadata jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.agents (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  name text not null,
  role text,
  provider text,
  model text,
  tools jsonb not null default '[]'::jsonb,
  system_prompt text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.runs (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  pipeline_id uuid references public.pipelines(id) on delete set null,
  status text not null check (status in ('queued', 'running', 'waiting_for_approval', 'completed', 'failed')),
  logs jsonb not null default '[]'::jsonb,
  output jsonb,
  usage jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_projects_user_id on public.projects(user_id);
create index if not exists idx_pipelines_project_id on public.pipelines(project_id);
create index if not exists idx_agents_project_id on public.agents(project_id);
create index if not exists idx_runs_project_id on public.runs(project_id);
create index if not exists idx_runs_created_at on public.runs(created_at desc);

create or replace function public.is_project_owner(target_project_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.projects p
    where p.id = target_project_id
      and p.user_id = auth.uid()
  );
$$;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_projects_updated_at on public.projects;
create trigger set_projects_updated_at
before update on public.projects
for each row execute function public.set_updated_at();

drop trigger if exists set_pipelines_updated_at on public.pipelines;
create trigger set_pipelines_updated_at
before update on public.pipelines
for each row execute function public.set_updated_at();

drop trigger if exists set_agents_updated_at on public.agents;
create trigger set_agents_updated_at
before update on public.agents
for each row execute function public.set_updated_at();

alter table public.projects enable row level security;
alter table public.pipelines enable row level security;
alter table public.agents enable row level security;
alter table public.runs enable row level security;

create policy if not exists "projects_select_own"
on public.projects for select
using (auth.uid() = user_id);

create policy if not exists "projects_insert_own"
on public.projects for insert
with check (auth.uid() = user_id);

create policy if not exists "projects_update_own"
on public.projects for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy if not exists "projects_delete_own"
on public.projects for delete
using (auth.uid() = user_id);

create policy if not exists "pipelines_select_own"
on public.pipelines for select
using (public.is_project_owner(project_id));

create policy if not exists "pipelines_insert_own"
on public.pipelines for insert
with check (public.is_project_owner(project_id));

create policy if not exists "pipelines_update_own"
on public.pipelines for update
using (public.is_project_owner(project_id))
with check (public.is_project_owner(project_id));

create policy if not exists "pipelines_delete_own"
on public.pipelines for delete
using (public.is_project_owner(project_id));

create policy if not exists "agents_select_own"
on public.agents for select
using (public.is_project_owner(project_id));

create policy if not exists "agents_insert_own"
on public.agents for insert
with check (public.is_project_owner(project_id));

create policy if not exists "agents_update_own"
on public.agents for update
using (public.is_project_owner(project_id))
with check (public.is_project_owner(project_id));

create policy if not exists "agents_delete_own"
on public.agents for delete
using (public.is_project_owner(project_id));

create policy if not exists "runs_select_own"
on public.runs for select
using (public.is_project_owner(project_id));

create policy if not exists "runs_insert_own"
on public.runs for insert
with check (public.is_project_owner(project_id));

create policy if not exists "runs_update_own"
on public.runs for update
using (public.is_project_owner(project_id))
with check (public.is_project_owner(project_id));

create policy if not exists "runs_delete_own"
on public.runs for delete
using (public.is_project_owner(project_id));
