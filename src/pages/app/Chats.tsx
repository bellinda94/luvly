
import { useConversations } from "@/hooks/useConversations";
import { ConversationList } from "@/components/chat/ConversationList";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const ChatsView = () => {
  const { user } = useAuth();
  const { conversations, loading, error } = useConversations(user?.id || "");

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6 flex justify-center items-center h-[calc(100vh-64px)]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
          <p>Fehler beim Laden der Gespräche: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Nachrichten</h2>
      </div>
      <ConversationList conversations={conversations} />
    </div>
  );
};

export default ChatsView;
