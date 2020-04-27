import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Coupon } from 'src/app/domain/api-models/list-coupon-response';
import { NgbModalOptions, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ngbModalOptionsConfig } from 'src/app/core/configs/ngb-modal-options.config';

@Component({
  selector: 'app-timeline-coupon',
  templateUrl: './timeline-coupon.component.html',
  styleUrls: ['./timeline-coupon.component.scss']
})
export class TimelineCouponComponent implements OnInit {

  @Input() coupon: Coupon;
  @Output() SelectItem: EventEmitter<Coupon> = new EventEmitter();

  private optionsModal: NgbModalOptions = ngbModalOptionsConfig;
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  // + openPopUp()
  // + getList()
  // + renderItem(item: Coupon)
  // + removeItem(item: Coupon)
  addItem(coupon: Coupon) {
    this.SelectItem.emit(coupon);
  }

  removeItem(coupon: Coupon) {
    if (this.coupon.id === coupon.id) {
      this.coupon = null;
      this.addItem(this.coupon);
    }
  }

  async openPopUp() {
    const options = this.optionsModal;
    options.size = 'lg';
    const { TimelineCouponPopupComponent } = await import('../timeline-coupon-popup/timeline-coupon-popup.component');
    const modalRef = this.modalService.open(
      TimelineCouponPopupComponent,
      options
    );
    modalRef.result.then(
      (result: Coupon) => {
        if (result) {
          this.coupon = result;
          this.SelectItem.emit(this.coupon);
        }
      },
      (reason) => console.log('Dismissed: ', this.getDismissReason(reason)));
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
