import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { useDashboardStats, useAssets, useCategories, useEmployees, calculateDepreciation } from '@/lib/hooks';
import { CONDITION_LABELS, CONDITION_COLORS } from '@/lib/types';
import type { AssetCondition } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Package, Users, TrendingDown, AlertTriangle, CheckCircle2, Circle, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

function OnboardingChecklist() {
  const { data: categories } = useCategories();
  const { data: employees } = useEmployees();
  const { data: stats } = useDashboardStats();

  const hasCategories = (categories ?? []).length > 0;
  const hasEmployees = (employees ?? []).length > 0;
  const hasAssets = (stats?.total ?? 0) > 0;
  const hasAssignments = (stats?.assigned ?? 0) > 0;

  const steps = [
    { label: 'Add an asset category', done: hasCategories, to: '/settings' as const },
    { label: 'Add an employee', done: hasEmployees, to: '/employees' as const },
    { label: 'Log your first asset', done: hasAssets, to: '/assets/new' as const },
    { label: 'Assign an asset to an employee', done: hasAssignments, to: '/assets' as const },
  ];

  const allDone = steps.every(s => s.done);
  if (allDone) return null;

  const completedCount = steps.filter(s => s.done).length;

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Getting started</CardTitle>
        <p className="text-xs text-muted-foreground">{completedCount} of {steps.length} complete</p>
      </CardHeader>
      <CardContent className="space-y-2">
        {steps.map(step => (
          <div key={step.label} className="flex items-center gap-3">
            {step.done ? (
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
            ) : (
              <Circle className="h-4 w-4 text-muted-foreground shrink-0" />
            )}
            <span className={`text-sm flex-1 ${step.done ? 'line-through text-muted-foreground' : ''}`}>
              {step.label}
            </span>
            {!step.done && (
              <Link to={step.to}>
                <Button variant="ghost" size="sm" className="h-7 text-xs">
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </Link>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

const CONDITION_BAR_COLORS: Record<AssetCondition, string> = {
  excellent: 'bg-chart-2',
  good: 'bg-primary',
  fair: 'bg-chart-5',
  poor: 'bg-destructive',
  retired: 'bg-muted-foreground',
};

const PAGE_SIZE = 5;

export function DashboardView() {
  const { data: stats, isLoading } = useDashboardStats();
  const { data: assets } = useAssets();
  const { data: categories } = useCategories();
  const [page, setPage] = useState(0);

  const categoryMap = new Map((categories ?? []).map(c => [c.id, c.name]));

  const sortedAssets = [...(assets ?? [])].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  const totalPages = Math.max(1, Math.ceil(sortedAssets.length / PAGE_SIZE));
  const pagedAssets = sortedAssets.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const totalCurrentValue = (assets ?? []).reduce((sum, a) => {
    const dep = calculateDepreciation(
      Number(a.purchase_cost),
      a.purchase_date,
      a.useful_life_years,
      Number(a.residual_value_percent)
    );
    return sum + dep.currentValue;
  }, 0);

  const totalDepreciation = (stats?.totalValue ?? 0) - totalCurrentValue;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-xl sm:text-2xl font-bold">Dashboard</h1>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map(i => (
            <Card key={i}><CardContent className="pt-6"><Skeleton className="h-16 w-full" /></CardContent></Card>
          ))}
        </div>
      </div>
    );
  }

  const metricCards = [
    { label: 'Total assets', value: stats?.total ?? 0, icon: Package, sub: `${stats?.assigned ?? 0} assigned · ${stats?.unassigned ?? 0} unassigned` },
    { label: 'Total value', value: `$${(stats?.totalValue ?? 0).toLocaleString()}`, icon: TrendingDown, sub: `$${totalCurrentValue.toLocaleString()} current value` },
    { label: 'Total depreciation', value: `$${totalDepreciation.toLocaleString()}`, icon: TrendingDown, sub: 'Straight-line method' },
    { label: 'Needs attention', value: (stats?.conditions.poor ?? 0) + (stats?.conditions.fair ?? 0), icon: AlertTriangle, sub: `${stats?.conditions.poor ?? 0} poor · ${stats?.conditions.fair ?? 0} fair` },
  ];

  const totalAssets = stats?.total ?? 0;
  const conditionKeys: AssetCondition[] = ['excellent', 'good', 'fair', 'poor', 'retired'];

  return (
    <div className="space-y-6">
      <h1 className="text-xl sm:text-2xl font-bold">Dashboard</h1>

      <OnboardingChecklist />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metricCards.map(card => (
          <Card key={card.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{card.label}</CardTitle>
              <card.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">{card.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Condition breakdown with progress bars */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Condition breakdown</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {conditionKeys.map(key => {
            const count = stats?.conditions[key] ?? 0;
            const pct = totalAssets > 0 ? Math.round((count / totalAssets) * 100) : 0;
            return (
              <div key={key} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={`text-xs ${CONDITION_COLORS[key]}`}>
                      {CONDITION_LABELS[key]}
                    </Badge>
                  </div>
                  <span className="text-sm font-medium tabular-nums">
                    {count} <span className="text-muted-foreground font-normal">({pct}%)</span>
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className={`h-full rounded-full transition-all ${CONDITION_BAR_COLORS[key]}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Recent assets table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Recent assets</CardTitle>
          <Link to="/assets">
            <Button variant="ghost" size="sm" className="text-xs">
              View all <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {sortedAssets.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">No assets yet</p>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden sm:table-cell">Category</TableHead>
                    <TableHead>Condition</TableHead>
                    <TableHead className="text-right">Purchase cost</TableHead>
                    <TableHead className="text-right hidden sm:table-cell">Current value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pagedAssets.map(asset => {
                    const dep = calculateDepreciation(
                      Number(asset.purchase_cost),
                      asset.purchase_date,
                      asset.useful_life_years,
                      Number(asset.residual_value_percent)
                    );
                    return (
                      <TableRow key={asset.id}>
                        <TableCell>
                          <Link
                            to="/assets/$assetId"
                            params={{ assetId: asset.id }}
                            className="font-medium text-primary hover:underline"
                          >
                            {asset.name}
                          </Link>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell text-muted-foreground">
                          {asset.category_id ? categoryMap.get(asset.category_id) ?? '—' : '—'}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={`text-xs ${CONDITION_COLORS[asset.condition]}`}>
                            {CONDITION_LABELS[asset.condition]}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right tabular-nums">
                          ${Number(asset.purchase_cost).toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right tabular-nums hidden sm:table-cell">
                          ${dep.currentValue.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-between pt-4 gap-2">
                  <p className="text-xs text-muted-foreground">
                    Showing {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, sortedAssets.length)} of {sortedAssets.length}
                  </p>
                  <div className="flex gap-1">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 sm:h-7 sm:w-7"
                      disabled={page === 0}
                      onClick={() => setPage(p => p - 1)}
                    >
                      <ChevronLeft className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 sm:h-7 sm:w-7"
                      disabled={page >= totalPages - 1}
                      onClick={() => setPage(p => p + 1)}
                    >
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
