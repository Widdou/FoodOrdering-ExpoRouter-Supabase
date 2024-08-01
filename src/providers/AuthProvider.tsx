import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { createContext, PropsWithChildren, useEffect, useState, useContext} from "react";



type AuthData = {
  session: Session | null
  loading: boolean
}

const AuthContext = createContext<AuthData>({
  session: null,
  loading: true
})


export default function AuthProvider({children} : PropsWithChildren) {

  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)                  // Because we're initially loading when the Provider is mounted, we have to wait for a response from the backend

  // Query an user's session
  useEffect(() => {
    // Fetch the user session from Supabase
    const fetchSession = async () => {
      const {data, error} = await supabase.auth.getSession()
      setSession(data.session)
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
    loading
  }}>{children}</AuthContext.Provider>

}

export const useAuth = () => useContext(AuthContext)