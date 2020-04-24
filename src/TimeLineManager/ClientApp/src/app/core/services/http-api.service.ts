import { Injectable, Inject } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HttpParams
} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class HttpApiService {
  private httpHeaders = new HttpHeaders();
  private httpOptions = {};
  constructor(
    @Inject('BASE_URL')
    private baseUrl: string,
    private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache'
      })
    };
    this.httpHeaders = new HttpHeaders(this.httpOptions);
  }
  get(uri: string, params?: HttpParams) {
    uri = this.baseUrl + uri;
    return this.httpClient
      .get(uri, { headers: this.httpHeaders, params })
      .pipe(map(this.extractData));
  }
  // api post method
  post(uri: string, data?: any, params?: HttpParams) {
    uri = this.baseUrl + uri;
    return this.httpClient
      .post(uri, data, {
        headers: this.httpHeaders,
        params
      })
      .pipe(map(this.extractData));
  }
  // api put method
  put(uri: string, data?: any, params?: HttpParams) {
    uri = this.baseUrl + uri;
    return this.httpClient
      .put(uri, data, {
        headers: this.httpHeaders,
        params
      })
      .pipe(map(this.extractData));
  }
  // api delete method
  delete(uri: string, params?: HttpParams) {
    uri = this.baseUrl + uri;
    return this.httpClient
      .delete(`${uri}`, {
        headers: this.httpHeaders,
        params
      })
      .pipe(map(this.extractData));
  }

  private extractData(res: HttpResponse<object>) {
    const body: any = res;
    return body || {};
  }
}
