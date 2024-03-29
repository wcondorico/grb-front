import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ReferenceInterface } from '../interfaces/all-reference';

@Injectable({
  providedIn: 'root'
})
export class MocServiceService {
  private readonly http: HttpClient = inject(HttpClient)
  apiUrl: string = 'http://localhost:3000'

  getJsonData(): Observable<ReferenceInterface[]> {
    const url = `${this.apiUrl}/references`

    return this.http.get<ReferenceInterface[]>(url);
  }

}
