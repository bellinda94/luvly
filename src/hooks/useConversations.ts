
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Conversation, Match } from "@/types/chat";
import { useAuth } from "@/contexts/AuthContext";

export const useConversations = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConversations = async () => {
      if (!user) return;
      
      try {
        // Get matches for the user using Edge Function
        const { data: matchesData } = await supabase.functions.invoke('get_user_matches', {
          body: { user_id: user.id }
        });

        if (!matchesData || matchesData.length === 0) {
          setLoading(false);
          return;
        }

        // Get conversations for these matches
        const { data: conversationsData } = await supabase.rpc('get_conversations_with_details', {
          user_id: user.id
        });

        if (!conversationsData) {
          setLoading(false);
          return;
        }

        setConversations(conversationsData);
      } catch (error) {
        console.error("Error loading conversations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
    
    // Set up realtime subscription for new messages
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
