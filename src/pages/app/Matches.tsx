import { Card } from "@/components/ui/card";
import { ProfileCard } from "@/components/ProfileCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const MatchesView = () => {
  const { toast } = useToast();
  const [myMatches, setMyMatches] = useState([
    {
      name: "Laura",
      age: 28,
      distance: "1 km",
      bio: "Passionate musician and coffee lover. Always up for concerts and trying new cafés.",
      verified: true,
      imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      images: [
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb"
      ],
      preferences: {
        interests: ["Musik", "Kaffee", "Konzerte", "Kunst"]
      }
    },
    {
      name: "Nina",
      age: 26,
      distance: "3 km",
      bio: "Digital nomad and language enthusiast. Looking for someone to explore the world with.",
      verified: true,
      imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      images: [
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1"
      ],
      preferences: {
        interests: ["Reisen", "Sprachen", "Fotografie", "Kultur"]
      }
    }
  ]);

  const matches = [
    {
      name: "Sarah",
      age: 25,
      distance: "5 km",
      bio: "Love hiking and photography. Always looking for new adventures and beautiful moments to capture through my lens.",
      verified: true,
      imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      images: [
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb"
      ],
      preferences: {
        interests: ["Fotografie", "Wandern", "Reisen", "Kunst"]
      }
    },
    {
      name: "Emma",
      age: 28,
      distance: "3 km",
      bio: "Coffee enthusiast and book lover. Looking for someone to share cozy café mornings and interesting discussions.",
      verified: true,
      imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
      images: [
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
      ],
      preferences: {
        interests: ["Bücher", "Kaffee", "Kunst", "Musik"]
      }
    },
    {
      name: "Julia",
      age: 24,
      distance: "7 km",
      bio: "Yoga teacher and plant mom. Seeking balance in life and someone to share peaceful moments with.",
      verified: true,
      imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      images: [
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb"
      ],
      preferences: {
        interests: ["Yoga", "Meditation", "Nachhaltigkeit", "Kochen"]
      }
    },
    {
      name: "Marie",
      age: 27,
      distance: "4 km",
      bio: "Tech enthusiast and amateur chef. Love trying new recipes and exploring innovative technologies.",
      verified: false,
      imageUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
      images: [
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
      ],
      preferences: {
        interests: ["Technologie", "Kochen", "Gaming", "Fitness"]
      }
    }
  ];

  const topPicks = [
    {
      name: "Lisa",
      age: 26,
      distance: "8 km",
      bio: "Art lover and freelance designer. Passionate about creative projects and meaningful conversations.",
      verified: true,
      imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      images: [
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb"
      ],
      preferences: {
        interests: ["Kunst", "Design", "Fotografie", "Reisen"]
      }
    },
    {
      name: "Sophie",
      age: 29,
      distance: "6 km",
      bio: "Music producer and festival enthusiast. Looking for someone to share adventures and create memories with.",
      verified: true,
      imageUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
      images: [
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
      ],
      preferences: {
        interests: ["Musik", "Festivals", "Reisen", "Sport"]
      }
    },
    {
      name: "Anna",
      age: 25,
      distance: "2 km",
      bio: "Environmental scientist and outdoor enthusiast. Passionate about sustainability and nature conservation.",
      verified: true,
      imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
      images: [
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1"
      ],
      preferences: {
        interests: ["Umweltschutz", "Wandern", "Nachhaltigkeit", "Fotografie"]
      }
    }
  ];

  const handleLike = (profile) => {
    const isAlreadyMatched = myMatches.some(match => match.name === profile.name);
    
    if (!isAlreadyMatched) {
      setMyMatches(prevMatches => [...prevMatches, profile]);
      toast({
        title: "Neues Match!",
        description: `Du hast ${profile.name} erfolgreich gematcht.`,
      });
    }
  };

  const handlePass = (profile) => {
    // Remove the profile from myMatches if it exists there
    setMyMatches(prevMatches => {
      const updatedMatches = prevMatches.filter(match => match.name !== profile.name);
      if (updatedMatches.length !== prevMatches.length) {
        toast({
          title: "Match aufgehoben",
          description: `Match mit ${profile.name} wurde aufgehoben.`,
        });
      }
      return updatedMatches;
    });
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <Tabs defaultValue="matches" className="w-full">
        <TabsList className="w-full mb-6">
          <TabsTrigger value="matches" className="flex-1">Matches</TabsTrigger>
          <TabsTrigger value="my-matches" className="flex-1">Meine Matches</TabsTrigger>
          <TabsTrigger value="top-picks" className="flex-1">Top Picks</TabsTrigger>
        </TabsList>
        
        <TabsContent value="matches">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {matches.map((profile, index) => (
              <div key={index} className="h-[500px]">
                <ProfileCard
                  {...profile}
                  onLike={() => handleLike(profile)}
                  onPass={() => handlePass(profile)}
                />
              </div>
            ))}
          </div>
          {matches.length === 0 && (
            <div className="text-center py-8">
              <h3 className="text-xl font-semibold mb-4">
                Noch keine Matches
              </h3>
              <p className="text-gray-600">
                Swipe weiter, um neue Leute kennenzulernen!
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="my-matches">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {myMatches.map((profile, index) => (
              <div key={index} className="h-[500px]">
                <ProfileCard
                  {...profile}
                  onLike={() => handleLike(profile)}
                  onPass={() => handlePass(profile)}
                />
              </div>
            ))}
          </div>
          {myMatches.length === 0 && (
            <div className="text-center py-8">
              <h3 className="text-xl font-semibold mb-4">
                Keine eigenen Matches
              </h3>
              <p className="text-gray-600">
                Du hast noch niemanden gematcht. Fang an zu swipen!
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="top-picks">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topPicks.map((profile, index) => (
              <div key={index} className="h-[500px]">
                <ProfileCard
                  {...profile}
                  onLike={() => handleLike(profile)}
                  onPass={() => handlePass(profile)}
                />
              </div>
            ))}
          </div>
          {topPicks.length === 0 && (
            <div className="text-center py-8">
              <h3 className="text-xl font-semibold mb-4">
                Keine Top Picks verfügbar
              </h3>
              <p className="text-gray-600">
                Schau später wieder vorbei für neue Vorschläge!
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MatchesView;