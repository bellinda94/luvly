
import { Card, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { VerificationIcon } from "@/components/VerificationIcon";
import { Conversation } from "@/types/chat";

type ConversationListProps = {
  conversations: Conversation[];
};

export const ConversationList = ({ conversations }: ConversationListProps) => {
  if (conversations.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Du hast noch keine Matches oder Chats.</p>
        <p className="text-gray-500 mt-2">Starte das Swipen, um neue Leute kennenzulernen!</p>
      </div>
    );
  }

  return (
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
                  <VerificationIcon 
                    status={conversation.chat_partner.verification_status || "unverified"} 
                  />
                </div>
                <p className="text-sm text-gray-500 truncate max-w-[200px]">
                  {conversation.last_message?.content || "Neuer Match! Starte ein Gespräch."}
                </p>
              </div>
              {conversation.last_message && (
                <div className="text-xs text-gray-400">
                  {new Date(conversation.last_message.created_at).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              )}
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
};
