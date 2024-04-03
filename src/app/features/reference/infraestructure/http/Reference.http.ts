import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AllReferenceRepository } from '../../domain/repository/Reference.repository';
import { Observable } from 'rxjs';
import { ReferenceInterface } from '../../core/interfaces/all-reference';

@Injectable()
export class AllReferenceHttp extends AllReferenceRepository {
  private readonly http: HttpClient = inject(HttpClient)
  apiUrl: string = 'http://localhost:3000'


  getAllReference(): Observable<any> {
    const url = `${this.apiUrl}/references`
    return this.http.get<ReferenceInterface[]>(url);
  }
  
}