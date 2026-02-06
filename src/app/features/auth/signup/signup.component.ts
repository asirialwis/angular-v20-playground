import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SupabaseService } from '../../../core/services/supabase.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignUpComponent {
  email = '';
  password = '';
  username = '';
  mobile = '';
  message = '';
  isError = false;
  isLoading = false;

  constructor(
    private supabase: SupabaseService,
    private router: Router
  ) {}

  async signInWithGoogle() {
    this.isLoading = true;
    try {
      const { error } = await this.supabase.signInWithGoogle();
      if (error) {
        this.message = error.message;
        this.isError = true;
      }
    } catch (err: any) {
      this.message = err.message || 'Failed to sign in with Google';
      this.isError = true;
    } finally {
      this.isLoading = false;
    }
  }

  async signup() {
    if (!this.email || !this.password) {
      this.message = 'Email and password are required';
      this.isError = true;
      return;
    }

    this.isLoading = true;

    try {
      const userData: { username?: string; mobile?: string } = {};
      if (this.username) userData['username'] = this.username;
      if (this.mobile) userData['mobile'] = this.mobile;

      const { data, error } = await this.supabase.signUp(
        this.email.trim().toLowerCase(),
        this.password,
        userData
      );

      if (error) {
        this.message = error.message;
        this.isError = true;
        return;
      }

      if (data.user?.id) {
        const profileData = {
          email: this.email,
          username: this.username || null,
          mobile: this.mobile || null,
          created_at: new Date().toISOString()
        };

        const { error: profileError } = await this.supabase.createProfile(
          data.user.id,
          profileData
        );

        if (profileError) {
          this.message = 'Account created but profile save failed. Please update your profile.';
          this.isError = true;
          return;
        }
      }

      this.message = 'Signup successful! Check your email to confirm your account 📩';
      this.isError = false;
      this.resetForm();
    } catch (err: any) {
      this.message = err.message || 'An error occurred during signup';
      this.isError = true;
    } finally {
      this.isLoading = false;
    }
  }

  private resetForm() {
    this.email = '';
    this.password = '';
    this.username = '';
    this.mobile = '';
  }
}