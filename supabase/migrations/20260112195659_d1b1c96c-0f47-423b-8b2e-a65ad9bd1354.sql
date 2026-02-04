-- Add state and goals columns to applications table
ALTER TABLE public.applications 
ADD COLUMN IF NOT EXISTS state text,
ADD COLUMN IF NOT EXISTS goals text[];

-- Create index for faster queries on status
CREATE INDEX IF NOT EXISTS idx_applications_status ON public.applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_user_id ON public.applications(user_id);