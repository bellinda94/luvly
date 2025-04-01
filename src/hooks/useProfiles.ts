import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { User } from "@/types/user";

export const useProfiles = () => {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setLoading(true);
        
        // Wir können auch ohne eingeloggten Benutzer Profile anzeigen (für Demo-Zwecke)
        const { data, error } = await supabase
          .from('profiles')
          .select('id, username, avatar_url, bio, verification_status, interests'); // Select specific columns

        if (error) {
          console.error("Error fetching profiles:", error);
          return;
        }

        if (data) {
          // Transform the Supabase profiles into our User type
          const transformedProfiles: User[] = data.map((profile) => ({
            id: profile.id,
            name: profile.username || "User",
            age: 25, // Demo age
            distance: "5 km", // Demo distance
            bio: profile.bio || "No bio provided yet",
            imageUrl: profile.avatar_url || "/placeholder.svg",
            verified: profile.verification_status || "unverified" as const,
            preferences: {
              interests: profile.interests || [],
            }
          }));
          
          console.log("Transformed profiles:", transformedProfiles);
          setProfiles(transformedProfiles);
        }
      } catch (error) {
        console.error("Error loading profiles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [user]);

  return { profiles, loading };
};
