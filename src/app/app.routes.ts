import { Routes } from '@angular/router';
import { UserComponent } from './user/user';
import { Signup } from './signup/signup';
import { PlaygroundComponent } from './playground/playground';

export const routes: Routes = [
  {
    path: 'playground',
    component: PlaygroundComponent,
  },
  {
    path: 'signup',
    component: Signup,
  },
  {
    path: 'user/:id',
    component: UserComponent,
    children: [
      { 
        path: 'profile', 
        loadComponent: () => import('./user/profile/profile').then(m => m.ProfileComponent) 
      },
      { 
        path: 'settings', 
        loadComponent: () => import('./user/settings/settings').then(m => m.SettingsComponent) 
      },
      { path: '', redirectTo: 'profile', pathMatch: 'full' }
    ],
  }
];