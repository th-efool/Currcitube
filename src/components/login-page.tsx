import { useState } from 'react';
import { useAuth } from '@/lib/use-auth';
import { lovable } from '@/integrations/lovable/index';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Package } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from '@tanstack/react-router';

const dotGridBg = {
  backgroundImage: `radial-gradient(circle, var(--landing-grid) 1.2px, transparent 1.2px)`,
  backgroundSize: '24px 24px',
};

export function LoginPage() {
  const { signIn, signUp, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      if (isSignUp) {
        await signUp(email, password);
        setSignUpSuccess(true);
      } else {
        await signIn(email, password);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      setResetSent(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to send reset email');
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setSubmitting(true);
    try {
      const result = await lovable.auth.signInWithOAuth('google', {
        redirect_uri: window.location.origin,
      });
      if (result?.error) {
        setError(result.error instanceof Error ? result.error.message : 'Google sign-in failed');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Google sign-in failed');
    } finally {
      setSubmitting(false);
    }
  };

  const Logo = () => (
    <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
      <Package className="h-5 w-5 text-landing-dark" />
      <span className="text-[15px] font-medium text-landing-dark tracking-tight">AssetWise</span>
    </Link>
  );

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="flex min-h-screen flex-col items-center justify-center bg-landing-bg px-4" style={dotGridBg}>
      <div className="mb-6"><Logo /></div>
      <div className="w-full max-w-sm rounded-xl border border-landing-grid bg-white p-8 shadow-sm">
        {children}
      </div>
    </div>
  );

  if (signUpSuccess) {
    return (
      <Wrapper>
        <h2 className="text-center text-lg font-semibold text-landing-dark">Check your email</h2>
        <p className="mt-1 text-center text-sm text-landing-light-muted">We sent a confirmation link to {email}</p>
      </Wrapper>
    );
  }

  if (resetSent) {
    return (
      <Wrapper>
        <h2 className="text-center text-lg font-semibold text-landing-dark">Check your email</h2>
        <p className="mt-1 text-center text-sm text-landing-light-muted">We sent a password reset link to {email}</p>
        <Button
          variant="outline"
          className="mt-6 w-full rounded-full border-landing-grid text-landing-dark hover:bg-landing-bg"
          onClick={() => { setResetSent(false); setIsForgotPassword(false); }}
        >
          Back to sign in
        </Button>
      </Wrapper>
    );
  }

  if (isForgotPassword) {
    return (
      <Wrapper>
        <h2 className="text-center text-lg font-semibold text-landing-dark">Reset password</h2>
        <p className="mt-1 text-center text-sm text-landing-light-muted">Enter your email to receive a reset link</p>
        <form onSubmit={handleForgotPassword} className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reset-email" className="text-sm font-medium text-landing-dark">Email</Label>
            <Input
              id="reset-email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@company.com"
              required
              className="rounded-lg border-landing-grid bg-white"
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" className="w-full rounded-full bg-landing-dark text-landing-light hover:bg-landing-dark-subtle" disabled={submitting}>
            {submitting ? 'Sending...' : 'Send reset link'}
          </Button>
          <button
            type="button"
            className="w-full text-center text-sm text-landing-light-muted hover:text-landing-dark"
            onClick={() => { setIsForgotPassword(false); setError(''); }}
          >
            Back to sign in
          </button>
        </form>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h2 className="text-center text-lg font-semibold text-landing-dark">
        {isSignUp ? 'Create your account' : 'Sign in to your account'}
      </h2>
      <p className="mt-1 text-center text-sm text-landing-light-muted">
        {isSignUp ? 'Get started with asset tracking' : 'Welcome back'}
      </p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-landing-dark">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@company.com"
            required
            className="rounded-lg border-landing-grid bg-white"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-sm font-medium text-landing-dark">Password</Label>
            {!isSignUp && (
              <button
                type="button"
                className="text-xs text-landing-light-muted hover:text-landing-dark"
                onClick={() => { setIsForgotPassword(true); setError(''); }}
              >
                Forgot password?
              </button>
            )}
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            minLength={6}
            className="rounded-lg border-landing-grid bg-white"
          />
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button type="submit" className="w-full rounded-full bg-landing-dark text-landing-light hover:bg-landing-dark-subtle" disabled={submitting || loading}>
          {submitting ? 'Loading...' : isSignUp ? 'Create account' : 'Sign in'}
        </Button>
        <div className="flex items-center gap-3">
          <Separator className="flex-1 bg-landing-grid" />
          <span className="text-xs text-landing-light-muted">or</span>
          <Separator className="flex-1 bg-landing-grid" />
        </div>
        <Button
          type="button"
          variant="outline"
          className="w-full rounded-full border-landing-grid text-landing-dark hover:bg-landing-bg"
          disabled={submitting || loading}
          onClick={handleGoogleSignIn}
        >
          <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Sign in with Google
        </Button>
        <p className="text-center text-sm text-landing-light-muted">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            type="button"
            className="text-landing-dark font-medium hover:underline"
            onClick={() => { setIsSignUp(!isSignUp); setError(''); }}
          >
            {isSignUp ? 'Sign in' : 'Sign up'}
          </button>
        </p>
      </form>
    </Wrapper>
  );
}
