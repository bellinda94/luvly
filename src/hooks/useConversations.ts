
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Conversation } from "@/types/chat";
import { useAuth } from "@/contexts/AuthContext";

// Define the return type for our RPC function
interface ConversationsResponse {
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
}

export const useConversations = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConversations = async () => {
      if (!user) return;
      
      try {
        // Call the RPC function without explicit generic types
        const { data, error } = await supabase
          .rpc('get_conversations_with_details', { user_id: user.id } as any);

        if (error) {
          console.error("Error fetching conversations:", error);
          return;
        }

        if (data) {
          // Cast the response to the expected type
          setConversations(data as unknown as Conversation[]);
        }
      } catch (error) {
        console.error("Error loading conversations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
    
    // Set up realtime subscription for messages
    const channel = supabase
      .channel('public:messages')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'messages' }, 
        () => {
          fetchConversations();
        }
      )
      .subscribe();
      
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  return { conversations, loading };
};
