import { Observable } from 'rxjs';

export abstract class CouponRepository<T> {
  abstract getAll(): Observable<T>;
}
