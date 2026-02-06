import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseService } from '../../../core/services/supabase.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SignInComponent {
  constructor(
    private supabase: SupabaseService,
    private router: Router
  ) {}

  email = '';
  password = '';
  message = '';

  async ngOnInit() {
    const { data } = await this.supabase.getSession();
    console.log('Session:', data.session);
  }

  async signIn() {
    const { error } = await this.supabase.signIn(this.email, this.password);
    this.message = error ? error.message : 'Signin successful 🎉';
  }

  signUp() {
    this.router.navigate(['/signup']);
  }
}