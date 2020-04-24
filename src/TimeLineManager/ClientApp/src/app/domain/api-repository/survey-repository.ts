import { Observable } from 'rxjs';

export abstract class SurveyRepository<T> {
  abstract getAll(): Observable<T>;
}
