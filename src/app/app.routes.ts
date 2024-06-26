import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'reference',
    loadChildren: () => import('./features/reference/reference.module').then(m => m.ReferenceModule)
  },
  {
    path: 'benefits',
    loadChildren: () => import('./features/benefits/benefits.module').then(m => m.BenefitsModule)
  },
  {
    path: '',
    redirectTo: '/benefits',
    pathMatch: 'full'
  }
];
