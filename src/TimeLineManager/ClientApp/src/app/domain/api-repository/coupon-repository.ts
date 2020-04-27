import { Observable } from 'rxjs';

export abstract class CouponRepository<T> {
  abstract getAll(pageIndex?: number, pageSize?: number): Observable<T>;
}
