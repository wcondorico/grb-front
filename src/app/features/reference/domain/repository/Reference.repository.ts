import { Observable } from "rxjs";
import { ReferenceResponse } from "../../core/interfaces/references/reference-response";
import { ReferenceCreateBody } from "../../core/interfaces/references/reference-create-body";
import { ReferenceUpdateBody } from "../../core/interfaces/references/reference-update-body";

export abstract class ReferenceRepository {
  abstract getAllReference(): Observable<ReferenceResponse[]>;
  abstract addReference(body: ReferenceCreateBody): Observable<ReferenceCreateBody>;
  abstract deleteReference(id: number): Observable<ReferenceResponse>;
  abstract updateReference(id:number, body: ReferenceUpdateBody): Observable<ReferenceResponse>
}
