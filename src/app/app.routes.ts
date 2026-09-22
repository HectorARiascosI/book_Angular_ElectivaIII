import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: 'todo',
		loadComponent: () => import('./todo-list/todo-list').then((component) => component.TodoList),
	},
	{
		path: 'labs',
		loadComponent: () => import('./labs/labs').then((component) => component.Labs),
	},
	{ path: '', redirectTo: 'todo', pathMatch: 'full' },
	{ path: '**', redirectTo: 'todo' },
];
