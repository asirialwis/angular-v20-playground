import { Component, inject } from '@angular/core';
import { IdentityStore } from '../../store/identity-store';

@Component({
  selector: 'app-settings',
  imports: [],
  template: `
    <p>
      settings works! {{ identity.accountStatus() }}
    </p>
  `,
  styleUrl: './settings.scss',
})
export class SettingsComponent {
  identity = inject(IdentityStore);
}
