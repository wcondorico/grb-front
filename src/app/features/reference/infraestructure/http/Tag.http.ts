import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Tags } from '../../core/interfaces/tags/tags';
import { AllTagRepository } from '../../domain/repository/tag.repository';

@Injectable()
export class AllTagHttp extends AllTagRepository {
  private readonly http: HttpClient = inject(HttpClient)
  apiUrl: string = 'http://localhost:3000'

  getAllTags(): Observable<Tags[]> {
    const url = `${this.apiUrl}/tags`
    return this.http.get<Tags[]>(url);
  }
  /**
   newReference(): Observable<any>{
     const url = `${this.apiUrl}/references`
     return this.http.post(url,);
    }
  */
}