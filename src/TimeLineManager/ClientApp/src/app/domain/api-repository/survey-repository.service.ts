import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpApiService } from 'src/app/core/services/http-api.service';
import { SurveyRepository } from './survey-repository';
import { ListSurveyResponse } from '../api-models/list-survey-response';

const router = {
  getAll: 'survey/getAll'
};

@Injectable({ providedIn: 'root' })
export class SurveyRepositoryService extends SurveyRepository<ListSurveyResponse> {

  getAll(): Observable<ListSurveyResponse> {
    return this.httpClient.get(router.getAll);
  }

  constructor(private readonly httpClient: HttpApiService) {
    super();
  }
}
