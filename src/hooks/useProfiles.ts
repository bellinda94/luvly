
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
          .select('id, username, avatar_url'); // Only select columns that exist in the database

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
            bio: "No bio provided yet", // Default bio since the column doesn't exist
            imageUrl: profile.avatar_url || "/placeholder.svg",
            verified: "unverified", // Default verification status
            preferences: {
              interests: [], // Default empty interests
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
