import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { SignInComponent } from './features/auth/signin/signin.component';
import { SignUpComponent } from './features/auth/signup/signup.component';
import { PlaygroundComponent } from './features/playground/playground.component';
import { UserComponent } from './features/user/user.component';
import { ProfileComponent } from './features/user/profile/profile.component';
import { SettingsComponent } from './features/user/settings/settings.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'signin',
    component: SignInComponent
  },
  {
    path: 'signup',
    component: SignUpComponent
  },
  {
    path: 'playground',
    component: PlaygroundComponent
  },
  {
    path: 'user/:id',
    component: UserComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'profile' },
      { path: 'profile', component: ProfileComponent },
      { path: 'settings', component: SettingsComponent }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];