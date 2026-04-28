-- MSTRMND Core Schema

create table organizations (
  id uuid primary key default gen_random_uuid(),
  name text,
  created_at timestamptz default now()
);

create table projects (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id),
  name text,
  slug text,
  created_at timestamptz default now()
);

create table agents (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id),
  name text,
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
  graph jsonb,
  created_at timestamptz default now()
);

create table runs (
  id uuid primary key default gen_random_uuid(),
  pipeline_id uuid references pipelines(id),
  status text,
  logs jsonb,
  output jsonb,
  usage jsonb,
  created_at timestamptz default now()
);
