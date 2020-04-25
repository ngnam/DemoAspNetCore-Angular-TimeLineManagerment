import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ListStickerResponse } from '../api-models/list-sticker-response';
import { StickerRepository } from './sticker-repository';
import { HttpApiService } from 'src/app/core/services/http-api.service';
const router = {
  getAll: 'sticker/getAll'
};
@Injectable({providedIn: 'root'})
export  class StickerRepositoryService extends StickerRepository<ListStickerResponse> {
  getAll(): Observable<ListStickerResponse> {
    return this.httpClient.get(router.getAll);
  }

  constructor(private httpClient: HttpApiService) {
    super();
  }
}
