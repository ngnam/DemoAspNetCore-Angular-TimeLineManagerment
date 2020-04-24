import { Observable } from 'rxjs';
import { ListCouponResponse } from '../api-models/list-coupon-response';
import { Injectable } from '@angular/core';
import { CouponRepository } from './coupon-repository';
import { HttpApiService } from 'src/app/core/services/http-api.service';

const router = {
  getAll: 'coupon/getAll'
};

@Injectable({
  providedIn: 'root',
})
export class CouponRepositoryService extends CouponRepository<ListCouponResponse> {

  getAll(): Observable<ListCouponResponse> {
    return this.httpClient.get(router.getAll);
  }

  constructor(private httpClient: HttpApiService) {
    super();
  }
}
