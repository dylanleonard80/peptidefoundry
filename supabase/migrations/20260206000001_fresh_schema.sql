-- ============================================================================
-- Peptide Foundry: Fresh Schema Migration
-- Creates all enums, tables, functions, triggers, indexes, and RLS policies
-- for the new Supabase project (lxkgqglqrmtpinxqsztc)
-- ============================================================================

BEGIN;

-- ============================================================================
-- ENUMS
-- ============================================================================

CREATE TYPE public.app_role AS ENUM ('patient', 'provider', 'admin');
CREATE TYPE public.order_status AS ENUM ('pending', 'processing', 'shipped', 'delivered', 'cancelled');
CREATE TYPE public.application_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE public.product_status AS ENUM ('active', 'draft', 'archived');
CREATE TYPE public.product_type AS ENUM ('peptide', 'blend', 'supply');

-- ============================================================================
-- TRIGGER FUNCTIONS (no table references, safe to create before tables)
-- ============================================================================

-- Auto-update updated_at column
CREATE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Create profile + default role on new user signup
CREATE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    NEW.email
  );

  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'patient');

  RETURN NEW;
END;
$$;

-- Enforce order user_id matches auth user
CREATE FUNCTION public.enforce_order_user_id()
RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF auth.uid() IS NOT NULL AND NEW.user_id IS NOT NULL AND NEW.user_id != auth.uid() THEN
    RAISE EXCEPTION 'Cannot create order for another user';
  END IF;
  RETURN NEW;
END;
$$;

-- ============================================================================
-- EXISTING TABLES (recreated)
-- ============================================================================

-- Profiles
CREATE TABLE public.profiles (
  id uuid NOT NULL PRIMARY KEY,
  first_name text NOT NULL DEFAULT '',
  last_name text NOT NULL DEFAULT '',
  email text,
  date_of_birth date,
  phone text,
  gender text,
  street_address text,
  city text,
  state text,
  zip_code text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),

  CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- User roles
CREATE TABLE public.user_roles (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz DEFAULT now(),

  CONSTRAINT user_roles_user_id_role_key UNIQUE (user_id, role),
  CONSTRAINT user_roles_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Carts
CREATE TABLE public.carts (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL UNIQUE,
  items jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),

  CONSTRAINT carts_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Orders (with new internal_notes and updated_at columns)
CREATE TABLE public.orders (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number text NOT NULL UNIQUE,
  user_id uuid,
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  subtotal numeric(10,2) NOT NULL,
  shipping numeric(10,2) NOT NULL,
  total numeric(10,2) NOT NULL,
  status public.order_status DEFAULT 'pending',
  stripe_payment_id text,
  stripe_payment_intent_id text,
  shipping_address jsonb NOT NULL,
  tracking_number text,
  carrier text,
  shipping_label_url text,
  shippo_transaction_id text,
  guest_email text,
  internal_notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  shipped_at timestamptz,
  delivered_at timestamptz,

  CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Memberships
CREATE TABLE public.memberships (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL UNIQUE,
  stripe_customer_id text,
  stripe_subscription_id text,
  status text NOT NULL DEFAULT 'inactive',
  current_period_start timestamptz,
  current_period_end timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),

  CONSTRAINT memberships_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Applications
CREATE TABLE public.applications (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text,
  reason text,
  physician_name text,
  physician_phone text,
  state text,
  goals text[],
  status public.application_status NOT NULL DEFAULT 'pending',
  reviewed_at timestamptz,
  reviewed_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT applications_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE,
  CONSTRAINT applications_reviewed_by_fkey FOREIGN KEY (reviewed_by) REFERENCES auth.users(id)
);

-- Health profiles
CREATE TABLE public.health_profiles (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  date_of_birth date,
  gender text,
  height_inches numeric,
  weight_lbs numeric,
  conditions text[],
  allergies text,
  current_medications text,
  previous_peptide_experience boolean,
  peptide_experience_details text,
  primary_goals text[],
  secondary_goals text[],
  onboarding_path text,
  onboarding_completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),

  CONSTRAINT health_profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Research digests
CREATE TABLE public.research_digests (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  week_of date NOT NULL UNIQUE,
  title text NOT NULL,
  summary text,
  peptide_news jsonb DEFAULT '[]'::jsonb,
  clinical_trials jsonb DEFAULT '[]'::jsonb,
  research_findings jsonb DEFAULT '[]'::jsonb,
  highlights jsonb DEFAULT '[]'::jsonb,
  is_published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- User agreements
CREATE TABLE public.user_agreements (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  terms_version text NOT NULL,
  signature_text text NOT NULL,
  agreed_at timestamptz NOT NULL DEFAULT now(),
  ip_address text,
  user_agent text,
  created_at timestamptz DEFAULT now(),

  CONSTRAINT user_agreements_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- ============================================================================
-- NEW TABLES (product catalog, admin audit)
-- ============================================================================

-- Products (master catalog)
CREATE TABLE public.products (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  type public.product_type NOT NULL DEFAULT 'peptide',
  status public.product_status NOT NULL DEFAULT 'draft',
  subtitle text,
  description text,
  additional_description text,
  cas_number text,
  molecular_formula text,
  molar_mass text,
  image_url text,
  in_stock boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  rich_content jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

COMMENT ON COLUMN public.products.rich_content IS 'JSONB blob for benefits, references, aboutParagraphs, howItWorksIntro, howItWorksAccordions, technicalPathways, etc.';

-- Product variants (sizes + pricing)
CREATE TABLE public.product_variants (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id uuid NOT NULL,
  size_label text NOT NULL,
  price numeric(10,2) NOT NULL,
  member_price numeric(10,2),
  sku text,
  in_stock boolean NOT NULL DEFAULT true,
  is_active boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),

  CONSTRAINT product_variants_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE,
  CONSTRAINT product_variants_product_size_unique UNIQUE (product_id, size_label)
);

-- Categories
CREATE TABLE public.categories (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL UNIQUE,
  slug text NOT NULL UNIQUE,
  description text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Product <-> Category (many-to-many)
CREATE TABLE public.product_categories (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id uuid NOT NULL,
  category_id uuid NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,

  CONSTRAINT product_categories_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE,
  CONSTRAINT product_categories_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id) ON DELETE CASCADE,
  CONSTRAINT product_categories_unique UNIQUE (product_id, category_id)
);

-- Blend components (which products make up a blend)
CREATE TABLE public.blend_components (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  blend_product_id uuid NOT NULL,
  component_product_id uuid NOT NULL,
  dosage text,
  sort_order integer NOT NULL DEFAULT 0,

  CONSTRAINT blend_components_blend_fkey FOREIGN KEY (blend_product_id) REFERENCES public.products(id) ON DELETE CASCADE,
  CONSTRAINT blend_components_component_fkey FOREIGN KEY (component_product_id) REFERENCES public.products(id) ON DELETE RESTRICT,
  CONSTRAINT blend_components_unique UNIQUE (blend_product_id, component_product_id)
);

-- Admin audit log
CREATE TABLE public.admin_audit_log (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_user_id uuid NOT NULL,
  action text NOT NULL,
  table_name text,
  record_id uuid,
  before_data jsonb,
  after_data jsonb,
  created_at timestamptz DEFAULT now(),

  CONSTRAINT admin_audit_log_admin_fkey FOREIGN KEY (admin_user_id) REFERENCES auth.users(id)
);

-- ============================================================================
-- FUNCTIONS (require tables to exist)
-- ============================================================================

-- Check if a user has a specific role
CREATE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Get user role
CREATE FUNCTION public.get_user_role(_user_id uuid)
RETURNS public.app_role
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.user_roles
  WHERE user_id = _user_id
  LIMIT 1
$$;

-- Check if a user has an active membership
CREATE FUNCTION public.has_active_membership(_user_id uuid)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.memberships
    WHERE user_id = _user_id AND status = 'active'
  )
$$;

-- Check if a user has an approved application
CREATE FUNCTION public.has_approved_application(_user_id uuid)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.applications
    WHERE user_id = _user_id AND status = 'approved'
  )
$$;

-- Check for duplicate medical profiles (utility)
CREATE FUNCTION public.check_duplicate_medical_profiles()
RETURNS TABLE(user_id uuid, profile_count bigint)
LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT mi.user_id, COUNT(*) as profile_count
  FROM health_profiles mi
  WHERE mi.user_id IS NOT NULL
  GROUP BY mi.user_id
  HAVING COUNT(*) > 1;
END;
$$;

-- Get product with all variants and blend components as JSONB
CREATE FUNCTION public.get_product_with_variants(_slug text)
RETURNS jsonb
LANGUAGE plpgsql STABLE SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result jsonb;
BEGIN
  SELECT jsonb_build_object(
    'product', to_jsonb(p.*),
    'variants', COALESCE((
      SELECT jsonb_agg(to_jsonb(pv.*) ORDER BY pv.price ASC)
      FROM public.product_variants pv
      WHERE pv.product_id = p.id AND pv.is_active = true
    ), '[]'::jsonb),
    'categories', COALESCE((
      SELECT jsonb_agg(jsonb_build_object('id', c.id, 'name', c.name, 'slug', c.slug))
      FROM public.categories c
      JOIN public.product_categories pc ON pc.category_id = c.id
      WHERE pc.product_id = p.id
    ), '[]'::jsonb),
    'blend_components', COALESCE((
      SELECT jsonb_agg(jsonb_build_object(
        'component_name', cp.name,
        'component_slug', cp.slug,
        'dosage', bc.dosage,
        'sort_order', bc.sort_order
      ) ORDER BY bc.sort_order ASC)
      FROM public.blend_components bc
      JOIN public.products cp ON cp.id = bc.component_product_id
      WHERE bc.blend_product_id = p.id
    ), '[]'::jsonb)
  ) INTO result
  FROM public.products p
  WHERE p.slug = _slug AND p.status = 'active';

  RETURN result;
END;
$$;

-- Check if a product is in stock for a given size
CREATE FUNCTION public.check_product_in_stock(_slug text, _size text)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.products p
    JOIN public.product_variants pv ON pv.product_id = p.id
    WHERE p.slug = _slug
      AND p.status = 'active'
      AND p.in_stock = true
      AND pv.size_label = _size
      AND pv.in_stock = true
      AND pv.is_active = true
  )
$$;

-- ============================================================================
-- INDEXES
-- ============================================================================

-- Existing tables
CREATE INDEX idx_applications_status ON public.applications(status);
CREATE INDEX idx_applications_user_id ON public.applications(user_id);
CREATE INDEX idx_orders_user_id ON public.orders(user_id);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_orders_order_number ON public.orders(order_number);
CREATE INDEX idx_health_profiles_user_id ON public.health_profiles(user_id);
CREATE INDEX idx_user_agreements_user_id ON public.user_agreements(user_id);

-- New tables
CREATE INDEX idx_products_slug ON public.products(slug);
CREATE INDEX idx_products_status ON public.products(status);
CREATE INDEX idx_products_type ON public.products(type);
CREATE INDEX idx_product_variants_product_id ON public.product_variants(product_id);
CREATE INDEX idx_product_categories_product_id ON public.product_categories(product_id);
CREATE INDEX idx_product_categories_category_id ON public.product_categories(category_id);
CREATE INDEX idx_blend_components_blend ON public.blend_components(blend_product_id);
CREATE INDEX idx_blend_components_component ON public.blend_components(component_product_id);
CREATE INDEX idx_admin_audit_log_admin ON public.admin_audit_log(admin_user_id);
CREATE INDEX idx_admin_audit_log_table_record ON public.admin_audit_log(table_name, record_id);
CREATE INDEX idx_admin_audit_log_created ON public.admin_audit_log(created_at);

-- ============================================================================
-- TRIGGERS
-- ============================================================================

-- updated_at triggers on existing tables
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_carts_updated_at
  BEFORE UPDATE ON public.carts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_memberships_updated_at
  BEFORE UPDATE ON public.memberships
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_applications_updated_at
  BEFORE UPDATE ON public.applications
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_health_profiles_updated_at
  BEFORE UPDATE ON public.health_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_research_digests_updated_at
  BEFORE UPDATE ON public.research_digests
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- updated_at triggers on new tables
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_product_variants_updated_at
  BEFORE UPDATE ON public.product_variants
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON public.categories
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Order user_id enforcement trigger
CREATE TRIGGER enforce_order_user_before_insert
  BEFORE INSERT ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.enforce_order_user_id();

-- New user signup trigger (fires on auth.users insert)
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_digests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_agreements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blend_components ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_audit_log ENABLE ROW LEVEL SECURITY;

-- ---- Profiles ----
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT TO authenticated
  USING (id = auth.uid());

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE TO authenticated
  USING (id = auth.uid());

CREATE POLICY "Providers and admins can view all profiles"
  ON public.profiles FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'provider') OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update any profile"
  ON public.profiles FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- ---- User Roles ----
CREATE POLICY "Users can view own roles"
  ON public.user_roles FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admins can manage all roles"
  ON public.user_roles TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- ---- Carts ----
CREATE POLICY "Users can manage own cart"
  ON public.carts TO authenticated
  USING (user_id = auth.uid());

-- ---- Orders ----
CREATE POLICY "Users can view own orders"
  ON public.orders FOR SELECT TO authenticated
  USING (user_id IS NOT NULL AND user_id = auth.uid());

CREATE POLICY "Users can insert own orders"
  ON public.orders FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Staff can view all orders"
  ON public.orders FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'provider') OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Staff can update orders"
  ON public.orders FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'provider') OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Deny anonymous access to orders"
  ON public.orders AS RESTRICTIVE TO anon
  USING (false);

CREATE POLICY "Deny public access to orders"
  ON public.orders AS RESTRICTIVE
  USING (false);

-- ---- Memberships ----
CREATE POLICY "Users can view own membership"
  ON public.memberships FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Only admins can insert memberships"
  ON public.memberships FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update memberships"
  ON public.memberships FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete memberships"
  ON public.memberships FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- ---- Applications ----
CREATE POLICY "Users can view own application"
  ON public.applications FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create application"
  ON public.applications FOR INSERT
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Admins can view all applications"
  ON public.applications FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update applications"
  ON public.applications FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

-- ---- Health Profiles ----
CREATE POLICY "Users can view own health profile"
  ON public.health_profiles FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own health profile"
  ON public.health_profiles FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own health profile"
  ON public.health_profiles FOR UPDATE TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admins can view all health profiles"
  ON public.health_profiles FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- ---- Research Digests ----
CREATE POLICY "Members can view published digests"
  ON public.research_digests FOR SELECT
  USING (is_published = true AND public.has_active_membership(auth.uid()));

CREATE POLICY "Admins can manage digests"
  ON public.research_digests
  USING (public.has_role(auth.uid(), 'admin'));

-- ---- User Agreements ----
CREATE POLICY "Users can view own agreements"
  ON public.user_agreements FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own agreements"
  ON public.user_agreements FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

-- ---- Products (public read for active, admin write) ----
CREATE POLICY "Anyone can view active products"
  ON public.products FOR SELECT
  USING (status = 'active');

CREATE POLICY "Admins can view all products"
  ON public.products FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert products"
  ON public.products FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update products"
  ON public.products FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete products"
  ON public.products FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- ---- Product Variants (public read for active, admin write) ----
CREATE POLICY "Anyone can view active product variants"
  ON public.product_variants FOR SELECT
  USING (
    is_active = true
    AND EXISTS (
      SELECT 1 FROM public.products p
      WHERE p.id = product_id AND p.status = 'active'
    )
  );

CREATE POLICY "Admins can view all product variants"
  ON public.product_variants FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert product variants"
  ON public.product_variants FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update product variants"
  ON public.product_variants FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete product variants"
  ON public.product_variants FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- ---- Categories (public read, admin write) ----
CREATE POLICY "Anyone can view categories"
  ON public.categories FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert categories"
  ON public.categories FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update categories"
  ON public.categories FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete categories"
  ON public.categories FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- ---- Product Categories (public read, admin write) ----
CREATE POLICY "Anyone can view product categories"
  ON public.product_categories FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage product categories"
  ON public.product_categories TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- ---- Blend Components (public read, admin write) ----
CREATE POLICY "Anyone can view blend components"
  ON public.blend_components FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage blend components"
  ON public.blend_components TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- ---- Admin Audit Log (admin only) ----
CREATE POLICY "Admins can view audit log"
  ON public.admin_audit_log FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert audit log"
  ON public.admin_audit_log FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

COMMIT;
