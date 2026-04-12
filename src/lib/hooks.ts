import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { AssetCondition } from './types';
export { calculateDepreciation } from './types';
export type { Asset, AssetCategory, Employee, AssetAssignment, AssetCondition } from './types';

// ---- Categories ----
export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase.from('asset_categories').select('*').order('name');
      if (error) throw error;
      return data;
    },
  });
}

export function useCreateCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (values: { name: string; default_useful_life_years: number; residual_value_percent?: number }) => {
      const { data, error } = await supabase.from('asset_categories').insert(values).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['categories'] }),
  });
}

export function useUpdateCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...values }: { id: string; name?: string; default_useful_life_years?: number; residual_value_percent?: number }) => {
      const { data, error } = await supabase.from('asset_categories').update(values).eq('id', id).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['categories'] }),
  });
}

export function useDeleteCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('asset_categories').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['categories'] }),
  });
}

// ---- Employees ----
export function useEmployees() {
  return useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      const { data, error } = await supabase.from('employees').select('*').order('name');
      if (error) throw error;
      return data;
    },
  });
}

export function useCreateEmployee() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (values: { name: string; department?: string | null; email?: string | null }) => {
      const { data, error } = await supabase.from('employees').insert(values).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['employees'] }),
  });
}

export function useUpdateEmployee() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...values }: { id: string; name?: string; department?: string | null; email?: string | null }) => {
      const { data, error } = await supabase.from('employees').update(values).eq('id', id).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['employees'] }),
  });
}

export function useDeleteEmployee() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('employees').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['employees'] }),
  });
}

// ---- Assets ----
export function useAssets() {
  return useQuery({
    queryKey: ['assets'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('assets')
        .select('*, asset_categories(*)')
        .eq('is_archived', false)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}

export function useAsset(id: string) {
  return useQuery({
    queryKey: ['assets', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('assets')
        .select('*, asset_categories(*)')
        .eq('id', id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
}

export function useCreateAsset() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (values: {
      name: string;
      category_id?: string | null;
      serial_number?: string | null;
      purchase_date: string;
      purchase_cost: number;
      condition: AssetCondition;
      location?: string | null;
      notes?: string | null;
      useful_life_years: number;
      residual_value_percent?: number;
    }) => {
      const { data: userData } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from('assets')
        .insert({ ...values, created_by: userData.user?.id ?? null })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['assets'] }),
  });
}

export function useUpdateAsset() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...values }: {
      id: string;
      name?: string;
      category_id?: string | null;
      serial_number?: string | null;
      purchase_date?: string;
      purchase_cost?: number;
      condition?: AssetCondition;
      location?: string | null;
      notes?: string | null;
      useful_life_years?: number;
      residual_value_percent?: number;
      is_archived?: boolean;
    }) => {
      const { data, error } = await supabase
        .from('assets')
        .update({ ...values, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ['assets'] });
      qc.invalidateQueries({ queryKey: ['assets', vars.id] });
    },
  });
}

export function useArchiveAsset() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('assets').update({ is_archived: true, updated_at: new Date().toISOString() }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['assets'] }),
  });
}

// ---- Assignments ----
export function useAssetAssignments(assetId: string) {
  return useQuery({
    queryKey: ['assignments', assetId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('asset_assignments')
        .select('*, employees(*)')
        .eq('asset_id', assetId)
        .order('assigned_date', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!assetId,
  });
}

export function useCurrentAssignment(assetId: string) {
  return useQuery({
    queryKey: ['assignments', assetId, 'current'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('asset_assignments')
        .select('*, employees(*)')
        .eq('asset_id', assetId)
        .is('returned_date', null)
        .order('assigned_date', { ascending: false })
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!assetId,
  });
}

export function useAssignAsset() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (values: { asset_id: string; employee_id: string; notes?: string | null }) => {
      const { data, error } = await supabase.from('asset_assignments').insert(values).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ['assignments', vars.asset_id] });
      qc.invalidateQueries({ queryKey: ['assets'] });
      qc.invalidateQueries({ queryKey: ['dashboard-stats'] });
    },
  });
}

export function useUnassignAsset() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ assignmentId, assetId }: { assignmentId: string; assetId: string }) => {
      const { error } = await supabase
        .from('asset_assignments')
        .update({ returned_date: new Date().toISOString() })
        .eq('id', assignmentId);
      if (error) throw error;
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ['assignments', vars.assetId] });
      qc.invalidateQueries({ queryKey: ['assets'] });
      qc.invalidateQueries({ queryKey: ['dashboard-stats'] });
    },
  });
}

// ---- Bulk creates ----
export function useBulkCreateAssets() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (rows: Array<{
      name: string;
      category_id?: string | null;
      serial_number?: string | null;
      purchase_date: string;
      purchase_cost: number;
      condition: AssetCondition;
      location?: string | null;
      notes?: string | null;
      useful_life_years: number;
      residual_value_percent?: number;
    }>) => {
      const { data: userData } = await supabase.auth.getUser();
      const withUser = rows.map(r => ({ ...r, created_by: userData.user?.id ?? null }));
      const { data, error } = await supabase.from('assets').insert(withUser).select();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['assets'] });
      qc.invalidateQueries({ queryKey: ['dashboard-stats'] });
    },
  });
}

export function useBulkCreateEmployees() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (rows: Array<{ name: string; department?: string | null; email?: string | null }>) => {
      const { data, error } = await supabase.from('employees').insert(rows).select();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['employees'] }),
  });
}

// ---- User role ----
export function useUserRole() {
  return useQuery({
    queryKey: ['user-role'],
    queryFn: async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return null;
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userData.user.id);
      if (error) throw error;
      return data?.map(r => r.role) ?? [];
    },
  });
}

export function useIsAdmin() {
  const { data: roles } = useUserRole();
  return roles?.includes('admin') ?? false;
}

// ---- Dashboard stats ----
export function useDashboardStats() {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const [assetsRes, assignmentsRes] = await Promise.all([
        supabase.from('assets').select('id, purchase_cost, condition').eq('is_archived', false),
        supabase.from('asset_assignments').select('asset_id').is('returned_date', null),
      ]);
      if (assetsRes.error) throw assetsRes.error;
      if (assignmentsRes.error) throw assignmentsRes.error;

      const assets = assetsRes.data;
      const assignedIds = new Set(assignmentsRes.data.map(a => a.asset_id));

      return {
        total: assets.length,
        assigned: assets.filter(a => assignedIds.has(a.id)).length,
        unassigned: assets.filter(a => !assignedIds.has(a.id)).length,
        conditions: {
          excellent: assets.filter(a => a.condition === 'excellent').length,
          good: assets.filter(a => a.condition === 'good').length,
          fair: assets.filter(a => a.condition === 'fair').length,
          poor: assets.filter(a => a.condition === 'poor').length,
          retired: assets.filter(a => a.condition === 'retired').length,
        },
        totalValue: assets.reduce((sum, a) => sum + Number(a.purchase_cost), 0),
      };
    },
  });
}
