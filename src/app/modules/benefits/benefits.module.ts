import { NgModule } from '@angular/core';

import { benefitsRoutes } from './benefits.routes';
import { provideRouter } from "@angular/router";


@NgModule({
  providers: [
    provideRouter(benefitsRoutes)
  ]
})
export class BenefitsModule { }
