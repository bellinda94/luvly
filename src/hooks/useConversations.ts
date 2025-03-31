
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Conversation } from "@/types/chat";

export const useConversations = (userId: string) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchConversations = async () => {
      if (!userId) return;
      
      try {
        setLoading(true);
        // Korrekter Aufruf der RPC-Methode mit zwei generischen Typen
        const { data, error } = await supabase.rpc<Conversation[], { user_id: string }>(
          'get_conversations_with_details',
          { user_id: userId }
        );

        if (error) {
          console.error("Error fetching conversations:", error);
          setError(new Error(error.message));
          return;
        }

        if (data) {
          setConversations(data);
        }
      } catch (error) {
        console.error("Error loading conversations:", error);
        setError(error instanceof Error ? error : new Error('Unknown error occurred'));
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
  }, [userId]);

  return { conversations, loading, error };
};
