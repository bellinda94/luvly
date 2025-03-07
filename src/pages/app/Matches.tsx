
import { ProfileCard } from "@/components/ProfileCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useProfiles } from "@/hooks/useProfiles";

const MatchesView = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { profiles, loading } = useProfiles();
  
  const filteredProfiles = profiles.filter(profile => 
    profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    profile.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
    profile.preferences?.interests?.some(interest => 
      interest.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <Tabs defaultValue="matches" className="w-full">
        <TabsList className="w-full mb-6">
          <TabsTrigger value="matches" className="flex-1">Matches</TabsTrigger>
          <TabsTrigger value="my-matches" className="flex-1">Meine Matches</TabsTrigger>
          <TabsTrigger value="top-picks" className="flex-1">Top Picks</TabsTrigger>
        </TabsList>

        <div className="mb-6 relative">
          <Input
            type="text"
            placeholder="Suche nach Namen, Alter, Interessen..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
        </div>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        ) : (
          <>
            <TabsContent value="matches">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProfiles.map((profile) => (
                  <div key={profile.id} className="h-[500px]">
                    <ProfileCard
                      {...profile}
                      onLike={() => {
                        toast.success(`${profile.name} wurde geliked`);
                      }}
                      onPass={() => {
                        toast.success(`${profile.name} wurde übersprungen`);
                      }}
                      onMessage={() => {
                        toast.success(`Nachricht an ${profile.name} gesendet`);
                      }}
                    />
                  </div>
                ))}
              </div>
              {filteredProfiles.length === 0 && (
                <div className="text-center py-8">
                  <h3 className="text-xl font-semibold mb-4">
                    {searchQuery ? "Keine Ergebnisse gefunden" : "Noch keine Matches"}
                  </h3>
                  <p className="text-gray-600">
                    {searchQuery 
                      ? "Versuche es mit anderen Suchbegriffen"
                      : "Swipe weiter, um neue Leute kennenzulernen!"}
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="my-matches">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProfiles.map((profile) => (
                  <div key={profile.id} className="h-[500px]">
                    <ProfileCard
                      {...profile}
                      onPass={() => {
                        toast.success(`${profile.name} wurde übersprungen`);
                      }}
                      onMessage={() => {
                        toast.success(`Nachricht an ${profile.name} gesendet`);
                      }}
                      hideActions={["like"]}
                    />
                  </div>
                ))}
              </div>
              {filteredProfiles.length === 0 && (
                <div className="text-center py-8">
                  <h3 className="text-xl font-semibold mb-4">
                    {searchQuery ? "Keine Ergebnisse gefunden" : "Keine eigenen Matches"}
                  </h3>
                  <p className="text-gray-600">
                    {searchQuery 
                      ? "Versuche es mit anderen Suchbegriffen"
                      : "Du hast noch niemanden gematcht. Fang an zu swipen!"}
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="top-picks">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProfiles.map((profile) => (
                  <div key={profile.id} className="h-[500px]">
                    <ProfileCard
                      {...profile}
                      onLike={() => {
                        toast.success(`${profile.name} wurde geliked`);
                      }}
                      onPass={() => {
                        toast.success(`${profile.name} wurde übersprungen`);
                      }}
                      onMessage={() => {
                        toast.success(`Nachricht an ${profile.name} gesendet`);
                      }}
                    />
                  </div>
                ))}
              </div>
              {filteredProfiles.length === 0 && (
                <div className="text-center py-8">
                  <h3 className="text-xl font-semibold mb-4">
                    {searchQuery ? "Keine Ergebnisse gefunden" : "Keine Top Picks verfügbar"}
                  </h3>
                  <p className="text-gray-600">
                    {searchQuery 
                      ? "Versuche es mit anderen Suchbegriffen"
                      : "Schau später wieder vorbei für neue Vorschläge!"}
                  </p>
                </div>
              )}
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  );
};

export default MatchesView;
