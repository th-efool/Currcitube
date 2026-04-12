-- Drop if partially created from previous attempt
drop table if exists public.asset_assignments cascade;
drop table if exists public.assets cascade;
drop table if exists public.employees cascade;
drop table if exists public.asset_categories cascade;
drop type if exists public.asset_condition cascade;

-- Asset condition enum
create type public.asset_condition as enum ('excellent', 'good', 'fair', 'poor', 'retired');

-- Asset categories
create table public.asset_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  default_useful_life_years integer not null default 3,
  created_at timestamptz not null default now()
);

-- Employees
create table public.employees (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  department text,
  email text,
  created_at timestamptz not null default now()
);

-- Assets
create table public.assets (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category_id uuid references public.asset_categories(id) on delete set null,
  serial_number text,
  purchase_date date not null,
  purchase_cost numeric(12,2) not null default 0,
  condition public.asset_condition not null default 'good',
  location text,
  notes text,
  useful_life_years integer not null default 3,
  residual_value_percent numeric(5,2) not null default 0,
  is_archived boolean not null default false,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Assignment history
create table public.asset_assignments (
  id uuid primary key default gen_random_uuid(),
  asset_id uuid not null references public.assets(id) on delete cascade,
  employee_id uuid not null references public.employees(id) on delete cascade,
  assigned_date timestamptz not null default now(),
  returned_date timestamptz,
  notes text,
  created_at timestamptz not null default now()
);

-- Indexes
create index idx_assets_category on public.assets(category_id);
create index idx_assets_condition on public.assets(condition);
create index idx_assets_archived on public.assets(is_archived);
create index idx_assignments_asset on public.asset_assignments(asset_id);
create index idx_assignments_employee on public.asset_assignments(employee_id);
create unique index idx_assets_serial on public.assets(serial_number) where serial_number is not null;

-- Enable RLS
alter table public.asset_categories enable row level security;
alter table public.employees enable row level security;
alter table public.assets enable row level security;
alter table public.asset_assignments enable row level security;

-- RLS policies
create policy "Authenticated users can manage categories" on public.asset_categories for all to authenticated using (true) with check (true);
create policy "Authenticated users can manage employees" on public.employees for all to authenticated using (true) with check (true);
create policy "Authenticated users can manage assets" on public.assets for all to authenticated using (true) with check (true);
create policy "Authenticated users can manage assignments" on public.asset_assignments for all to authenticated using (true) with check (true);

-- Seed default categories
insert into public.asset_categories (name, default_useful_life_years) values
  ('Hardware', 3),
  ('Furniture', 7),
  ('Software licenses', 3),
  ('Office equipment', 5),
  ('Vehicles', 5);