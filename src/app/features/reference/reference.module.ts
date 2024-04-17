import { NgModule } from '@angular/core';
import { provideRouter } from '@angular/router';

import { AuthorFacade } from './aplication/facade/author.facade';
import { ReferenceFacade } from './aplication/facade/reference.facade';
import { TagFacade } from './aplication/facade/tag.facade';
import { AuthorsHttp } from './infraestructure/http/author.http';
import { ReferenceHttp } from './infraestructure/http/reference.http';
import { TagHttp } from './infraestructure/http/tag.http';
import { referenceRoutes } from './reference.routes';


@NgModule({
  providers: [
    provideRouter(referenceRoutes),
    {
      provide: ReferenceFacade,
      useClass: ReferenceHttp
    },
    {
      provide: TagFacade,
      useClass: TagHttp
    },
    {
      provide: AuthorFacade,
      useClass: AuthorsHttp
    }
  ]
})
export class ReferenceModule { }
