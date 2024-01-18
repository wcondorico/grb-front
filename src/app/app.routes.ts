import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./modules/benefits/views/benefits/benefits.view').then(m => m.BenefitsView)
  },
  {
    path: 'benefits',
    loadComponent: () => import('./modules/benefits/views/benefits/benefits.view').then(m => m.BenefitsView)
  },{
    path: 'contactus',
    loadComponent: () => import('./modules/contactus/views/contactus/contactus.view').then(m => m.ContactusView)
  },{
    path: 'prices',
    loadComponent: () => import('./modules/prices/views/prices/prices.view').then(m => m.PricesView)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  }
];
