import {Routes} from '@angular/router';

export const benefitsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./benefits.component').then(m => m.BenefitsComponent),
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadComponent: () => import('./views/home/home.view').then(m => m.HomeView)
      },
      {
        path: 'prices',
        loadComponent: () => import('./views/prices/prices.view').then(m => m.PricesView)
      },
      {
        path: 'contact-us',
        loadComponent: () => import('./views/contact-us/contact-us.view').then(m => m.ContactUsView)
      }
    ]
  }
];

