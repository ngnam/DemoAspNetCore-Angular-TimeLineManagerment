import { Component, OnInit } from '@angular/core';
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

  images: Image[] = [];
  private images$: BehaviorSubject<Image[]> = new BehaviorSubject([]);

  private optionsModal: NgbModalOptions = ngbModalOptionsConfig;
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  // + openPopUp()
  // + renderItem(item: Image)
  // + removeItem(item: Image)
  // + addItem(item: Image)

  getImages() {
    return this.images$.asObservable();
  }

  setImages(images: Image[]) {
    this.images$.next(images);
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
          this.images$.next(this.images);
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
