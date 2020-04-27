import { Observable } from 'rxjs';

export abstract class SurveyRepository<T> {
  abstract getAll(pageIndex?: number, pageSize?: number): Observable<T>;
}
