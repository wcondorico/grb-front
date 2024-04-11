import { NgModule } from '@angular/core';
import { provideRouter } from '@angular/router';

import { referenceRoutes } from './reference.routes';
import { AllReferenceHttp } from './infraestructure/http/reference.http';
import { ReferenceFacade } from './aplication/facade/reference.facade';
import { TagFacade } from './aplication/facade/tag.facade';
import { AllTagHttp } from './infraestructure/http/tag.http';
import { AuthorFacade } from './aplication/facade/author.facade';
import { AllAuthorsHttp } from './infraestructure/http/author.http';


@NgModule({
  providers: [
    provideRouter(referenceRoutes),
    {
      provide: ReferenceFacade,
      useClass: AllReferenceHttp
    },
    {
      provide: TagFacade,
      useClass: AllTagHttp
    },
    {
      provide: AuthorFacade,
      useClass: AllAuthorsHttp
    }
  ]
})
export class ReferenceModule { }
