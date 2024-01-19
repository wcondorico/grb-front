import {Routes} from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    loadChildren: () => import('./modules/benefits/benefits.module').then(m => m.BenefitsModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  }
];
