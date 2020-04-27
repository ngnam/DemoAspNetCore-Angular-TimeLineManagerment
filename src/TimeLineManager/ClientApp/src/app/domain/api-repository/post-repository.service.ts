import { Injectable, Inject } from '@angular/core';
import { HttpApiService } from '../../core/services/http-api.service';
import { Post, PostResponse, PostListResponse, PostParseJSON } from '../api-models/post-response';
import { PostRepository } from './post-respository';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

const router = {
  getAll: 'api/Post',
  getById: 'api/Post',
  create: 'api/Post',
  update: 'api/Post',
  delete: 'api/Post'
};

@Injectable({
  providedIn: 'root',
})
export class PostRepositoryService extends PostRepository<PostParseJSON> {

  getAll(pageIndex?: number, pageSize?: number): Observable<PostListResponse> {
    const params: HttpParams = new HttpParams();
    params.append('pageIndex', `${pageIndex}`);
    params.append('pageSize', `${pageSize}`);
    return this.httpClient.get(router.getAll, params);
  }

  getById(id: number): Observable<PostResponse> {
    return this.httpClient.get(`${router.getById}/${id}`);
  }

  create(param: PostParseJSON): Observable<PostResponse> {
    return this.httpClient.post(router.create, param);
  }

  update(id: number, param: PostParseJSON): Observable<PostResponse> {
    return this.httpClient.put(`${router.update}/${id}`, param);
  }

  delete(id: number): Observable<PostResponse> {
    return this.httpClient.delete(`${router.delete}/${id}`);
  }

  constructor(private httpClient: HttpApiService) {
    super();
  }
}
