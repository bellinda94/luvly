
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
      if (!user) return;
      
      try {
        setLoading(true);
        
        // Get all profiles except the current user
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .neq('id', user.id);

        if (error) {
          console.error("Error fetching profiles:", error);
          return;
        }

        if (data) {
          // Transform the Supabase profiles into our User type
          const transformedProfiles: User[] = data.map((profile) => ({
            id: parseInt(profile.id.split('-')[0], 16) % 1000, // Generate a numeric ID from UUID
            name: profile.username || profile.first_name || "User",
            age: Math.floor(Math.random() * 15) + 25, // Generate random age between 25-40
            distance: `${Math.floor(Math.random() * 10) + 1} km`, // Generate random distance
            bio: "No bio provided yet",
            imageUrl: profile.avatar_url || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
            verified: "unverified" as const,
            preferences: {
              interests: ["Dating", "Friendship"],
            }
          }));
          
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
