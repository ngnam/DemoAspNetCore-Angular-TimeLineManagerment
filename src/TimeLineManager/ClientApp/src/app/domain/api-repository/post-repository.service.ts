import { Injectable, Inject } from '@angular/core';
import { HttpApiService } from '../../core/services/http-api.service';
import { Post, PostResponse } from '../api-models/post-response';
import { PostRepository } from './post-respository';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

const router = {
  getAll: 'post/getAll',
  getById: 'post/getById',
  create: 'post',
  update: 'post',
  delete: 'post'
};

@Injectable({
  providedIn: 'root',
})
export class PostRepositoryService extends PostRepository<Post> {

  getAll() {
    return this.httpClient.get(router.getAll);
  }

  getById(id: number | string): Observable<PostResponse> {
    const params: HttpParams = new HttpParams();
    params.append('id', id.toString());
    return this.httpClient.get(router.getById, params);
  }

  create(param: Post) {
    return this.httpClient.post(router.create, JSON.stringify(param));
  }
  update(id: number, param: Post) {
    return this.httpClient.put(`${router.update}/${id}`, JSON.stringify(param));
  }

  delete(id: number) {
    return this.httpClient.delete(`${router.update}/${id}`);
  }

  constructor(private httpClient: HttpApiService) {
    super();
  }
}
