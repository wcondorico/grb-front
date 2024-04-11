import { Observable } from "rxjs";
import { Reference } from "../../core/interfaces/references/reference-response";
import { ReferenceBody } from "../../core/interfaces/references/reference-body";

export abstract class ReferenceRepository {
  abstract getAllReference(): Observable<Reference[]>;
  abstract addReference(value: ReferenceBody): Observable<ReferenceBody>;
}
