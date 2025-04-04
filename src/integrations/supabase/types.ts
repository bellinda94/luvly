export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      blocked_users: {
        Row: {
          blocked_id: string
          blocker_id: string
          created_at: string | null
        }
        Insert: {
          blocked_id: string
          blocker_id: string
          created_at?: string | null
        }
        Update: {
          blocked_id?: string
          blocker_id?: string
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blocked_users_blocked_id_fkey"
            columns: ["blocked_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blocked_users_blocker_id_fkey"
            columns: ["blocker_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          created_at: string | null
          id: string
          match_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          match_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          match_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conversations_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
        ]
      }
      matches: {
        Row: {
          created_at: string | null
          id: string
          profile_1_id: string
          profile_2_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          profile_1_id: string
          profile_2_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          profile_1_id?: string
          profile_2_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "matches_profile_1_id_fkey"
            columns: ["profile_1_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_profile_2_id_fkey"
            columns: ["profile_2_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string | null
          id: number
          sender_id: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string | null
          id?: number
          sender_id: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string | null
          id?: number
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          birthday: string | null
          children_description: string | null
          created_at: string
          drinking_habits:
            | Database["public"]["Enums"]["lifestyle_habit_enum"]
            | null
          education: string | null
          first_name: string | null
          gender: Database["public"]["Enums"]["gender_enum"] | null
          height_cm: number | null
          id: string
          images: string[] | null
          interests: string[] | null
          job: string | null
          last_active_at: string | null
          last_name: string | null
          location_city: string | null
          location_country: string | null
          looking_for_gender:
            | Database["public"]["Enums"]["gender_enum"][]
            | null
          looking_for_relationship:
            | Database["public"]["Enums"]["relationship_type_enum"][]
            | null
          orientation: Database["public"]["Enums"]["orientation_enum"] | null
          profile_complete_percentage: number | null
          search_radius_km: number | null
          smoking_habits:
            | Database["public"]["Enums"]["lifestyle_habit_enum"]
            | null
          sport_habits:
            | Database["public"]["Enums"]["lifestyle_habit_enum"]
            | null
          updated_at: string
          username: string | null
          verification_method: string | null
          verification_status:
            | Database["public"]["Enums"]["verification_status_enum"]
            | null
          wants_children:
            | Database["public"]["Enums"]["children_wish_enum"]
            | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          birthday?: string | null
          children_description?: string | null
          created_at?: string
          drinking_habits?:
            | Database["public"]["Enums"]["lifestyle_habit_enum"]
            | null
          education?: string | null
          first_name?: string | null
          gender?: Database["public"]["Enums"]["gender_enum"] | null
          height_cm?: number | null
          id: string
          images?: string[] | null
          interests?: string[] | null
          job?: string | null
          last_active_at?: string | null
          last_name?: string | null
          location_city?: string | null
          location_country?: string | null
          looking_for_gender?:
            | Database["public"]["Enums"]["gender_enum"][]
            | null
          looking_for_relationship?:
            | Database["public"]["Enums"]["relationship_type_enum"][]
            | null
          orientation?: Database["public"]["Enums"]["orientation_enum"] | null
          profile_complete_percentage?: number | null
          search_radius_km?: number | null
          smoking_habits?:
            | Database["public"]["Enums"]["lifestyle_habit_enum"]
            | null
          sport_habits?:
            | Database["public"]["Enums"]["lifestyle_habit_enum"]
            | null
          updated_at?: string
          username?: string | null
          verification_method?: string | null
          verification_status?:
            | Database["public"]["Enums"]["verification_status_enum"]
            | null
          wants_children?:
            | Database["public"]["Enums"]["children_wish_enum"]
            | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          birthday?: string | null
          children_description?: string | null
          created_at?: string
          drinking_habits?:
            | Database["public"]["Enums"]["lifestyle_habit_enum"]
            | null
          education?: string | null
          first_name?: string | null
          gender?: Database["public"]["Enums"]["gender_enum"] | null
          height_cm?: number | null
          id?: string
          images?: string[] | null
          interests?: string[] | null
          job?: string | null
          last_active_at?: string | null
          last_name?: string | null
          location_city?: string | null
          location_country?: string | null
          looking_for_gender?:
            | Database["public"]["Enums"]["gender_enum"][]
            | null
          looking_for_relationship?:
            | Database["public"]["Enums"]["relationship_type_enum"][]
            | null
          orientation?: Database["public"]["Enums"]["orientation_enum"] | null
          profile_complete_percentage?: number | null
          search_radius_km?: number | null
          smoking_habits?:
            | Database["public"]["Enums"]["lifestyle_habit_enum"]
            | null
          sport_habits?:
            | Database["public"]["Enums"]["lifestyle_habit_enum"]
            | null
          updated_at?: string
          username?: string | null
          verification_method?: string | null
          verification_status?:
            | Database["public"]["Enums"]["verification_status_enum"]
            | null
          wants_children?:
            | Database["public"]["Enums"]["children_wish_enum"]
            | null
        }
        Relationships: []
      }
      rls_test_log: {
        Row: {
          details: string | null
          log_id: number
          logged_at: string
          result: string | null
          run_id: string
          step: string | null
        }
        Insert: {
          details?: string | null
          log_id?: number
          logged_at?: string
          result?: string | null
          run_id?: string
          step?: string | null
        }
        Update: {
          details?: string | null
          log_id?: number
          logged_at?: string
          result?: string | null
          run_id?: string
          step?: string | null
        }
        Relationships: []
      }
      swipes: {
        Row: {
          action: Database["public"]["Enums"]["swipe_action_enum"]
          created_at: string | null
          id: number
          swiped_profile_id: string
          swiper_id: string
        }
        Insert: {
          action: Database["public"]["Enums"]["swipe_action_enum"]
          created_at?: string | null
          id?: number
          swiped_profile_id: string
          swiper_id: string
        }
        Update: {
          action?: Database["public"]["Enums"]["swipe_action_enum"]
          created_at?: string | null
          id?: number
          swiped_profile_id?: string
          swiper_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "swipes_swiped_profile_id_fkey"
            columns: ["swiped_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "swipes_swiper_id_fkey"
            columns: ["swiper_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_blocked: {
        Args: {
          user1_id: string
          user2_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      children_wish_enum:
        | "yes_soon"
        | "yes_later"
        | "open_to_discussion"
        | "already_has_wants_more"
        | "already_has_no_more"
        | "no"
        | "not_sure"
      gender_enum: "male" | "female" | "diverse" | "not_specified"
      lifestyle_habit_enum:
        | "never"
        | "sometimes"
        | "socially"
        | "regularly"
        | "not_specified"
      orientation_enum:
        | "heterosexual"
        | "homosexual"
        | "bisexual"
        | "pansexual"
        | "asexual"
        | "other"
        | "not_specified"
      relationship_type_enum:
        | "long_term"
        | "marriage"
        | "short_term"
        | "friendship"
        | "not_specified"
      swipe_action_enum: "like" | "pass" | "super_like"
      verification_status_enum: "unverified" | "pending" | "verified"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
