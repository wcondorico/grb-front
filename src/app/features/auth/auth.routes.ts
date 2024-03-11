import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full'
  },
  {
    path: 'sign-in',
    loadComponent: () => import('./views/sign-in/sign-in.view').then(c => c.SignInView)
  }
];
