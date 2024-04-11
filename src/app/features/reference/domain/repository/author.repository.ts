import { Observable } from "rxjs";

export abstract class AllAuthorRepository {
  abstract getAllAuthors(): Observable<any>;
}