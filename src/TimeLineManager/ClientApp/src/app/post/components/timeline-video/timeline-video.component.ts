import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ngbModalOptionsConfig } from 'src/app/core/configs/ngb-modal-options.config';

@Component({
  selector: 'app-timeline-video',
  templateUrl: './timeline-video.component.html',
  styleUrls: ['./timeline-video.component.scss']
})
export class TimelineVideoComponent implements OnInit {

  private optionsModal: NgbModalOptions = ngbModalOptionsConfig;
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  // + openPopUp()
  // + renderItem(item: Image)
  // + removeItem(item: Image)

  async openPopUp() {
    const { TimelineVideoPopupComponent } = await import('../timeline-video-popup/timeline-video-popup.component');
    const modalRef = this.modalService.open(
      TimelineVideoPopupComponent,
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
