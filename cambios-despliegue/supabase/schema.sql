-- Estructura de referencia, deducida de las consultas del código.
-- Ejecútala en Supabase > SQL Editor SOLO si usas un proyecto nuevo.
-- Si ya tienes las tablas funcionando, no la ejecutes.

create table if not exists public.mascotas (
  id bigint generated always as identity primary key,
  nombre text not null,
  tipo text not null,
  fecha_llegada date not null
);

create table if not exists public.registros (
  id bigint generated always as identity primary key,
  mascota_id bigint not null references public.mascotas(id) on delete cascade,
  fecha timestamptz not null default now(),
  animo text,
  comio text,
  exploro text,
  interactuo text,
  observacion text
);

-- Seguridad a nivel de fila (RLS)
alter table public.mascotas enable row level security;
alter table public.registros enable row level security;

-- ATENCIÓN: como la app no tiene inicio de sesión, estas políticas permiten
-- que cualquier visitante lea y escriba. Es aceptable para un prototipo,
-- pero no para datos reales. Mejora: usar Supabase Auth (inicio anónimo),
-- agregar una columna user_id y limitar cada política a auth.uid() = user_id.

create policy "mascotas abiertas" on public.mascotas
  for all to anon using (true) with check (true);

create policy "registros abiertos" on public.registros
  for all to anon using (true) with check (true);
