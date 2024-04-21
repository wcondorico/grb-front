import { Observable } from "rxjs";
import { Authors } from "../../core/interfaces/authors/authors";

export abstract class AllAuthorRepository {
  abstract getAllAuthors(): Observable<Authors[]>;
  abstract addAuthor(body: Authors): Observable<Authors>;
  abstract deleteAuthor(id: number): Observable<Authors>;
  abstract updateAuthor(id:number, body: Authors): Observable<Authors>;
}