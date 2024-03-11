import { inject, Injectable } from '@angular/core';
import { SignInRepository } from "../../domain/repository/sign-in.repository";

@Injectable()
export class SignInFacade {

  signIn = inject(SignInRepository);

  signInWithPassword(email: string, password: string) {
    return this.signIn.signInWithPassword(email, password);
  }

}
