import { NgModule } from '@angular/core';
import { provideRouter } from '@angular/router';

import { referenceRoutes } from './reference.routes';


@NgModule({
  providers: [
    provideRouter(referenceRoutes)
  ]
})
export class ReferenceModule { }
