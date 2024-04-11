import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReferenceRepository } from '../../domain/repository/reference.repository';
import { Observable } from 'rxjs';
import { Reference } from '../../core/interfaces/references/reference-response';
import { ReferenceBody } from '../../core/interfaces/references/reference-body';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class AllReferenceHttp extends ReferenceRepository {
  private readonly http: HttpClient = inject(HttpClient);
  

  getAllReference(): Observable<Reference[]> {
    const url = `${environment.api}/references`;
    return this.http.get<Reference[]>(url);
  }

  addReference(value: ReferenceBody): Observable<ReferenceBody> {
    const url = `${environment.api}/references`;
    return this.http.post<ReferenceBody>(url, value);
  }
}
