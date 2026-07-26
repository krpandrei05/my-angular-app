import { Routes } from '@angular/router';
import { Homepage } from './homepage/homepage';
import { MyTasks } from './my-tasks/my-tasks';
import { Search } from './search/search';
import { Auth } from './auth/auth';
import { loggedInGuard } from './guards/logged-in-guard';
import { guestGuard } from './guards/guest-guard';

export const routes: Routes = [
  { path: 'homepage', component: Homepage, canActivate: [loggedInGuard] },
  { path: 'my-tasks', component: MyTasks, canActivate: [loggedInGuard] },
  { path: 'search', component: Search, canActivate: [loggedInGuard] },
  { path: 'auth', component: Auth, canActivate: [guestGuard] },
];
