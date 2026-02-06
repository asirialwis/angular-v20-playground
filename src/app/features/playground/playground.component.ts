import { Component, computed, effect, inject, signal } from '@angular/core';
import { IdentityStore } from '../../core/state/identity.store';

@Component({
  selector: 'app-playground',
  standalone: true,
  imports: [],
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
  `,
  styleUrl: './playground.component.scss'
})
export class PlaygroundComponent {
  count = signal(0);
  history = signal<number[]>([]);
  identity = inject(IdentityStore);

  doubleCount = computed(() => this.count() * 2);

  constructor() {
    effect(() => {
      console.log(`The current count is: ${this.count()}`);
    });
  }

  increment() {
    this.count.update(v => v + 1);
    this.history.update(h => [...h, this.count()]);
  }

  reset() {
    this.count.set(0);
  }
}