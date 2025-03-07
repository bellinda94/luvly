
import { Card, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { VerificationIcon } from "@/components/VerificationIcon";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

type ChatPartner = {
  id: string;
  username: string | null;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  verification_status: string | null;
};

type Conversation = {
  id: string;
  match_id: string;
  created_at: string;
  updated_at: string;
  last_message?: {
    content: string;
    created_at: string;
    sender_id: string;
  };
  chat_partner: ChatPartner;
};

const ChatsView = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConversations = async () => {
      if (!user) return;
      
      try {
        // Use raw SQL query for matches to avoid type issues
        const { data: matchesData, error: matchesError } = await supabase
          .rpc('get_user_matches', { user_id: user.id });
        
        if (matchesError) {
          console.error("Error fetching matches:", matchesError);
          // Fallback to direct query if RPC isn't available yet
          const { data: fallbackMatchesData, error: fallbackError } = await supabase
            .from('matches')
            .select('*')
            .or(`profile_1_id.eq.${user.id},profile_2_id.eq.${user.id}`);
            
          if (fallbackError) {
            console.error("Fallback error fetching matches:", fallbackError);
            setLoading(false);
            return;
          }
          
          if (!fallbackMatchesData || fallbackMatchesData.length === 0) {
            setLoading(false);
            return;
          }
          
          // Continue with fallback data
          const matchesData = fallbackMatchesData;
          
          // Use raw SQL query for conversations to avoid type issues
          const { data: conversationsData, error: conversationsError } = await supabase
            .from('conversations')
            .select('*')
            .in('match_id', matchesData.map(match => match.id));
            
          if (conversationsError) {
            console.error("Error fetching conversations:", conversationsError);
            setLoading(false);
            return;
          }
          
          if (!conversationsData || conversationsData.length === 0) {
            setLoading(false);
            return;
          }
          
          // For each conversation, get:
          // 1. The last message
          // 2. The chat partner's profile
          const conversationsWithDetails = await Promise.all(
            conversationsData.map(async (conversation) => {
              // Get the match for this conversation
              const match = matchesData.find(m => m.id === conversation.match_id);
              if (!match) return null;
              
              // Determine which profile is the chat partner
              const partnerProfileId = match.profile_1_id === user.id ? match.profile_2_id : match.profile_1_id;
              
              // Get the chat partner's profile using raw query
              const { data: partnerProfile, error: profileError } = await supabase
                .from('profiles')
                .select('id, username, first_name, last_name, avatar_url, verification_status')
                .eq('id', partnerProfileId)
                .single();
                
              if (profileError) {
                console.error("Error fetching partner profile:", profileError);
                return null;
              }
              
              // Get the last message for this conversation
              const { data: lastMessage, error: messageError } = await supabase
                .from('messages')
                .select('content, created_at, sender_id')
                .eq('conversation_id', conversation.id)
                .order('created_at', { ascending: false })
                .limit(1)
                .single();
                
              if (messageError && messageError.code !== 'PGRST116') {
                console.error("Error fetching last message:", messageError);
              }
              
              return {
                ...conversation,
                last_message: lastMessage || undefined,
                chat_partner: partnerProfile
              };
            })
          );
          
          // Filter out any null results and sort by last message time
          const validConversations = conversationsWithDetails
            .filter(Boolean) as Conversation[];
            
          // Sort conversations by last message date or conversation updated date
          const sortedConversations = validConversations.sort((a, b) => {
            const aDate = a.last_message?.created_at || a.updated_at;
            const bDate = b.last_message?.created_at || b.updated_at;
            return new Date(bDate).getTime() - new Date(aDate).getTime();
          });
          
          setConversations(sortedConversations);
        }
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
          // When new message arrives, refresh conversations
          fetchConversations();
        }
      )
      .subscribe();
      
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6 flex justify-center items-center h-[calc(100vh-64px)]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Nachrichten</h2>
      </div>
      
      {conversations.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Du hast noch keine Matches oder Chats.</p>
          <p className="text-gray-500 mt-2">Starte das Swipen, um neue Leute kennenzulernen!</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {conversations.map((conversation) => (
            <Link to={`/app/chats/${conversation.id}`} key={conversation.id}>
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="relative">
                    <img
                      src={conversation.chat_partner.avatar_url || "/placeholder.svg"}
                      alt={conversation.chat_partner.username || "Profile"}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1">
                      <h3 className="text-lg font-semibold">
                        {conversation.chat_partner.first_name || conversation.chat_partner.username || "User"}
                      </h3>
                      <VerificationIcon status={conversation.chat_partner.verification_status || "unverified"} />
                    </div>
                    <p className="text-sm text-gray-500 truncate max-w-[200px]">
                      {conversation.last_message?.content || "Neuer Match! Starte ein Gespräch."}
                    </p>
                  </div>
                  {conversation.last_message && (
                    <div className="text-xs text-gray-400">
                      {new Date(conversation.last_message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  )}
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatsView;
