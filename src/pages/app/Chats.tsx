
import { useConversations } from "@/hooks/useConversations";
import { ConversationList } from "@/components/chat/ConversationList";
import { Loader2 } from "lucide-react";

const ChatsView = () => {
  const { conversations, loading } = useConversations();

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
      <ConversationList conversations={conversations} />
    </div>
  );
};

export default ChatsView;
