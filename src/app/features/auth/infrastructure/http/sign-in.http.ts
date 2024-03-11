import { SignInRepository } from "../../domain/repository/sign-in.repository";
import { Observable } from "rxjs";
import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class SignInHttp extends SignInRepository {

  private http = inject(HttpClient)

  signInWithPassword(email: string, password: string): Observable<any> {
    return this.http.post(
      ``,
      {
        email: email,
        password: password
      },
      {
        headers: {
          apiKey: ''
        }
      }
    );
  }
}
