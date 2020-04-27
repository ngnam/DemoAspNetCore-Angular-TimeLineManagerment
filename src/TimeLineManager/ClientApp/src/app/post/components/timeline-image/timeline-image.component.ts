import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ngbModalOptionsConfig } from 'src/app/core/configs/ngb-modal-options.config';
import { NgbModalOptions, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Media, MediaType } from 'src/app/domain/api-models/upload-media-response';
import { Image } from 'src/app/domain/api-models/post-response';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-timeline-image',
  templateUrl: './timeline-image.component.html',
  styleUrls: ['./timeline-image.component.scss']
})
export class TimelineImageComponent implements OnInit {

  @Input() images: Image[] = [];
  @Output() UploadImage: EventEmitter<Image[]> = new EventEmitter();

  private optionsModal: NgbModalOptions = ngbModalOptionsConfig;
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  // + openPopUp()
  // + renderItem(item: Image)
  // + removeItem(item: Image)
  // + addItem(item: Image)

  removeItem(image: Image) {
    this.images = this.images.filter(item => item.thumb !== image.thumb);
    this.UploadImage.emit(this.images);
  }

  async openPopUp() {
    const { TimelineImagePopupComponent } = await import('../timeline-image-popup/timeline-image-popup.component');
    const modalRef = this.modalService.open(
      TimelineImagePopupComponent,
      this.optionsModal
    );
    modalRef.result.then(
      (result: Media) => {
        if (result) {
          const item: Image = {
            thumb: result.thumb,
            original: result.original,
            width: result.width,
            height: result.height
          };
          this.images.push(item);
          this.UploadImage.emit(this.images);
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
