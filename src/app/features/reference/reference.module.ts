import { NgModule } from '@angular/core';
import { provideRouter } from '@angular/router';

import { referenceRoutes } from './reference.routes';
import { AllReferenceHttp } from './infraestructure/http/Reference.http';
import { ReferenceFacade } from './aplication/facade/reference.facade';


@NgModule({
  providers: [
    provideRouter(referenceRoutes),
    {
      provide: ReferenceFacade,
      useClass: AllReferenceHttp
    }
  ]
})
export class ReferenceModule { }
