
import { Database as OriginalDatabase } from '@/integrations/supabase/types';

declare global {
  type Database = OriginalDatabase & {
    public: {
      Functions: {
        get_conversations_with_details: {
          Args: { user_id: string };
          Returns: Array<{
            id: string;
            match_id: string;
            created_at: string;
            updated_at: string;
            last_message?: {
              content: string;
              created_at: string;
              sender_id: string;
            };
            chat_partner: {
              id: string;
              username: string | null;
              first_name: string | null;
              last_name: string | null;
              avatar_url: string | null;
              verification_status: "unverified" | "pending" | "verified";
            };
          }>;
        };
      };
    };
  };
}
