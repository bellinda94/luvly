
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
          // Transform the Supabase profiles into our User type without mock data
          const transformedProfiles: User[] = data.map((profile) => ({
            id: profile.id, // Use the actual UUID
            name: profile.username || "User",
            age: null, // No mock age
            distance: null, // No mock distance
            bio: "No bio provided yet",
            imageUrl: profile.avatar_url || "/placeholder.svg", // Use placeholder if no image
            verified: "unverified" as const,
            preferences: {
              interests: [],
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
