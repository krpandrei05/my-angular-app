import { Routes } from '@angular/router';
import { Homepage } from './homepage/homepage';
import { MyTasks } from './my-tasks/my-tasks';
import { Search } from './search/search';
import { Login } from './login/login';
import { loggedInGuard } from './services/logged-in-guard';

export const routes: Routes = [
  { path: 'homepage', component: Homepage, canActivate: [loggedInGuard] },
  { path: 'my-tasks', component: MyTasks, canActivate: [loggedInGuard] },
  { path: 'search', component: Search, canActivate: [loggedInGuard] },
  { path: 'login', component: Login },
];
