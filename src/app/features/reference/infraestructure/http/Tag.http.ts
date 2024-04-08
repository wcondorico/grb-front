import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AllTagRepository } from '../../domain/repository/Tag.repository';
import { ReferenceTag } from '../../core/interfaces/ReferenceTag';

@Injectable()
export class AllTagHttp extends AllTagRepository {
  private readonly http: HttpClient = inject(HttpClient)
  apiUrl: string = 'http://localhost:3000'

  getAllTags(): Observable<ReferenceTag[]> {
    const url = `${this.apiUrl}/tag`
    return this.http.get<ReferenceTag[]>(url);
  }
  /**
   newReference(): Observable<any>{
     const url = `${this.apiUrl}/references`
     return this.http.post(url,);
    }
  */
}