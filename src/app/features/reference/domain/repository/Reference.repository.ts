import { Observable } from "rxjs";

export abstract class AllReferenceRepository {
  abstract getAllReference(): Observable<any>;
}