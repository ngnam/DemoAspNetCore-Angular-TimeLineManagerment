import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Sticker } from 'src/app/domain/api-models/list-sticker-response';
import { NgbModalOptions, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ngbModalOptionsConfig } from 'src/app/core/configs/ngb-modal-options.config';

@Component({
  selector: 'app-timeline-sticker',
  templateUrl: './timeline-sticker.component.html',
  styleUrls: ['./timeline-sticker.component.scss']
})
export class TimelineStickerComponent implements OnInit {

  @Input() sticker: Sticker;
  @Output() SelectItem: EventEmitter<Sticker> = new EventEmitter();

  private optionsModal: NgbModalOptions = ngbModalOptionsConfig;
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  // + openPopUp()
  // + getList()
  // + renderItem(item: Coupon)
  // + removeItem(item: Coupon)
  addItem(sticker: Sticker) {
    this.SelectItem.emit(sticker);
  }

  removeItem(sticker: Sticker) {
    if (this.sticker.id === sticker.id) {
      this.sticker = null;
      this.addItem(this.sticker);
    }
  }

  async openPopUp() {
    const options = this.optionsModal;
    options.size = 'lg';
    const { TimelineStickerPopupComponent } = await import('../timeline-sticker-popup/timeline-sticker-popup.component');
    const modalRef = this.modalService.open(
      TimelineStickerPopupComponent,
      options
    );
    modalRef.result.then(
      (result: Sticker) => {
        if (result) {
          this.sticker = result;
          this.SelectItem.emit(this.sticker);
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
