import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { usePrices } from '@/hooks/usePrices';

interface MembershipState {
  isMember: boolean;
  subscriptionEnd: string | null;
  canceled: boolean;
  loading: boolean;
  error: string | null;
}

interface CachedMembership {
  isMember: boolean;
  subscriptionEnd: string | null;
  canceled: boolean;
  userId: string;
  timestamp: number;
}

const CACHE_KEY = 'foundry_club_membership';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

const getCachedMembership = (userId: string): CachedMembership | null => {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;
    
    const data: CachedMembership = JSON.parse(cached);
    
    // Check if cache is for current user and not expired
    if (data.userId === userId && Date.now() - data.timestamp < CACHE_DURATION) {
      return data;
    }
    
    // Clear stale cache
    localStorage.removeItem(CACHE_KEY);
    return null;
  } catch {
    return null;
  }
};

const setCachedMembership = (userId: string, isMember: boolean, subscriptionEnd: string | null, canceled: boolean) => {
  try {
    const data: CachedMembership = {
      isMember,
      subscriptionEnd,
      canceled,
      userId,
      timestamp: Date.now(),
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch {
    // Ignore localStorage errors
  }
};

const clearCachedMembership = () => {
  try {
    localStorage.removeItem(CACHE_KEY);
  } catch {
    // Ignore localStorage errors
  }
};

// Read cache synchronously without needing user ID (for instant first render)
const getInitialCachedState = (): MembershipState => {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const data: CachedMembership = JSON.parse(cached);
      // Check if cache is not expired (don't check userId yet - we don't have it)
      if (Date.now() - data.timestamp < CACHE_DURATION) {
        return {
          isMember: data.isMember,
          subscriptionEnd: data.subscriptionEnd,
          canceled: data.canceled,
          loading: false, // Don't show loading if we have cached data
          error: null,
        };
      }
    }
  } catch {
    // Ignore errors
  }
  return {
    isMember: false,
    subscriptionEnd: null,
    canceled: false,
    loading: true,
    error: null,
  };
};

export const useMembership = () => {
  const { user, session, loading: authLoading } = useAuth();
  const { getMemberPriceBySlug } = usePrices();

  const [state, setState] = useState<MembershipState>(getInitialCachedState);

  const checkMembership = useCallback(async () => {
    // Don't check if auth is still loading or no session
    if (authLoading) return;

    if (!session || !user) {
      clearCachedMembership();
      setState(prev => ({ ...prev, isMember: false, loading: false, error: null }));
      return;
    }

    try {
      // Only show loading if we don't have cached data
      const cached = getCachedMembership(user.id);
      if (!cached) {
        setState(prev => ({ ...prev, loading: true, error: null }));
      }

      // Query memberships table directly (RLS allows user to see own row)
      const { data: membership, error } = await supabase
        .from('memberships')
        .select('status, current_period_end')
        .eq('user_id', user.id)
        .in('status', ['active', 'canceled'])
        .maybeSingle();

      if (error) throw error;

      const isMember = !!membership && new Date(membership.current_period_end) > new Date();
      const subscriptionEnd = membership?.current_period_end || null;
      const canceled = membership?.status === 'canceled';

      // Cache the result
      setCachedMembership(user.id, isMember, subscriptionEnd, canceled);

      setState({
        isMember,
        subscriptionEnd,
        canceled,
        loading: false,
        error: null,
      });
    } catch (err) {
      // Silently handle auth errors (user logged out)
      const errorMessage = err instanceof Error ? err.message : 'Failed to check membership';
      if (errorMessage.includes('Auth session missing') || errorMessage.includes('session') || errorMessage.includes('401')) {
        clearCachedMembership();
        setState(prev => ({ ...prev, isMember: false, loading: false, error: null }));
        return;
      }
      console.error('Error checking membership:', err);
      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
    }
  }, [session, user, authLoading]);

  // Verify cache matches current user once auth loads
  useEffect(() => {
    if (user?.id) {
      // Check if cached data belongs to this user
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const data: CachedMembership = JSON.parse(cached);
          if (data.userId !== user.id) {
            // Cache belongs to different user - clear it and reset state
            clearCachedMembership();
            setState({
              isMember: false,
              subscriptionEnd: null,
              canceled: false,
              loading: true,
              error: null,
            });
          }
        }
      } catch {
        // Ignore errors
      }
    } else if (!authLoading) {
      // User logged out
      clearCachedMembership();
      setState(prev => ({ ...prev, isMember: false, loading: false }));
    }
  }, [user?.id, authLoading]);

  // Check membership when auth state settles
  useEffect(() => {
    if (!authLoading) {
      checkMembership();
    }
  }, [authLoading, checkMembership]);

  // Refresh membership every minute when user is logged in
  useEffect(() => {
    if (!session || authLoading) return;
    
    const interval = setInterval(checkMembership, 60000);
    return () => clearInterval(interval);
  }, [session, authLoading, checkMembership]);

  const getMemberPrice = (basePrice: number, slug?: string, size?: string): number => {
    if (!state.isMember) return basePrice;
    
    // If slug and size provided, look up specific member price
    if (slug && size) {
      const specificPrice = getMemberPriceBySlug(slug, size);
      if (specificPrice !== undefined) return specificPrice;
    }
    
    // Fallback to ~23% discount for products without specific member prices
    return Math.round(basePrice * 0.77);
  };

  return {
    ...state,
    checkMembership,
    getMemberPrice,
  };
};
