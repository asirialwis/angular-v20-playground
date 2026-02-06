import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SupabaseService } from '../../core/services/supabase.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <ng-container *ngIf="isLoggedIn">
        <div class="welcome-card">
          <h1>Welcome, {{ username }}! 👋</h1>
          <p>Email: {{ userEmail }}</p>
          <button (click)="signOut()" class="btn btn-logout">Logout</button>
        </div>
      </ng-container>

      <ng-container *ngIf="!isLoggedIn">
        <div class="auth-card">
          <h2>Please Sign In or Sign Up</h2>
          <button (click)="goToSignIn()" class="btn btn-primary">Sign In</button>
          <button (click)="goToSignUp()" class="btn btn-secondary">Sign Up</button>
        </div>
      </ng-container>
    </div>
  `,
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  isLoggedIn = false;
  username = '';
  userEmail = '';

  constructor(
    private supabase: SupabaseService,
    private router: Router
  ) {}

  async ngOnInit() {
    const { data } = await this.supabase.getSession();

    if (data?.session?.user) {
      this.isLoggedIn = true;
      this.username = data.session.user.user_metadata?.['username'] || 'User';
      this.userEmail = data.session.user.email || '';
    } else {
      this.isLoggedIn = false;
    }
  }

  goToSignIn() {
    this.router.navigate(['/signin']);
  }

  goToSignUp() {
    this.router.navigate(['/signup']);
  }

  async signOut() {
    await this.supabase.signOut();
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }
}