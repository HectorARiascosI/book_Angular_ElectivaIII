import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Labs } from './labs/labs';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'inicio',
    component: Home,
  },
  {
    path: 'labs',
    component: Labs,
  },
];

