import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MatchesView = () => {
  const matches = [
    { id: 1, name: "Sarah", lastMessage: "Hey, wie geht's?", imageUrl: "/placeholder.svg" },
    { id: 2, name: "Tom", lastMessage: "Was machst du heute?", imageUrl: "/placeholder.svg" },
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6">Deine Matches</h2>
      <div className="grid gap-4">
        {matches.map((match) => (
          <Card key={match.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center gap-4">
              <img
                src={match.imageUrl}
                alt={match.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <CardTitle className="text-lg">{match.name}</CardTitle>
                <p className="text-sm text-gray-500">{match.lastMessage}</p>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MatchesView;