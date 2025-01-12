import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const ChatsView = () => {
  const chats = [
    { id: 1, name: "Sarah", lastMessage: "Hey, wie geht's?", imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330" },
    { id: 2, name: "Michael", lastMessage: "Was machst du heute?", imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e" },
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Nachrichten</h2>
      </div>
      <div className="grid gap-4">
        {chats.map((chat) => (
          <Card key={chat.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center gap-4">
              <img
                src={chat.imageUrl}
                alt={chat.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <CardTitle className="text-lg">{chat.name}</CardTitle>
                <p className="text-sm text-gray-500">{chat.lastMessage}</p>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ChatsView;