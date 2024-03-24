import { Routes } from "@angular/router";


export const referenceRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./reference.component').then(c => c.ReferenceComponent),
    children: [
      {
        path: '',
        redirectTo: 'all-references',
        pathMatch: 'full'
      },
      {
        path: 'all-references',
        loadComponent: ()=> import('./views/all-reference/all-reference.view').then(c => c.HomeView)
      },
      {
        path: 'tags',
        loadComponent: () => import('./views/Tags/tags.component').then(c => c.TagsComponent)
      },
      {
        path: 'authors',
        loadComponent: () => import('./views/Authors/authors.component').then(c => c.AuthorsComponent)
      }
    ]
  },
]
