-- MSTRMND Core Schema

create table organizations (
  id uuid primary key default gen_random_uuid(),
  name text,
  created_at timestamptz default now()
);

create table projects (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id),
  user_id uuid references auth.users(id),
  name text not null,
  slug text,
  status text default 'draft',
  created_at timestamptz default now()
);

create table agents (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id),
  user_id uuid references auth.users(id),
  name text not null,
  role text,
  provider text,
  model text,
  tools jsonb,
  config jsonb,
  created_at timestamptz default now()
);

create table pipelines (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id),
  user_id uuid references auth.users(id),
  graph jsonb,
  created_at timestamptz default now()
);

create table runs (
  id uuid primary key default gen_random_uuid(),
  pipeline_id uuid references pipelines(id),
  user_id uuid references auth.users(id),
  status text,
  logs jsonb,
  output jsonb,
  usage jsonb,
  created_at timestamptz default now()
);

-- Row-level security
alter table projects enable row level security;
alter table agents enable row level security;
alter table pipelines enable row level security;
alter table runs enable row level security;

create policy "Users own their projects"
  on projects for all
  using (auth.uid() = user_id);

create policy "Users own their agents"
  on agents for all
  using (auth.uid() = user_id);

create policy "Users own their pipelines"
  on pipelines for all
  using (auth.uid() = user_id);

create policy "Users own their runs"
  on runs for all
  using (auth.uid() = user_id);
