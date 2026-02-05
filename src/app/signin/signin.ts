import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../service/supabase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  imports: [FormsModule],
  template: `
    <div>
      <h2>Supabase Auth Demo</h2>

      <input
        type="email"
        placeholder="Email"
        [(ngModel)]="email"
      />

      <input
        type="password"
        placeholder="Password"
        [(ngModel)]="password"
      />

      <button (click)="signIn()">Login</button>
      <button (click)="signUp()">Signup</button>

      <p>{{ message }}</p>
    </div>
  `,
  styleUrl: './signin.scss',
})
export class Signin {
  

  constructor(private supabase: SupabaseService , private router: Router) {}

  email = ''
  password = ''
  message = ''

  async ngOnInit() {
  const { data } = await this.supabase.getSession()
  console.log('Session:', data.session)
}


  async signIn() {
    const { error } = await this.supabase.signIn(this.email, this.password)
    this.message = error ? error.message : 'Signin successful 🎉'
  }

   signUp() {
    this.router.navigate(['/signup']);
  }
}
