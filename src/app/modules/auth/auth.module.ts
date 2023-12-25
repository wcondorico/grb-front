import { NgModule } from '@angular/core';
import { provideRouter } from "@angular/router";
import { authRoutes } from "./auth.routes";

@NgModule({
  providers: [provideRouter(authRoutes)]
})
export class AuthModule { }
