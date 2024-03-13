import { Routes } from "@angular/router";


export const referenceRoutes: Routes = [
  {
    path: '',
    loadComponent: ()=> import('./reference.component').then(c => c.ReferenceComponent)
  }
]
