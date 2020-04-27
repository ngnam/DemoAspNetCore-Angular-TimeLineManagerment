import { Observable } from 'rxjs';

export abstract class StickerRepository<T> {
  abstract getAll(pageIndex?: number, pageSize?: number): Observable<T>;
}
