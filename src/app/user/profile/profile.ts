import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserProfileStore } from '../../store/user-profile.store';

@Component({
  selector: 'app-profile',
  imports: [FormsModule],
  template: `
    <div class="form-container">
      <h3>SME Profile Details</h3>
      <p><small>Data is saved automatically as you type (Survives Refresh)</small></p>

      <div class="field">
        <label>First Name</label>
        <input [ngModel]="store.firstName()" 
               (ngModelChange)="store.updateForm({firstName: $event})" />
      </div>

      <div class="field">
        <label>Last Name</label>
        <input [ngModel]="store.lastName()" 
               (ngModelChange)="store.updateForm({lastName: $event})" />
      </div>

      <div class="field">
        <label>Business Email</label>
        <input [ngModel]="store.email()" 
               (ngModelChange)="store.updateForm({email: $event})" />
      </div>

      <div class="field">
        <label>Tax ID</label>
        <input [ngModel]="store.businessTaxId()" 
               (ngModelChange)="store.updateForm({businessTaxId: $event})" />
      </div>

      <button (click)="store.resetForm()">Clear All</button>
    </div>
  `,
  styleUrl: './profile.scss',
})
export class ProfileComponent {
  readonly store = inject(UserProfileStore);
}
