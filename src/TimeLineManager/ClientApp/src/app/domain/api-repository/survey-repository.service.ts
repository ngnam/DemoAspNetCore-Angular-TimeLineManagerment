import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpApiService } from 'src/app/core/services/http-api.service';
import { SurveyRepository } from './survey-repository';
import { ListSurveyResponse } from '../api-models/list-survey-response';
import { HttpParams } from '@angular/common/http';

const router = {
  getAll: 'api/Survey'
};

@Injectable({ providedIn: 'root' })
export class SurveyRepositoryService extends SurveyRepository<ListSurveyResponse> {

  getAll(pageIndex?: number, pageSize?: number): Observable<ListSurveyResponse> {
    const params: HttpParams = new HttpParams();
    params.append('pageIndex', `${pageIndex}`);
    params.append('pageSize', `${pageSize}`);
    return this.httpClient.get(router.getAll, params);
  }

  constructor(private readonly httpClient: HttpApiService) {
    super();
  }
}
