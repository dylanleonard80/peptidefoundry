import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export type ApplicationStatus = 'pending' | 'approved' | 'rejected' | null;

interface Application {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  reason: string | null;
  physician_name: string | null;
  physician_phone: string | null;
  status: ApplicationStatus;
  created_at: string;
}

interface ApplicationData {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  reason?: string;
  physician_name?: string;
  physician_phone?: string;
}

export const useApplication = () => {
  const { user, loading: authLoading } = useAuth();
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (authLoading) return;
    
    if (user) {
      fetchApplication();
    } else {
      setApplication(null);
      setLoading(false);
    }
  }, [user, authLoading]);

  const fetchApplication = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (error) {
        console.error('Error fetching application:', error);
      } else {
        setApplication(data as Application | null);
      }
    } catch (err) {
      console.error('Error fetching application:', err);
    } finally {
      setLoading(false);
    }
  };

  const submitApplication = async (data: ApplicationData) => {
    setSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('applications')
        .insert({
          user_id: user?.id || null,
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          phone: data.phone || null,
          reason: data.reason || null,
          physician_name: data.physician_name || null,
          physician_phone: data.physician_phone || null,
          status: 'pending',
        });
      
      if (error) {
        toast({
          title: 'Application failed',
          description: error.message,
          variant: 'destructive',
        });
        return { error };
      }
      
      toast({
        title: 'Application submitted!',
        description: 'We\'ll review your application and verify with your physician.',
      });
      
      await fetchApplication();
      return { error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      toast({
        title: 'Application failed',
        description: errorMessage,
        variant: 'destructive',
      });
      return { error: err };
    } finally {
      setSubmitting(false);
    }
  };

  const isApproved = application?.status === 'approved';
  const isPending = application?.status === 'pending';
  const isRejected = application?.status === 'rejected';
  const hasApplied = application !== null;

  return {
    application,
    loading: loading || authLoading,
    submitting,
    submitApplication,
    isApproved,
    isPending,
    isRejected,
    hasApplied,
    refetch: fetchApplication,
  };
};
