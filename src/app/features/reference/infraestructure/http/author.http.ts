import { Injectable, inject } from '@angular/core';
import { AllAuthorRepository } from '../../domain/repository/author.repository';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Authors } from '../../core/interfaces/authors/authors';

@Injectable()
export class AllAuthorsHttp extends AllAuthorRepository{
  private readonly http: HttpClient = inject(HttpClient);
  apiUrl: string = 'http://localhost:3000';
  
  getAllAuthors(): Observable<Authors[]> {
    const url = `${this.apiUrl}/authors`;
    return this.http.get<Authors[]>(url);
  }
  
}