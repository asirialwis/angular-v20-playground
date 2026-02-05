import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../service/supabase';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, CommonModule],
  template: `
    <div class="signup-container">
      <div class="signup-card">
        <h2>Create Account</h2>
        
        <form (ngSubmit)="signup()">
          <div class="form-group">
            <label for="email">Email <span class="required">*</span></label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              [(ngModel)]="email"
              name="email"
              required
            />
          </div>

          <div class="form-group">
            <label for="password">Password <span class="required">*</span></label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              [(ngModel)]="password"
              name="password"
              required
            />
          </div>

          <div class="form-group">
            <label for="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username (optional)"
              [(ngModel)]="username"
              name="username"
            />
          </div>

          <div class="form-group">
            <label for="mobile">Mobile Number</label>
            <input
              id="mobile"
              type="tel"
              placeholder="Enter your mobile number (optional)"
              [(ngModel)]="mobile"
              name="mobile"
            />
          </div>

          <button type="submit" [disabled]="!email || !password || isLoading">
            {{ isLoading ? 'Signing up...' : 'Sign Up' }}
          </button>
        </form>

        <p class="message" [ngClass]="{ error: isError, success: !isError }" *ngIf="message">
          {{ message }}
        </p>

        <p class="signin-link">
          Already have an account? <a href="/signin">Sign In</a>
        </p>
      </div>
    </div>
  `,
  styleUrl: './signup.scss',
})
export class Signup {
  email = ''
  password = ''
  username = ''
  mobile = ''
  message = ''
  isError = false
  isLoading = false

  constructor(private supabase: SupabaseService) {}

  async signup() {
    if (!this.email || !this.password) {
      this.message = 'Email and password are required'
      this.isError = true
      return
    }

    this.isLoading = true

    try {
      // Prepare user metadata
      const userData: { username?: string; mobile?: string } = {}
      if (this.username) userData['username'] = this.username
      if (this.mobile) userData['mobile'] = this.mobile

      // Sign up user
      const { data, error } = await this.supabase.signUp(
        this.email.trim().toLowerCase(),
        this.password,
        userData
      )

      if (error) {
        this.message = error.message
        this.isError = true
        return
      }

      // Create profile record if user was created
      if (data.user?.id) {
        const profileData = {
          email: this.email,
          username: this.username || null,
          mobile: this.mobile || null,
          created_at: new Date().toISOString()
        }

        const { error: profileError } = await this.supabase.createProfile(
          data.user.id,
          profileData
        )

        if (profileError) {
          this.message = 'Account created but profile save failed. Please update your profile.'
          this.isError = true
          return
        }
      }

      this.message = 'Signup successful! Check your email to confirm your account 📩'
      this.isError = false
      this.resetForm()
    } catch (err: any) {
      this.message = err.message || 'An error occurred during signup'
      this.isError = true
    } finally {
      this.isLoading = false
    }
  }

  private resetForm() {
    this.email = ''
    this.password = ''
    this.username = ''
    this.mobile = ''
  }
}
