import { Link } from '@tanstack/react-router';
import { Package, ArrowRight, BarChart3, Users, Shield, Zap, Search, ChevronRight, CheckCircle2, Lock, Eye, Database, Server } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LandingDemoDashboard } from '@/components/landing-demo-dashboard';

const features = [
  {
    icon: Package,
    title: 'Asset management',
    description: 'Log every piece of equipment with purchase details, condition notes, and serial numbers.',
    stat: '100%',
    statLabel: 'asset visibility',
  },
  {
    icon: Users,
    title: 'Employee assignments',
    description: 'Assign assets to team members and track full assignment history over time.',
    stat: '2x',
    statLabel: 'faster tracking',
  },
  {
    icon: BarChart3,
    title: 'Depreciation tracking',
    description: 'Automatic straight-line depreciation calculations with visual book value charts.',
    stat: '0',
    statLabel: 'manual calculations',
  },
  {
    icon: Search,
    title: 'AI-powered search',
    description: 'Ask questions about your assets and employees using our built-in AI chat assistant.',
    stat: 'AI',
    statLabel: 'powered insights',
  },
];

const steps = [
  {
    number: '01',
    title: 'Add your assets',
    description: 'Enter equipment details including purchase cost, date, condition, and category. Import in bulk via CSV or add one at a time.',
  },
  {
    number: '02',
    title: 'Assign to employees',
    description: 'Link assets to team members with assignment dates and notes. Track who has what at any moment.',
  },
  {
    number: '03',
    title: 'Track & monitor',
    description: 'View real-time dashboards showing asset values, condition breakdowns, and depreciation schedules.',
  },
  {
    number: '04',
    title: 'Get AI insights',
    description: 'Use the AI chat to ask questions about your inventory — find assets, check assignments, and analyze trends.',
  },
];

const securityFeatures = [
  { icon: Lock, title: 'Row-level security', description: 'Every query is scoped to authenticated users with role-based access control.' },
  { icon: Shield, title: 'Role-based access', description: 'Admin, moderator, and user roles with granular permissions per table.' },
  { icon: Eye, title: 'Audit trail', description: 'Full assignment history and timestamps on every change.' },
  { icon: Database, title: 'Encrypted at rest', description: 'All data is encrypted and stored securely in the cloud.' },
  { icon: Server, title: 'Edge functions', description: 'Server-side AI processing keeps your data safe and private.' },
  { icon: CheckCircle2, title: 'Input validation', description: 'Zod schema validation on all user inputs to prevent bad data.' },
];

const font = "'Onest', system-ui, sans-serif";

/* Faint dot-grid background */
const dotGridBg = {
  backgroundImage: `radial-gradient(circle, var(--landing-grid) 1.2px, transparent 1.2px)`,
  backgroundSize: '24px 24px',
};

export function LandingPage() {
  return (
    <div className="min-h-screen bg-landing-bg" style={{ fontFamily: font }}>
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-landing-grid bg-landing-bg/90 backdrop-blur-sm">
        <div className="mx-auto flex h-12 max-w-[1200px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-landing-dark" />
            <span className="text-[15px] font-medium text-landing-dark tracking-tight">AssetWise</span>
          </div>
          <Link to="/" hash="login" className="text-[14px] text-landing-dark/50 hover:text-landing-dark transition-colors">
            Sign in <ArrowRight className="inline h-3.5 w-3.5 ml-0.5" />
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden" style={dotGridBg}>
        <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8 sm:pb-12 text-center">
          <h1 className="text-[32px] sm:text-[44px] lg:text-[52px] font-normal tracking-tight text-landing-dark leading-[1.1]">
             The only asset tracker
          </h1>
          <h1 className="text-[32px] sm:text-[44px] lg:text-[52px] font-normal tracking-tight text-landing-light-muted leading-[1.1]">
            built for your team
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-[17px] text-landing-light-muted leading-relaxed font-normal">
            A simple, reliable way to log, assign, and monitor all company equipment, with depreciation tracking and AI-powered insights.
          </p>
          <div className="mt-10">
            <Link to="/" hash="login" className="inline-block">
              <Button size="lg" className="rounded-full gap-2 min-h-[48px] bg-landing-dark text-landing-light hover:bg-landing-dark-subtle font-medium text-[15px] px-8">
                Get started <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Demo UI in macOS-style chrome */}
        <div className="mx-auto max-w-[900px] px-4 sm:px-6 lg:px-8 pb-24 sm:pb-36 relative z-10">
          <div className="overflow-hidden rounded-xl border border-landing-grid bg-white shadow-sm">
            {/* macOS title bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-landing-grid bg-landing-bg/50">
              <span className="h-3 w-3 rounded-full bg-[oklch(0.65_0.2_25)]" />
              <span className="h-3 w-3 rounded-full bg-[oklch(0.82_0.16_85)]" />
              <span className="h-3 w-3 rounded-full bg-[oklch(0.7_0.17_145)]" />
            </div>
            <LandingDemoDashboard />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 sm:py-32 lg:py-40 bg-white">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="mb-16 sm:mb-24">
            <p className="text-[16px] font-normal text-landing-dark mb-3">Features</p>
            <h2 className="text-[32px] sm:text-[40px] lg:text-[48px] font-normal text-landing-dark leading-tight tracking-tight">
              Everything you need to<br className="hidden sm:block" /> manage assets
            </h2>
            <p className="mt-4 text-[17px] text-landing-light-muted max-w-xl font-normal">
              Built for IT managers, office managers, and operations teams who need full visibility into company equipment.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {features.map((f) => (
              <div
                key={f.title}
                className="group relative rounded-xl border border-landing-grid bg-landing-bg p-6 sm:p-8 transition-all hover:border-landing-dark/20"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-landing-dark text-landing-light">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <div className="text-right">
                    <span className="text-2xl sm:text-3xl font-semibold text-landing-dark">{f.stat}</span>
                    <p className="text-xs text-landing-light-muted">{f.statLabel}</p>
                  </div>
                </div>
                <h3 className="text-[18px] font-semibold text-landing-dark">{f.title}</h3>
                <p className="mt-1.5 text-[16px] text-landing-light-muted leading-relaxed font-normal">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 sm:py-32 lg:py-40 bg-landing-bg" style={dotGridBg}>
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="mb-16 sm:mb-24">
            <p className="text-[16px] font-normal text-landing-dark mb-3">How it works</p>
            <h2 className="text-[32px] sm:text-[40px] lg:text-[48px] font-normal text-landing-dark leading-tight tracking-tight">
              Get up and running in minutes
            </h2>
            <p className="mt-4 text-[17px] text-landing-light-muted max-w-xl font-normal">
              Four simple steps to full asset visibility.
            </p>
          </div>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.number} className="relative">
                <span className="text-[64px] font-normal text-landing-dark/10 leading-none">{s.number}</span>
                <h3 className="mt-2 text-[18px] font-semibold text-landing-dark">{s.title}</h3>
                <p className="mt-2 text-[16px] text-landing-light-muted leading-relaxed font-normal">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="py-20 sm:py-32 lg:py-40 bg-white">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="mb-16 sm:mb-24">
            <p className="text-[16px] font-normal text-landing-dark mb-3">Enterprise security</p>
            <h2 className="text-[32px] sm:text-[40px] lg:text-[48px] font-normal text-landing-dark leading-tight tracking-tight">
              Secure & reliable by design
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {securityFeatures.map((sf) => (
              <div key={sf.title} className="rounded-xl border border-landing-grid bg-landing-bg p-6 transition-all hover:border-landing-dark/20">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-landing-dark text-landing-light mb-4">
                  <sf.icon className="h-5 w-5" />
                </div>
                <h3 className="text-[18px] font-semibold text-landing-dark">{sf.title}</h3>
                <p className="mt-1 text-[16px] text-landing-light-muted leading-relaxed font-normal">{sf.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 sm:py-36 lg:py-40 bg-landing-bg overflow-hidden" style={dotGridBg}>
        <div className="relative mx-auto max-w-[700px] px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-[32px] sm:text-[40px] lg:text-[48px] font-normal text-landing-dark leading-tight tracking-tight">
            Ready to take control<br className="hidden sm:block" /> of your assets?
          </h2>
          <p className="mt-4 text-[17px] text-landing-light-muted max-w-lg mx-auto font-normal">
            Stop using spreadsheets. Start tracking every asset with a purpose-built tool your team will actually use.
          </p>
          <div className="mt-10">
            <Link to="/" hash="login" className="inline-block">
              <Button size="lg" className="rounded-full gap-2 min-h-[48px] bg-landing-dark text-landing-light hover:bg-landing-dark-subtle font-medium text-[15px] px-8">
                Get started for free <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-landing-grid py-6 sm:py-8 bg-landing-bg">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-landing-dark" />
            <span className="text-[15px] text-landing-light-muted">AssetWise</span>
          </div>
          <p className="text-xs text-landing-light-muted/60">© {new Date().getFullYear()} All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
