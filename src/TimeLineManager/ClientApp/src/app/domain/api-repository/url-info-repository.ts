import { Observable } from 'rxjs';

export abstract class UrlInfoRepository<T> {
  abstract getInfoLink(url: string): Observable<T>;
}
