
-- 1. Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- 2. Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (user_id, role)
);

-- 3. Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 4. Users can only read their own roles
CREATE POLICY "Users can view own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- 5. Security definer function for role checks
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- 6. Auto-assign 'user' role on signup
CREATE OR REPLACE FUNCTION public.handle_new_user_role()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created_role
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_role();

-- 7. Drop existing catch-all policies
DROP POLICY IF EXISTS "Authenticated users can manage assignments" ON public.asset_assignments;
DROP POLICY IF EXISTS "Authenticated users can manage categories" ON public.asset_categories;
DROP POLICY IF EXISTS "Authenticated users can manage assets" ON public.assets;
DROP POLICY IF EXISTS "Authenticated users can manage employees" ON public.employees;

-- 8. Granular policies for asset_categories
CREATE POLICY "Authenticated users can select categories"
  ON public.asset_categories FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert categories"
  ON public.asset_categories FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update categories"
  ON public.asset_categories FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins can delete categories"
  ON public.asset_categories FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 9. Granular policies for employees
CREATE POLICY "Authenticated users can select employees"
  ON public.employees FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert employees"
  ON public.employees FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update employees"
  ON public.employees FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins can delete employees"
  ON public.employees FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 10. Granular policies for assets
CREATE POLICY "Authenticated users can select assets"
  ON public.assets FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert assets"
  ON public.assets FOR INSERT TO authenticated
  WITH CHECK (created_by = auth.uid());
CREATE POLICY "Authenticated users can update assets"
  ON public.assets FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins can delete assets"
  ON public.assets FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 11. Granular policies for asset_assignments
CREATE POLICY "Authenticated users can select assignments"
  ON public.asset_assignments FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert assignments"
  ON public.asset_assignments FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update assignments"
  ON public.asset_assignments FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins can delete assignments"
  ON public.asset_assignments FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
