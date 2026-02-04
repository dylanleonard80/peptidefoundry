import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useApplication } from '@/hooks/useApplication';
import { useOnboardingStatus } from '@/hooks/useOnboardingStatus';

interface AccessGateProps {
  children: React.ReactNode;
}

/**
 * AccessGate component that checks if the user has an approved application.
 * - If not logged in → redirect to landing page
 * - If logged in but no approved application → redirect to pending page
 * - If approved but no terms signed → redirect to onboarding
 * - If approved and terms signed → render children
 */
export const AccessGate: React.FC<AccessGateProps> = ({ children }) => {
  const location = useLocation();
  const { user, loading: authLoading } = useAuth();
  const { isApproved, isPending, isRejected, loading: appLoading } = useApplication();
  const { hasSignedTerms, loading: onboardingLoading } = useOnboardingStatus();

  const isLoading = authLoading || appLoading || onboardingLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // Not logged in → redirect to landing
  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Pending or rejected → redirect to pending page
  if (isPending || isRejected) {
    return <Navigate to="/pending" replace />;
  }

  // Approved but hasn't signed terms → redirect to onboarding
  if (isApproved && !hasSignedTerms) {
    return <Navigate to="/onboarding" replace />;
  }

  // Approved and terms signed → allow access
  if (isApproved && hasSignedTerms) {
    return <>{children}</>;
  }

  // No application at all → redirect to landing to apply
  return <Navigate to="/" replace />;
};

export default AccessGate;
