import { Package, TrendingDown, AlertTriangle, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const metrics = [
  { label: 'Total assets', value: '47', icon: Package, sub: '38 assigned · 9 unassigned' },
  { label: 'Total value', value: '$284,500', icon: TrendingDown, sub: '$213,375 current value' },
  { label: 'Total depreciation', value: '$71,125', icon: TrendingDown, sub: 'Straight-line method' },
  { label: 'Needs attention', value: '5', icon: AlertTriangle, sub: '2 poor · 3 fair' },
];

const conditions = [
  { label: 'Excellent', pct: 40, color: 'bg-emerald-500' },
  { label: 'Good', pct: 32, color: 'bg-landing-dark' },
  { label: 'Fair', pct: 15, color: 'bg-amber-500' },
  { label: 'Poor', pct: 9, color: 'bg-red-500' },
  { label: 'Retired', pct: 4, color: 'bg-landing-light-muted' },
];

const recentAssets = [
  { name: 'MacBook Pro 16"', category: 'Laptops', condition: 'Excellent', cost: '$3,499', current: '$2,624' },
  { name: 'Dell U2723QE', category: 'Monitors', condition: 'Good', cost: '$619', current: '$464' },
  { name: 'Herman Miller Aeron', category: 'Furniture', condition: 'Good', cost: '$1,395', current: '$930' },
  { name: 'iPhone 15 Pro', category: 'Phones', condition: 'Excellent', cost: '$1,199', current: '$959' },
  { name: 'ThinkPad X1 Carbon', category: 'Laptops', condition: 'Fair', cost: '$1,849', current: '$924' },
];

const conditionColor: Record<string, string> = {
  Excellent: 'text-emerald-700 border-emerald-300 bg-emerald-50',
  Good: 'text-blue-700 border-blue-300 bg-blue-50',
  Fair: 'text-amber-700 border-amber-300 bg-amber-50',
  Poor: 'text-red-700 border-red-300 bg-red-50',
};

export function LandingDemoDashboard() {
  return (
    <div className="p-4 sm:p-6 space-y-4 bg-[#F7F6F0] text-landing-dark" style={{ fontFamily: "'Onest', system-ui, sans-serif", fontSize: '13px' }}>
      {/* Sidebar hint + header */}
      <div className="flex items-center gap-2 mb-1">
        <Package className="h-4 w-4" />
        <span className="font-medium text-sm tracking-tight">AssetWise</span>
        <span className="text-landing-light-muted text-xs ml-2">/ Dashboard</span>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {metrics.map(m => (
          <div key={m.label} className="rounded-lg border border-landing-grid bg-white p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] text-landing-light-muted font-medium">{m.label}</span>
              <m.icon className="h-3.5 w-3.5 text-landing-light-muted" />
            </div>
            <div className="text-lg font-bold leading-tight">{m.value}</div>
            <p className="text-[10px] text-landing-light-muted mt-0.5">{m.sub}</p>
          </div>
        ))}
      </div>

      {/* Condition breakdown */}
      <div className="rounded-lg border border-landing-grid bg-white p-3">
        <p className="text-xs font-semibold mb-3">Condition breakdown</p>
        <div className="space-y-2">
          {conditions.map(c => (
            <div key={c.label} className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px]">{c.label}</span>
                <span className="text-[11px] tabular-nums text-landing-light-muted">{c.pct}%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-landing-grid/60">
                <div className={`h-full rounded-full ${c.color}`} style={{ width: `${c.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent assets table */}
      <div className="rounded-lg border border-landing-grid bg-white p-3">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold">Recent assets</p>
          <span className="text-[10px] text-landing-light-muted">View all →</span>
        </div>
        <table className="w-full text-[11px]">
          <thead>
            <tr className="border-b border-landing-grid text-landing-light-muted">
              <th className="text-left font-medium pb-2">Name</th>
              <th className="text-left font-medium pb-2 hidden sm:table-cell">Category</th>
              <th className="text-left font-medium pb-2">Condition</th>
              <th className="text-right font-medium pb-2">Cost</th>
              <th className="text-right font-medium pb-2 hidden sm:table-cell">Current</th>
            </tr>
          </thead>
          <tbody>
            {recentAssets.map(a => (
              <tr key={a.name} className="border-b border-landing-grid/50 last:border-0">
                <td className="py-2 font-medium">{a.name}</td>
                <td className="py-2 text-landing-light-muted hidden sm:table-cell">{a.category}</td>
                <td className="py-2">
                  <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${conditionColor[a.condition] ?? ''}`}>
                    {a.condition}
                  </Badge>
                </td>
                <td className="py-2 text-right tabular-nums">{a.cost}</td>
                <td className="py-2 text-right tabular-nums hidden sm:table-cell">{a.current}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
