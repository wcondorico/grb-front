import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../../environments/environment';
import { Tag } from '../../core/interfaces/tags/tags';
import { AllTagRepository } from '../../domain/repository/tag.repository';

@Injectable()
export class TagHttp extends AllTagRepository {
  private readonly http: HttpClient = inject(HttpClient);
  url = `${environment.api}/tags`;
  
  getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.url);
  }

  addTag(body: Tag): Observable<Tag> {
    return this.http.post<Tag>(this.url,body);
  }

  deleteTag(id: number): Observable<Tag> {
    return this.http.delete<Tag>(`${this.url}/${id}`);
  }

  updateTag(id:number, body: Tag): Observable<Tag> {
    return this.http.put<Tag>(`${this.url}/${id}`, body);
  }
}
