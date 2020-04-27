import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ListStickerResponse } from '../api-models/list-sticker-response';
import { StickerRepository } from './sticker-repository';
import { HttpApiService } from 'src/app/core/services/http-api.service';
import { HttpParams } from '@angular/common/http';
const router = {
  getAll: 'api/Sticker'
};
@Injectable({providedIn: 'root'})
export  class StickerRepositoryService extends StickerRepository<ListStickerResponse> {
  getAll(pageIndex?: number, pageSize?: number): Observable<ListStickerResponse> {
    const params: HttpParams = new HttpParams();
    params.append('pageIndex', `${pageIndex}`);
    params.append('pageSize', `${pageSize}`);
    return this.httpClient.get(router.getAll, params);
  }

  constructor(private httpClient: HttpApiService) {
    super();
  }
}
