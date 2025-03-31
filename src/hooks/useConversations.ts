
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Conversation } from "@/types/chat";
import { useAuth } from "@/contexts/AuthContext";
import '@/types/supabase'; // Import the extended types

export const useConversations = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConversations = async () => {
      if (!user) return;
      
      try {
        // Get conversations for the user using the RPC function
        // Cast the entire response from the RPC call to the expected type
        const response = await supabase
          .rpc('get_conversations_with_details', { user_id: user.id });
          
        // Then explicitly cast the response to the expected structure
        const { data: conversationsData, error } = response as unknown as {
          data: Conversation[] | null;
          error: Error | null;
        };

        if (error) {
          console.error("Error fetching conversations:", error);
          return;
        }

        if (conversationsData) {
          setConversations(conversationsData);
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
