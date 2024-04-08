import { Observable } from "rxjs";

export abstract class AllTagRepository {
  abstract getAllTags(): Observable<any>;
}