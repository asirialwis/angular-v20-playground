import { Component, inject } from '@angular/core';
import { IdentityStore } from '../../../core/state/identity.store';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [],
  template: `
    <div>
      <p>
        settings works! {{ identity.accountStatus() }}
      </p>
      @if(identity.accountStatus() != 'ACTIVE'){
        <p style="color:blue;">Your Account is In-active</p>
      }
    </div>
  `,
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  identity = inject(IdentityStore);
}