import { Observable } from 'rxjs';

export abstract class StickerRepository<T> {
  abstract getAll(): Observable<T>;
}
