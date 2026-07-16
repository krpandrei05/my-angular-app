import { Routes } from '@angular/router';
import { Homepage } from './homepage/homepage';
import { MyTasks } from './my-tasks/my-tasks';
import { Search } from './search/search';

export const routes: Routes = [
    {path: 'home', component: Homepage},
    {path: 'my-tasks', component: MyTasks},
    {path: 'search', component: Search}
];
