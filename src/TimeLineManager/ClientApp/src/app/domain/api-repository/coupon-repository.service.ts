import { Observable } from 'rxjs';
import { ListCouponResponse } from '../api-models/list-coupon-response';
import { Injectable } from '@angular/core';
import { CouponRepository } from './coupon-repository';
import { HttpApiService } from 'src/app/core/services/http-api.service';
import { HttpParams } from '@angular/common/http';

const router = {
  getAll: 'api/Coupon'
};

@Injectable({
  providedIn: 'root',
})
export class CouponRepositoryService extends CouponRepository<ListCouponResponse> {

  getAll(pageIndex?: number, pageSize?: number): Observable<ListCouponResponse> {
    const params: HttpParams = new HttpParams();
    params.append('pageIndex', `${pageIndex}`);
    params.append('pageSize', `${pageSize}`);

    return this.httpClient.get(router.getAll, params);
  }

  constructor(private httpClient: HttpApiService) {
    super();
  }
}
