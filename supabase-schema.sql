-- =============================================
-- DressIA — Schéma Supabase
-- À coller dans l'éditeur SQL de Supabase
-- =============================================

create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  city text default 'Lausanne',
  is_premium boolean default false,
  stripe_customer_id text,
  stripe_subscription_id text,
  created_at timestamp with time zone default timezone('utc', now())
);

create or seplace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;