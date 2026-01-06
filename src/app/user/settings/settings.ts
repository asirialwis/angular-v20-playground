import { Component, inject } from '@angular/core';
import { IdentityStore } from '../../store/identity-store';

@Component({
  selector: 'app-settings',
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
  styleUrl: './settings.scss',
})
export class SettingsComponent {
  identity = inject(IdentityStore);
}
