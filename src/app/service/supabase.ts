import { Injectable } from '@angular/core'
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { environment } from '../../environments/environments'

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseAnonKey
    )
  }

  signUp(email: string, password: string, userData?: any) {
    return this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    })
  }

  async createProfile(userId: string, profileData: any) {
    return this.supabase
      .from('profiles')
      .insert([{
        id: userId,
        ...profileData
      }])
  }

  signIn(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({ email, password })
  }

  signOut() {
    return this.supabase.auth.signOut()
  }

  getSession() {
    return this.supabase.auth.getSession()
  }
}
