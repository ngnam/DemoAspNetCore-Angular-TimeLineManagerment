import { Observable } from 'rxjs';
import { PostListResponse } from '../api-models/post-response';

export abstract class PostRepository<T> {
  abstract getAll(): Observable<PostListResponse>;
  abstract getById(id: number);
  abstract create(param: T);
  abstract update(id: number, param: T);
  abstract delete(id: number);
}
