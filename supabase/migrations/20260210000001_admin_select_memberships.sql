-- Allow admins to view all memberships
CREATE POLICY "Admins can view all memberships"
  ON public.memberships FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
