import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ReferenceRepository } from '../../domain/repository/reference.repository';
import { Observable, catchError, throwError } from 'rxjs';
import { ReferenceResponse } from '../../core/interfaces/references/reference-response';
import { ReferenceCreateBody } from '../../core/interfaces/references/reference-create-body';
import { environment } from '../../../../../environments/environment';
import { ReferenceUpdateBody } from '../../core/interfaces/references/reference-update-body';

@Injectable()
export class ReferenceHttp extends ReferenceRepository {
  private readonly http: HttpClient = inject(HttpClient);
  url = `${environment.api}/references`;

  getAllReference(): Observable<ReferenceResponse[]> {
    return this.http.get<ReferenceResponse[]>(this.url);
  }

  addReference(body: ReferenceCreateBody): Observable<ReferenceCreateBody> {
    return this.http.post<ReferenceCreateBody>(this.url, body).pipe(catchError((error: HttpErrorResponse) => {
      let messageError = `message: ${error.message}`;
      return throwError(() => messageError)
    }));
  }

  deleteReference(id: number): Observable<ReferenceResponse> {
    return this.http.delete<ReferenceResponse>(`${this.url}/${id}`)
  }

  updateReference(id:number, body: ReferenceUpdateBody): Observable<ReferenceResponse>{
    return this.http.put<ReferenceResponse>(`${this.url}/${id}`,body)
  }
}
