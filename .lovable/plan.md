

## Plan: Security hardening with RLS and user roles

### Current state
- RLS is enabled on all 4 tables (good)
- All policies are wide-open: `for all to authenticated using (true) with check (true)`
- No user_roles table exists
- No role-checking functions exist
- AI chat edge function uses service_role_key (bypasses RLS — no changes needed there)

### What this changes

**1. Database migration — new tables and functions**

Create `app_role` enum, `user_roles` table, and `has_role` security definer function:

```sql
-- Role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Roles table (NOT on profiles)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Users can only read their own roles
CREATE POLICY "Users can view own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Security definer function (avoids RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;
```

**2. Database migration — replace existing RLS policies**

Drop the 4 catch-all policies and replace with granular per-operation policies:

For **asset_categories**, **employees**, **assets**, **asset_assignments**:
- `SELECT` — all authenticated users (internal staff all need read access)
- `INSERT` — all authenticated users (staff create assets/employees)
- `UPDATE` — all authenticated users OR restrict to admins (for categories/sensitive ops)
- `DELETE` — admin only via `has_role(auth.uid(), 'admin')`

Specific policies:

| Table | SELECT | INSERT | UPDATE | DELETE |
|---|---|---|---|---|
| asset_categories | authenticated | authenticated | authenticated | admin only |
| employees | authenticated | authenticated | authenticated | admin only |
| assets | authenticated | authenticated (with `created_by = auth.uid()` check) | authenticated | admin only |
| asset_assignments | authenticated | authenticated | authenticated | admin only |

The `assets` INSERT policy adds `WITH CHECK (created_by = auth.uid())` to ensure users can't spoof the creator.

**3. Auto-assign 'user' role on signup**

Create a trigger function that assigns the default `'user'` role when a new user signs up:

```sql
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
```

**4. Seed existing users with roles**

Use the insert tool to give all existing users the `'user'` role, and optionally promote one to `'admin'`.

**5. Add role-check hook (`src/lib/hooks.ts`)**

Add a `useUserRole` query hook so the UI can check the current user's role for conditional rendering (e.g., hide delete buttons for non-admins). This is for UX only — the real enforcement is RLS.

**6. No changes to AI chat**

The edge function uses `SUPABASE_SERVICE_ROLE_KEY` which bypasses RLS entirely. No modifications needed.

### Files changed

| File | Action |
|---|---|
| Migration SQL | Create — roles table, has_role function, replace RLS policies, trigger |
| `src/lib/hooks.ts` | Edit — add `useUserRole` hook |

### What stays the same
- All existing CRUD operations continue working for authenticated users
- AI chat edge function untouched
- No component changes needed (delete restrictions will surface as toast errors from RLS denials)

