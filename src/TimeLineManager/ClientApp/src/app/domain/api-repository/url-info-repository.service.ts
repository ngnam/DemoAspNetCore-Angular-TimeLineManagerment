import { Injectable } from '@angular/core';
import { HttpApiService } from 'src/app/core/services/http-api.service';
import { UrlInformationResponse } from '../api-models/url-information-response';
import { UrlInfoRepository } from './url-info-repository';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

const router = {
  getInfoLink: 'api/UrlInfo/GetInFoLink'
};

@Injectable({ providedIn: 'root' })

export class UrlInfoRepositoryService extends UrlInfoRepository<UrlInformationResponse> {
  getInfoLink(url: string): Observable<UrlInformationResponse> {
    return this.httpClient.get(`${router.getInfoLink}?url=${url}`);
  }

  constructor(private readonly httpClient: HttpApiService) {
    super();
  }
}
