import { createFileRoute } from '@tanstack/react-router';
import { useAuth } from '@/lib/use-auth';
import { LoginPage } from '@/components/login-page';
import { AppLayout } from '@/components/app-layout';
import { AssetFormView } from '@/components/asset-form-view';

export const Route = createFileRoute('/assets/new')({
  component: NewAssetPage,
});

function NewAssetPage() {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex min-h-screen items-center justify-center"><div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>;
  if (!user) return <LoginPage />;
  return <AppLayout><AssetFormView /></AppLayout>;
}
