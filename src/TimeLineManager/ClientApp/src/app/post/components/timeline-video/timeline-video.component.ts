import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ngbModalOptionsConfig } from 'src/app/core/configs/ngb-modal-options.config';
import { Media } from 'src/app/domain/api-models/upload-media-response';
import { Video } from 'src/app/domain/api-models/post-response';
import { BehaviorSubject } from 'rxjs';

// + openPopUp()
// + renderItem(item: Video)
// + removeItem(item: Video)

@Component({
  selector: 'app-timeline-video',
  templateUrl: './timeline-video.component.html',
  styleUrls: ['./timeline-video.component.scss']
})
export class TimelineVideoComponent implements OnInit {
  video: Video;
  private video$: BehaviorSubject<Video> = new BehaviorSubject(null);

  private optionsModal: NgbModalOptions = ngbModalOptionsConfig;
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  getVideo() {
    return this.video$.asObservable();
  }

  setVideo(video: Video) {
    this.video$.next(video);
  }

  removeItem(video: Video) {
    if (this.video.thumb === video.thumb) {
      this.video = null;
      this.setVideo(this.video);
    }
  }

  async openPopUp() {
    const { TimelineVideoPopupComponent } = await import('../timeline-video-popup/timeline-video-popup.component');
    const modalRef = this.modalService.open(
      TimelineVideoPopupComponent,
      this.optionsModal
    );
    modalRef.result.then(
      (result: Media) => {
        if (result) {
          const item: Video = {
            thumb: result.thumb,
            original: result.original,
            width: result.width,
            height: result.height,
            duration: result.duration
          };
          this.video = item;
          this.video$.next(this.video);
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
