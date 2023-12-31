import { NgModule } from '@angular/core';
import { provideRouter } from "@angular/router";
import { authRoutes } from "./auth.routes";
import { SignInFacade } from "./application/facade/sign-in.facade";
import { SignInHttp } from "./infrastructure/http/sign-in.http";

@NgModule({
  providers: [
    provideRouter(authRoutes),
    {
      provide: SignInFacade,
      useClass: SignInHttp
    }
  ]
})
export class AuthModule { }
