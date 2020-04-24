import { Observable } from 'rxjs';

export abstract class UrlInfoRepository<T> {
  abstract getLink(url: string): Observable<T>;
}
