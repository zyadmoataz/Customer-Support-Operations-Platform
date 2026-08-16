import { supabase } from '@/api/supabase'
import type { UserProfile } from '@/types'

export const authApi = {
  // 1. Get current session
  async getSession() {
    const { data, error } = await supabase.auth.getSession()
    if (error) throw error
    return data.session
  },

  // 2. Sign in with email and password
  async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: password.trim(),
    })
    if (error) throw error
    return data
  },

  // 3. Register a new customer account
  async signup(email: string, password: string, fullName?: string) {
    const trimmedEmail = email.trim().toLowerCase()
    const trimmedPassword = password.trim()

    // Step 1: Create customer securely via PostgreSQL RPC (instant, unconstrained by SMTP limits)
    const { error } = await supabase.rpc('register_customer', {
      customer_email: trimmedEmail,
      customer_password: trimmedPassword,
      customer_name: fullName?.trim() || null,
    })
    if (error) throw error

    // Step 2: Auto-authenticate user into session
    const loginResult = await supabase.auth.signInWithPassword({
      email: trimmedEmail,
      password: trimmedPassword,
    })
    if (loginResult.error) throw loginResult.error

    return loginResult.data
  },

  // 4. Sign out
  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  // 5. Fetch user profile from database
  async getProfile(userId: string): Promise<UserProfile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('full_name, role')
      .eq('id', userId)
      .single()

    if (error) return null
    return data as UserProfile
  },

  // 6. Update user's display name
  async updateProfile(userId: string, fullName: string) {
    const { error } = await supabase
      .from('profiles')
      .update({ full_name: fullName.trim() })
      .eq('id', userId)

    if (error) throw error
  },

  // 7. Change account password
  async updatePassword(password: string) {
    const { error } = await supabase.auth.updateUser({ password })
    if (error) throw error
  },
}
