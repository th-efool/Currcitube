import { createFileRoute, useLocation } from '@tanstack/react-router';
import { useAuth } from '@/lib/use-auth';
import { LoginPage } from '@/components/login-page';
import { LandingPage } from '@/components/landing-page';
import { AppLayout } from '@/components/app-layout';
import { DashboardView } from '@/components/dashboard-view';

export const Route = createFileRoute('/')({
  component: IndexPage,
});

function IndexPage() {
  const { user, loading } = useAuth();
  const location = useLocation();
  const showLogin = location.hash === 'login';

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (user) {
    return (
      <AppLayout>
        <DashboardView />
      </AppLayout>
    );
  }

  if (showLogin) return <LoginPage />;

  return <LandingPage />;
}
