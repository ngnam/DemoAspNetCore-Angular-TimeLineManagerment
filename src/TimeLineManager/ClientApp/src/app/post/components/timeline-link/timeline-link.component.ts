import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Link } from 'src/app/domain/api-models/url-information-response';
import { NgbModalOptions, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ngbModalOptionsConfig } from 'src/app/core/configs/ngb-modal-options.config';

@Component({
  selector: 'app-timeline-link',
  templateUrl: './timeline-link.component.html',
  styleUrls: ['./timeline-link.component.scss']
})
export class TimelineLinkComponent implements OnInit {

  @Input() link: Link;
  @Output() SelectItem: EventEmitter<Link> = new EventEmitter();

  private optionsModal: NgbModalOptions = ngbModalOptionsConfig;
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  // + openPopUp()
  // + getList()
  // + renderItem(item: Coupon)
  // + removeItem(item: Coupon)
  addItem(link: Link) {
    this.SelectItem.emit(link);
  }

  removeItem(link: Link) {
    if (this.link.id === link.id) {
      this.link = null;
      this.addItem(this.link);
    }
  }

  async openPopUp() {
    const options = this.optionsModal;
    const { TimelineLinkPopupComponent } = await import('../timeline-link-popup/timeline-link-popup.component');
    const modalRef = this.modalService.open(
      TimelineLinkPopupComponent,
      options
    );
    modalRef.result.then(
      (result: Link) => {
        if (result) {
          this.link = result;
          this.SelectItem.emit(this.link);
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
