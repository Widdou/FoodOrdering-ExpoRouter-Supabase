import { supabase } from "@/lib/supabase";
import { Tables } from "@/types";
import { Session } from "@supabase/supabase-js";
import { createContext, PropsWithChildren, useEffect, useState, useContext} from "react";



type AuthData = {
  session: Session | null
  loading: boolean
  profile: Tables<'profiles'> | null
  isAdmin: boolean
}

const AuthContext = createContext<AuthData>({
  session: null,
  loading: true,
  profile: null,
  isAdmin: false,

})


export default function AuthProvider({children} : PropsWithChildren) {

  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<Tables<'profiles'> | null>(null)
  const [loading, setLoading] = useState(true)                  // Because we're initially loading when the Provider is mounted, we have to wait for a response from the backend

  // Query an user's session
  useEffect(() => {
    // Fetch the user session from Supabase
    const fetchSession = async () => {
      const { data : {session} } = await supabase.auth.getSession()
      setSession(session)
      
      if (session) {
        // fetch profile data
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        setProfile(data || null);
      }  

      setLoading(false)
    }

    fetchSession()
    
    // Listen to session changes from Supabase, such as Signing out
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

  }, [])

  
  return <AuthContext.Provider value={{
    session,
    loading,
    profile,
    isAdmin: profile?.group === 'ADMIN'
  }}>{children}</AuthContext.Provider>

}

export const useAuth = () => useContext(AuthContext)