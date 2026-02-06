import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserProfileStore } from '../../../core/state/user-profile.store';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  readonly store = inject(UserProfileStore);
}