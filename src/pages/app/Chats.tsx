import { Card, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { VerificationIcon } from "@/components/VerificationIcon";
import { users } from "@/data/users";
import { cn } from "@/lib/utils";

const ChatsView = () => {
  const chats = [
    { id: 1, userId: 1, lastMessage: "Hey, wie geht's?" },
    { id: 2, userId: 2, lastMessage: "Was machst du heute?" },
  ].map(chat => ({
    ...chat,
    user: users[chat.userId]
  }));

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Nachrichten</h2>
      </div>
      <div className="grid gap-4">
        {chats.map((chat) => (
          <Link to={`/app/chats/${chat.id}`} key={chat.id}>
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="relative">
                  <img
                    src={chat.user.imageUrl}
                    alt={chat.user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <h3 className="text-lg font-semibold">{chat.user.name}</h3>
                    <VerificationIcon status={chat.user.verified} />
                  </div>
                  <p className="text-sm text-gray-500">{chat.lastMessage}</p>
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChatsView;