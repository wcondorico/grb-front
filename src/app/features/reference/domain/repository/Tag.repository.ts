import { Observable } from "rxjs";
import { Tag } from "../../core/interfaces/tags/tags";

export abstract class AllTagRepository {
  abstract getAllTags(): Observable<Tag[]>;
  abstract addTag(body: Tag): Observable<Tag>;
  abstract deleteTag(id: number): Observable<Tag>;
  abstract updateTag(id: number, body: Tag): Observable<Tag>;
}