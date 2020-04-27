import { Component, OnInit, OnDestroy } from '@angular/core';
import { Coupon } from 'src/app/domain/api-models/list-coupon-response';
import { Subject } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'src/app/shared/components/toast-container/toast-service';
import { CouponRepositoryService } from 'src/app/domain/api-repository/coupon-repository.service';
import { takeUntil } from 'rxjs/operators';
import { OptionsToast } from 'src/app/core/configs/toast.config';

enum Status {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

@Component({
  selector: 'app-timeline-coupon-popup',
  templateUrl: './timeline-coupon-popup.component.html',
  styleUrls: ['./timeline-coupon-popup.component.scss']
})
export class TimelineCouponPopupComponent implements OnInit, OnDestroy {

  statusCoupon = Status;
  items: Coupon[];
  title = 'Coupon';
  private unsubcribe$ = new Subject<void>();

  constructor(
    public activeModal: NgbActiveModal,
    private toastService: ToastService,
    private surveyRepositoryService: CouponRepositoryService
  ) {}

  ngOnInit(): void {
    this.loadCoupon();
  }

  loadCoupon() {
    this.surveyRepositoryService
      .getAll()
      .pipe(takeUntil(this.unsubcribe$))
      .subscribe((data) => {
        if (data.resultCode === 1 && data.resultData) {
          if (data.resultData.list && data.resultData.list.length > 0) {
            this.items = data.resultData.list;
          } else {
            this.items = [];
          }
        }
        if (data.errorDisplay && data.errorMessage) {
          // notification error
          console.log(data.errorMessage);
          this.toastService.show(data.errorMessage, OptionsToast.danger);
        }
      });
  }

  selectItem(item: Coupon) {
    this.activeModal.close(item);
  }

  ngOnDestroy() {
    this.unsubcribe$.next();
    this.unsubcribe$.complete();
  }

}
