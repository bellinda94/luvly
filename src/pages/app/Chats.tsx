import { Card, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const ChatsView = () => {
  const chats = [
    { id: 1, name: "Sarah", lastMessage: "Hey, wie geht's?", imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330", verified: true },
    { id: 2, name: "Michael", lastMessage: "Was machst du heute?", imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e", verified: false },
  ];

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
                    src={chat.imageUrl}
                    alt={chat.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {chat.verified && (
                    <CheckCircle 
                      className={cn(
                        "w-4 h-4 absolute -right-1 -bottom-1",
                        chat.verified ? "text-primary" : "text-gray-300"
                      )} 
                    />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <h3 className="text-lg font-semibold">{chat.name}</h3>
                    <CheckCircle 
                      className={cn(
                        "w-4 h-4",
                        chat.verified ? "text-primary" : "text-gray-300"
                      )} 
                    />
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