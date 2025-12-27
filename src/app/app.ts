import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IdentityStore } from './store/identity-store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <div class="user-chip">Welcome, {{ identity.accountName() }}</div>
    <div class="container">
      <h2>Count: {{ count() }}</h2>
      <p>Double: {{ doubleCount() }}</p>

      @if (count() > 10) {
        <p style="color: red;">Warning: High count!</p>
      }

      <button (click)="increment()">+1</button>
      <button (click)="reset()">Reset</button>

      <h3>History Log</h3>
      <ul>
        @for (item of history(); track $index) {
          <li>Value was: {{ item }}</li>
        } @empty {
          <li>No history yet.</li>
        }
      </ul>
    </div>

    <router-outlet />
  `,
  styleUrl: './app.scss'
})
export class App {
  count = signal(0);
  history = signal<number[]>([]);
  identity = inject(IdentityStore);

  // 2. Computed Signal (Updates automatically when count changes)
  doubleCount = computed(() => this.count() * 2);


  

  constructor() {
    // 3. Effect (Runs whenever signals inside it change - good for logging/API calls)
    effect(() => {
      console.log(`The current count is: ${this.count()}`);
      
    });
  }

  increment() {
    // 4. Updating a signal
    this.count.update(v => v + 1);
    this.history.update(h => [...h, this.count()]);
  }

  reset() {
    this.count.set(0); // 5. Directly setting a value
  }
}
