import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SupabaseService } from '../../core/services/supabase.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
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