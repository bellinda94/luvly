import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AuthChangeEvent, Session, User } from "@supabase/supabase-js";

type AuthContextType = {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
  recoveryMode: boolean;
  exitRecoveryMode: () => void;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  isLoading: true,
  signOut: async () => {},
  recoveryMode: false,
  exitRecoveryMode: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [recoveryMode, setRecoveryMode] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      
      try {
        const { data } = await supabase.auth.getSession();
        setSession(data.session);
        setUser(data.session?.user ?? null);
        if (data.session?.user?.aud === 'authenticated' && window.location.hash.includes('type=recovery')) {
           setRecoveryMode(true);
        } 
      } catch (error) {
        console.error("Error loading user session:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event: AuthChangeEvent, newSession: Session | null) => {
        setSession(newSession);
        setUser(newSession?.user ?? null);

        if (event === 'PASSWORD_RECOVERY') {
          setRecoveryMode(true);
        } else if (event === 'USER_UPDATED' || event === 'SIGNED_IN') {
           setRecoveryMode(false); 
        } 

        setIsLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
       setRecoveryMode(false); 
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const exitRecoveryMode = () => {
    setRecoveryMode(false);
  };

  const value = {
    session,
    user,
    isLoading,
    signOut,
    recoveryMode,
    exitRecoveryMode,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
