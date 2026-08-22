import { supabase } from '@/api/supabase'
import type { UserProfile } from '@/types'

export const authApi = {
  async getSession() {
    const { data, error } = await supabase.auth.getSession()
    if (error) throw error
    return data.session
  },

  async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: password.trim(),
    })
    if (error) throw error
    return data
  },

  async signup(email: string, password: string, fullName?: string) {
    const trimmedEmail = email.trim().toLowerCase()
    const trimmedPassword = password.trim()

    const { error } = await supabase.rpc('register_customer', {
      customer_email: trimmedEmail,
      customer_password: trimmedPassword,
      customer_name: fullName?.trim() || null,
    })
    if (error) throw error

    const loginResult = await supabase.auth.signInWithPassword({
      email: trimmedEmail,
      password: trimmedPassword,
    })
    if (loginResult.error) throw loginResult.error

    return loginResult.data
  },

  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  async getProfile(): Promise<UserProfile | null> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    const { data, error } = await supabase
      .from('profiles')
      .select('full_name, role')
      .eq('id', user.id)
      .single()

    if (error) return null
    return data as UserProfile
  },

  async updateProfile(fullName: string) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    const { error } = await supabase
      .from('profiles')
      .update({ full_name: fullName.trim() })
      .eq('id', user.id)

    if (error) throw error
  },

  async updatePassword(password: string) {
    const { error } = await supabase.auth.updateUser({ password })
    if (error) throw error
  },
}
