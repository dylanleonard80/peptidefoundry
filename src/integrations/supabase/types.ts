export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      applications: {
        Row: {
          created_at: string
          email: string
          first_name: string
          goals: string[] | null
          id: string
          last_name: string
          phone: string | null
          physician_name: string | null
          physician_phone: string | null
          reason: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          state: string | null
          status: Database["public"]["Enums"]["application_status"]
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          first_name: string
          goals?: string[] | null
          id?: string
          last_name: string
          phone?: string | null
          physician_name?: string | null
          physician_phone?: string | null
          reason?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          state?: string | null
          status?: Database["public"]["Enums"]["application_status"]
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string
          goals?: string[] | null
          id?: string
          last_name?: string
          phone?: string | null
          physician_name?: string | null
          physician_phone?: string | null
          reason?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          state?: string | null
          status?: Database["public"]["Enums"]["application_status"]
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      carts: {
        Row: {
          created_at: string | null
          id: string
          items: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          items?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          items?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      health_profiles: {
        Row: {
          allergies: string | null
          conditions: string[] | null
          created_at: string | null
          current_medications: string | null
          date_of_birth: string | null
          gender: string | null
          height_inches: number | null
          id: string
          onboarding_completed_at: string | null
          onboarding_path: string | null
          peptide_experience_details: string | null
          previous_peptide_experience: boolean | null
          primary_goals: string[] | null
          secondary_goals: string[] | null
          updated_at: string | null
          user_id: string
          weight_lbs: number | null
        }
        Insert: {
          allergies?: string | null
          conditions?: string[] | null
          created_at?: string | null
          current_medications?: string | null
          date_of_birth?: string | null
          gender?: string | null
          height_inches?: number | null
          id?: string
          onboarding_completed_at?: string | null
          onboarding_path?: string | null
          peptide_experience_details?: string | null
          previous_peptide_experience?: boolean | null
          primary_goals?: string[] | null
          secondary_goals?: string[] | null
          updated_at?: string | null
          user_id: string
          weight_lbs?: number | null
        }
        Update: {
          allergies?: string | null
          conditions?: string[] | null
          created_at?: string | null
          current_medications?: string | null
          date_of_birth?: string | null
          gender?: string | null
          height_inches?: number | null
          id?: string
          onboarding_completed_at?: string | null
          onboarding_path?: string | null
          peptide_experience_details?: string | null
          previous_peptide_experience?: boolean | null
          primary_goals?: string[] | null
          secondary_goals?: string[] | null
          updated_at?: string | null
          user_id?: string
          weight_lbs?: number | null
        }
        Relationships: []
      }
      memberships: {
        Row: {
          created_at: string | null
          current_period_end: string | null
          current_period_start: string | null
          id: string
          status: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      orders: {
        Row: {
          carrier: string | null
          created_at: string | null
          delivered_at: string | null
          guest_email: string | null
          id: string
          items: Json
          order_number: string
          shipped_at: string | null
          shipping: number
          shipping_address: Json
          shipping_label_url: string | null
          shippo_transaction_id: string | null
          status: Database["public"]["Enums"]["order_status"] | null
          stripe_payment_id: string | null
          stripe_payment_intent_id: string | null
          subtotal: number
          total: number
          tracking_number: string | null
          user_id: string | null
        }
        Insert: {
          carrier?: string | null
          created_at?: string | null
          delivered_at?: string | null
          guest_email?: string | null
          id?: string
          items?: Json
          order_number: string
          shipped_at?: string | null
          shipping: number
          shipping_address: Json
          shipping_label_url?: string | null
          shippo_transaction_id?: string | null
          status?: Database["public"]["Enums"]["order_status"] | null
          stripe_payment_id?: string | null
          stripe_payment_intent_id?: string | null
          subtotal: number
          total: number
          tracking_number?: string | null
          user_id?: string | null
        }
        Update: {
          carrier?: string | null
          created_at?: string | null
          delivered_at?: string | null
          guest_email?: string | null
          id?: string
          items?: Json
          order_number?: string
          shipped_at?: string | null
          shipping?: number
          shipping_address?: Json
          shipping_label_url?: string | null
          shippo_transaction_id?: string | null
          status?: Database["public"]["Enums"]["order_status"] | null
          stripe_payment_id?: string | null
          stripe_payment_intent_id?: string | null
          subtotal?: number
          total?: number
          tracking_number?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          city: string | null
          created_at: string | null
          date_of_birth: string | null
          email: string | null
          first_name: string
          gender: string | null
          id: string
          last_name: string
          phone: string | null
          state: string | null
          street_address: string | null
          updated_at: string | null
          zip_code: string | null
        }
        Insert: {
          city?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email?: string | null
          first_name?: string
          gender?: string | null
          id: string
          last_name?: string
          phone?: string | null
          state?: string | null
          street_address?: string | null
          updated_at?: string | null
          zip_code?: string | null
        }
        Update: {
          city?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email?: string | null
          first_name?: string
          gender?: string | null
          id?: string
          last_name?: string
          phone?: string | null
          state?: string | null
          street_address?: string | null
          updated_at?: string | null
          zip_code?: string | null
        }
        Relationships: []
      }
      research_digests: {
        Row: {
          clinical_trials: Json | null
          created_at: string | null
          highlights: Json | null
          id: string
          is_published: boolean | null
          peptide_news: Json | null
          research_findings: Json | null
          summary: string | null
          title: string
          updated_at: string | null
          week_of: string
        }
        Insert: {
          clinical_trials?: Json | null
          created_at?: string | null
          highlights?: Json | null
          id?: string
          is_published?: boolean | null
          peptide_news?: Json | null
          research_findings?: Json | null
          summary?: string | null
          title: string
          updated_at?: string | null
          week_of: string
        }
        Update: {
          clinical_trials?: Json | null
          created_at?: string | null
          highlights?: Json | null
          id?: string
          is_published?: boolean | null
          peptide_news?: Json | null
          research_findings?: Json | null
          summary?: string | null
          title?: string
          updated_at?: string | null
          week_of?: string
        }
        Relationships: []
      }
      user_agreements: {
        Row: {
          agreed_at: string
          created_at: string | null
          id: string
          ip_address: string | null
          signature_text: string
          terms_version: string
          user_agent: string | null
          user_id: string
        }
        Insert: {
          agreed_at?: string
          created_at?: string | null
          id?: string
          ip_address?: string | null
          signature_text: string
          terms_version: string
          user_agent?: string | null
          user_id: string
        }
        Update: {
          agreed_at?: string
          created_at?: string | null
          id?: string
          ip_address?: string | null
          signature_text?: string
          terms_version?: string
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_duplicate_medical_profiles: {
        Args: never
        Returns: {
          profile_count: number
          user_id: string
        }[]
      }
      get_user_role: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["app_role"]
      }
      has_active_membership: { Args: { _user_id: string }; Returns: boolean }
      has_approved_application: { Args: { _user_id: string }; Returns: boolean }
      has_completed_onboarding: { Args: { _user_id: string }; Returns: boolean }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      has_signed_terms: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "patient" | "provider" | "admin"
      application_status: "pending" | "approved" | "rejected"
      order_status:
        | "pending"
        | "processing"
        | "shipped"
        | "delivered"
        | "cancelled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["patient", "provider", "admin"],
      application_status: ["pending", "approved", "rejected"],
      order_status: [
        "pending",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
      ],
    },
  },
} as const
