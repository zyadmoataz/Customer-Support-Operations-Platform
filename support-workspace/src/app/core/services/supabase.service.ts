import { Injectable, signal, computed } from '@angular/core';
import {
  createClient,
  SupabaseClient,
  User,
  Session,
} from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

export interface Profile {
  id: string;
  full_name: string;
  role: 'customer' | 'agent' | 'manager';
}

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  private _currentUser = signal<User | null | undefined>(undefined);
  public currentUser = computed(() =>
    this._currentUser() === undefined ? null : this._currentUser(),
  );

  private _currentProfile = signal<Profile | null>(null);
  public currentProfile = this._currentProfile.asReadonly();

  // Computed signal to easily check if fully loaded
  public isReady = computed(() => {
    const userState = this._currentUser();
    if (userState === undefined) return false; // Still checking initial session
    if (userState === null) return true; // Finished checking, no user
    const profile = this.currentProfile();
    if (userState && profile) return true; // Finished checking, user and profile exist
    return false; // Not ready if user exists but profile is still loading
  });

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey,
    );

    this.supabase.auth.getSession().then(({ data: { session } }) => {
      this._currentUser.set(session?.user ?? null);
      if (session?.user) {
        this.fetchProfile(session.user.id);
      }
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

  private async fetchProfile(userId: string) {
    try {
      const { data, error } = await this.supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      this._currentProfile.set(data as Profile);
    } catch (err) {
      console.error('Error fetching profile:', err);
    }
  }

  get auth() {
    return this.supabase.auth;
  }

  get from() {
    return this.supabase.from.bind(this.supabase);
  }

  get client() {
    return this.supabase;
  }
}
