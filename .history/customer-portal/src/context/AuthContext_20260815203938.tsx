import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { supabase } from '../services/supabase'

export interface UserProfile {
  full_name: string
  role: string
}

interface AuthContextType {
  session: Session | null
  user: User | null
  role: string | null
  profile: UserProfile | null
  loading: boolean
  signOut: () => Promise<void>
}

// 1. Create the Context with default empty values
const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  role: null,
  profile: null,
  loading: true,
  signOut: async () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  // Helper: Fetch user's name and role from the 'profiles' database table
  const loadProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('full_name, role')
        .eq('id', userId)
        .single()

      if (!error && data) {
        setProfile(data as UserProfile)
      }
    } catch {
      // If profile fetch fails, leave profile as null
      setProfile(null)
    }
  }

  useEffect(() => {
    // Step A: Check for existing login session on initial page load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        loadProfile(session.user.id).finally(() => setLoading(false))
      } else {
        setLoading(false)
      }
    })

    // Step B: Listen to real-time auth state changes (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        await loadProfile(session.user.id)
      } else {
        setProfile(null)
      }
      setLoading(false)
    })

    // Cleanup subscription listener on component unmount
    return () => subscription.unsubscribe()
  }, [])

  // Step C: Simple signOut function
  const signOut = async () => {
    await supabase.auth.signOut()
    setSession(null)
    setUser(null)
    setProfile(null)
  }

  return (
    <AuthContext.Provider value={{ session, user, role: profile?.role ?? null, profile, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook for easy consumption anywhere in React components: const { user, role, signOut } = useAuth()
export const useAuth = () => useContext(AuthContext)
