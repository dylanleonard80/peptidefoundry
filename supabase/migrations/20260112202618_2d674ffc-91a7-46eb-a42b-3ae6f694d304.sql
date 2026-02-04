-- Drop the existing broken policy that tries to query auth.users
DROP POLICY IF EXISTS "Users can view own application" ON public.applications;

-- Create a fixed policy that only checks user_id
CREATE POLICY "Users can view own application"
ON public.applications
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);