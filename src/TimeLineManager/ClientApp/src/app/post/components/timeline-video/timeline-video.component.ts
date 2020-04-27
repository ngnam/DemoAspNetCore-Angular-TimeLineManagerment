import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

  @Input() video: Video;
  @Output() UploadVideo: EventEmitter<Video> = new EventEmitter();

  private optionsModal: NgbModalOptions = ngbModalOptionsConfig;
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  addVideo(video: Video) {
    this.UploadVideo.emit(video);
  }

  removeItem(video: Video) {
    if (this.video.thumb === video.thumb) {
      this.video = null;
      this.addVideo(this.video);
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
          this.UploadVideo.emit(this.video);
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
