import { Injectable, inject } from '@angular/core';
import { AllAuthorRepository } from '../../domain/repository/author.repository';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Authors } from '../../core/interfaces/authors/authors';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class AuthorsHttp extends AllAuthorRepository{
  private readonly http: HttpClient = inject(HttpClient);
  url = `${environment.api}/authors`;
  
  getAllAuthors(): Observable<Authors[]> {
    return this.http.get<Authors[]>(this.url);
  }
  
  addAuthor(body: Authors): Observable<Authors>{
    return this.http.post<Authors>(this.url, body);
  }

  deleteAuthor(id: number): Observable<Authors> {
    return this.http.delete<Authors>(`${this.url}/${id}`);
  }
  updateAuthor(id: number, body: Authors): Observable<Authors> {
    return this.http.put<Authors>(`${this.url}/${id}`,body);
  }
}