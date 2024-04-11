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
        loadComponent: ()=> import('./views/all-reference/all-reference.view').then(c => c.AllReference)
      },
      {
        path: 'tags',
        loadComponent: () => import('./views/tags/tags.component').then(c => c.TagsComponent)
      },
      {
        path: 'authors',
        loadComponent: () => import('./views/authors/authors.component').then(c => c.AuthorsComponent)
      }
    ]
  },
]
