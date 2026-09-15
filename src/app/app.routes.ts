import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Labs } from './labs/labs';
import { Taskflow } from './taskflow/taskflow';

export const routes: Routes = [
  {
    path: '',
    component: Taskflow
  },
  {
    path: 'labs',
    component: Labs
  },
  {
    path: 'inicio',
    component: Home
  },
  {
    path: 'labs',
    component: Labs
  }
];
