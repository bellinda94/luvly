
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Conversation } from "@/types/chat";

export const useConversations = (userId: string) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchConversations = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const { data, error } = await supabase.rpc('get_conversations_with_details', {
          user_id: userId
        });

        if (error) {
          throw new Error(error.message);
        }

        if (data) {
          setConversations(data as Conversation[]);
        }
      } catch (err) {
        console.error("Error fetching conversations:", err);
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, [userId]);

  return { conversations, loading, error };
};
