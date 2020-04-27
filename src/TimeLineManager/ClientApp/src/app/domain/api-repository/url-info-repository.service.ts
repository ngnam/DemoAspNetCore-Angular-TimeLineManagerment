import { Injectable } from '@angular/core';
import { HttpApiService } from 'src/app/core/services/http-api.service';
import { UrlInformationResponse } from '../api-models/url-information-response';
import { UrlInfoRepository } from './url-info-repository';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

const router = {
  getInfoLink: 'api/UrlInfo/getInfoLink'
};

@Injectable({ providedIn: 'root' })

export class UrlInfoRepositoryService extends UrlInfoRepository<UrlInformationResponse> {
  getInfoLink(url: string): Observable<UrlInformationResponse> {
    const params: HttpParams = new HttpParams();
    params.append('url', url);
    return this.httpClient.get(router.getInfoLink, params);
  }

  constructor(private readonly httpClient: HttpApiService) {
    super();
  }
}
