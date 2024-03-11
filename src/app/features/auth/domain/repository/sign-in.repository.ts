import { Observable } from "rxjs";

export abstract class SignInRepository {
  abstract signInWithPassword(email: string, password: string): Observable<any>;
}
