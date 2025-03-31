
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Conversation } from "@/types/chat";
import { useAuth } from "@/contexts/AuthContext";

export const useConversations = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConversations = async () => {
      if (!user) return;
      
      try {
        // Use the correct typing for the RPC call by using an explicit generic type
        const { data, error } = await supabase.rpc<Conversation[]>(
          'get_conversations_with_details',
          { user_id: user.id }
        );

        if (error) {
          console.error("Error fetching conversations:", error);
          return;
        }

        if (data) {
          setConversations(data);
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
