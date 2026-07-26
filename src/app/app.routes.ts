import { Routes } from '@angular/router';
import { MainLayout } from './main-layout/main-layout';
import { Homepage } from './homepage/homepage';
import { MyTasks } from './my-tasks/my-tasks';
import { Search } from './search/search';
import { Auth } from './auth/auth';
import { loggedInGuard } from './guards/logged-in-guard';
import { guestGuard } from './guards/guest-guard';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    canActivate: [loggedInGuard],
    children: [
      { path: 'homepage', component: Homepage },
      { path: 'my-tasks', component: MyTasks },
      { path: 'search', component: Search },
    ],
  },
  { path: 'auth', component: Auth, canActivate: [guestGuard] },
];
