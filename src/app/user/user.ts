import { Component, input } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterLink,RouterOutlet],
  template: `
  <div class="user-layout">
      <aside>
        <h2>User: {{ id() }}</h2>
        <nav>
          <a [routerLink]="['/user', id(), 'profile']">View Profile</a>
          <a [routerLink]="['/user', id(), 'settings']">Settings</a>
        </nav>
      </aside>

      <main>
        <router-outlet /> 
      </main>
    </div>
    
  `,
  styleUrl: './user.scss',
})
export class UserComponent {

  id = input<string>();


}
