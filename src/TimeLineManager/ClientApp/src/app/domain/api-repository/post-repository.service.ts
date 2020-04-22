import { Injectable, Inject } from '@angular/core';
import { HttpApiService } from '../../core/services/http-api.service';

const router = {
  getAll: `WeatherForecast`
};

@Injectable({
  providedIn: 'root'
})
export class PostRepositoryService {
  constructor(
    private httpClient: HttpApiService) { }

  getTimeLine() {
    return this.httpClient.get(router.getAll);
  }
}
