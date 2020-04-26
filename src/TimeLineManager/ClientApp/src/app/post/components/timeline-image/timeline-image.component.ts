import { Component, OnInit } from '@angular/core';
import { ngbModalOptionsConfig } from 'src/app/core/configs/ngb-modal-options.config';
import { NgbModalOptions, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-timeline-image',
  templateUrl: './timeline-image.component.html',
  styleUrls: ['./timeline-image.component.scss']
})
export class TimelineImageComponent implements OnInit {
  private optionsModal: NgbModalOptions = ngbModalOptionsConfig;
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  // + openPopUp()
  // + renderItem(item: Image)
  // + removeItem(item: Image)
  // + addItem(item: Image)

  async openPopUp() {
    const { TimelineImagePopupComponent } = await import('../timeline-image-popup/timeline-image-popup.component');
    const modalRef = this.modalService.open(
      TimelineImagePopupComponent,
      this.optionsModal
    );
    modalRef.result.then(
      (result) => console.log('Closed with: ', result),
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
