import { Injectable, signal, computed } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

export interface Profile {
  id: string;
  full_name: string;
  role: 'customer' | 'agent' | 'manager';
}

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private supabase: SupabaseClient;

  private _currentUser = signal<User | null | undefined>(undefined);
  public currentUser = computed(() => this._currentUser() === undefined ? null : this._currentUser());

  private _currentProfile = signal<Profile | null>(null);
  public currentProfile = this._currentProfile.asReadonly();

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);

    this.supabase.auth.getSession().then(({ data: { session } }) => {
      this._currentUser.set(session?.user ?? null);
      if (session?.user) this.fetchProfile(session.user.id);
    });

    this.supabase.auth.onAuthStateChange((_event, session) => {
      this._currentUser.set(session?.user ?? null);
      if (session?.user) {
        this.fetchProfile(session.user.id);
      } else {
        this._currentProfile.set(null);
      }
    });
  }

  async ensureAuthInitialized(): Promise<{ user: User | null; profile: Profile | null }> {
    if (this._currentUser() !== undefined && this._currentProfile() !== null) {
      return { user: this._currentUser() ?? null, profile: this.currentProfile() };
    }
    const { data: { session } } = await this.supabase.auth.getSession();
    const user = session?.user ?? null;
    this._currentUser.set(user);
    if (user) {
      await this.fetchProfile(user.id);
    } else {
      this._currentProfile.set(null);
    }
    return { user, profile: this.currentProfile() };
  }

  async createAgentAccount(email: string, pass: string, name: string) {
    const { data, error } = await this.supabase.rpc('create_staff_agent', {
      agent_email: email.trim().toLowerCase(),
      agent_password: pass.trim(),
      agent_name: name.trim()
    });
    if (error) throw error;
    return data;
  }

  async updateStaffAgent(userId: string, email: string, name: string, pass?: string) {
    const { data, error } = await this.supabase.rpc('update_staff_agent', {
      target_user_id: userId,
      new_email: email.trim().toLowerCase(),
      new_name: name.trim(),
      new_password: pass ? pass.trim() : null
    });
    if (error) throw error;
    return data;
  }

  private async fetchProfile(userId: string) {
    try {
      const { data, error } = await this.supabase.from('profiles').select('*').eq('id', userId).single();
      if (error) throw error;
      this._currentProfile.set(data as Profile);
    } catch (err) {
      console.error('Error fetching profile:', err);
    }
  }

  get rpc() { return this.supabase.rpc.bind(this.supabase); }
  get auth() { return this.supabase.auth; }
  get from() { return this.supabase.from.bind(this.supabase); }
  get client() { return this.supabase; }
}
