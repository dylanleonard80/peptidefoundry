import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export interface OnboardingStatus {
  hasSignedTerms: boolean;
  hasCompletedOnboarding: boolean;
  onboardingPath: 'full' | 'skipped' | null;
}

export const useOnboardingStatus = () => {
  const { user, loading: authLoading } = useAuth();
  const [status, setStatus] = useState<OnboardingStatus>({
    hasSignedTerms: false,
    hasCompletedOnboarding: false,
    onboardingPath: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    
    if (user) {
      fetchOnboardingStatus();
    } else {
      setStatus({
        hasSignedTerms: false,
        hasCompletedOnboarding: false,
        onboardingPath: null,
      });
      setLoading(false);
    }
  }, [user, authLoading]);

  const fetchOnboardingStatus = async () => {
    if (!user) return;
    
    try {
      // Check for signed terms
      const { data: agreement } = await supabase
        .from('user_agreements')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      // Check health profile for onboarding completion
      const { data: healthProfile } = await supabase
        .from('health_profiles')
        .select('onboarding_completed_at, onboarding_path')
        .eq('user_id', user.id)
        .maybeSingle();

      setStatus({
        hasSignedTerms: !!agreement,
        hasCompletedOnboarding: !!healthProfile?.onboarding_completed_at,
        onboardingPath: healthProfile?.onboarding_path as 'full' | 'skipped' | null,
      });
    } catch (err) {
      console.error('Error fetching onboarding status:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    ...status,
    loading: loading || authLoading,
    refetch: fetchOnboardingStatus,
  };
};
