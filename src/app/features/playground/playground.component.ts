import { Component, computed, effect, inject, signal } from '@angular/core';
import { IdentityStore } from '../../core/state/identity.store';

@Component({
  selector: 'app-playground',
  standalone: true,
  imports: [],
  templateUrl: './playground.component.html',
  styleUrl: './playground.component.scss'
})
export class PlaygroundComponent {
  protected count = signal(0);
  protected history = signal<number[]>([]);
  protected identity = inject(IdentityStore);

  protected doubleCount = computed(() => this.count() * 2);

  constructor() {
    effect(() => {
      console.log(`The current count is: ${this.count()}`);
    });
  }

  protected increment() {
    this.count.update(v => v + 1);
    this.history.update(h => [...h, this.count()]);
  }

  protected reset() {
    this.count.set(0);
  }
}