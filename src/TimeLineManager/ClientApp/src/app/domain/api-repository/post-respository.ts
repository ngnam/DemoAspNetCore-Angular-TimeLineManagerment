import { Observable } from 'rxjs';
import { PostListResponse, PostResponse } from '../api-models/post-response';

export abstract class PostRepository<T> {
  abstract getAll(pageIndex?: number, pageSize?: number): Observable<PostListResponse>;
  abstract getById(id: number): Observable<PostResponse>;
  abstract create(param: T): Observable<PostResponse>;
  abstract update(id: number, param: T): Observable<PostResponse>;
  abstract delete(id: number): Observable<PostResponse>;
}
