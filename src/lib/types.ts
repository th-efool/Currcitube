export type AssetCondition = 'excellent' | 'good' | 'fair' | 'poor' | 'retired';

export interface AssetCategory {
  id: string;
  name: string;
  default_useful_life_years: number;
  created_at: string;
}

export interface Employee {
  id: string;
  name: string;
  department: string | null;
  email: string | null;
  created_at: string;
}

export interface Asset {
  id: string;
  name: string;
  category_id: string | null;
  serial_number: string | null;
  purchase_date: string;
  purchase_cost: number;
  condition: AssetCondition;
  location: string | null;
  notes: string | null;
  useful_life_years: number;
  residual_value_percent: number;
  is_archived: boolean;
  created_by: string | null;
  created_at: string;
  updated_at: string;
  asset_categories?: AssetCategory | null;
}

export interface AssetAssignment {
  id: string;
  asset_id: string;
  employee_id: string;
  assigned_date: string;
  returned_date: string | null;
  notes: string | null;
  created_at: string;
  employees?: Employee | null;
}

export const CONDITION_LABELS: Record<AssetCondition, string> = {
  excellent: 'Excellent',
  good: 'Good',
  fair: 'Fair',
  poor: 'Poor',
  retired: 'Retired',
};

export const CONDITION_COLORS: Record<AssetCondition, string> = {
  excellent: 'bg-success text-success-foreground',
  good: 'bg-primary text-primary-foreground',
  fair: 'bg-warning text-warning-foreground',
  poor: 'bg-destructive text-destructive-foreground',
  retired: 'bg-muted text-muted-foreground',
};

export function calculateDepreciation(purchaseCost: number, purchaseDate: string, usefulLifeYears: number, residualPercent: number = 0) {
  const now = new Date();
  const purchase = new Date(purchaseDate);
  const totalDays = usefulLifeYears * 365.25;
  const daysSince = Math.max(0, (now.getTime() - purchase.getTime()) / (1000 * 60 * 60 * 24));
  const residualValue = purchaseCost * (residualPercent / 100);
  const depreciableAmount = purchaseCost - residualValue;
  const depreciationFraction = Math.min(1, daysSince / totalDays);
  const currentValue = Math.max(residualValue, purchaseCost - depreciableAmount * depreciationFraction);
  const totalDepreciation = purchaseCost - currentValue;

  return {
    currentValue: Math.round(currentValue * 100) / 100,
    totalDepreciation: Math.round(totalDepreciation * 100) / 100,
    percentDepreciated: Math.round(depreciationFraction * 100),
    isFullyDepreciated: depreciationFraction >= 1,
  };
}
