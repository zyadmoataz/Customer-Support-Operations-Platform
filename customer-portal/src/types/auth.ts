import type { Session, User } from '@supabase/supabase-js'

export interface UserProfile {
  full_name: string
  role: string
}

export interface AuthContextType {
  session: Session | null
  user: User | null
  role: string | null
  profile: UserProfile | null
  loading: boolean
  signOut: () => Promise<void>
}
