import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { ToastService } from 'src/app/shared/components/toast-container/toast-service';
import { UploadMediaRepositoryService } from 'src/app/domain/api-repository/upload-media-repository.service';
import { isVideo } from 'src/app/core/base/helpers';
import { takeUntil } from 'rxjs/operators';

// + selectFile()
// + DragDropFile()
// + uploadFile(fileUpload, typeFile)

@Component({
  selector: 'app-timeline-video-popup',
  templateUrl: './timeline-video-popup.component.html',
  styleUrls: ['./timeline-video-popup.component.scss']
})
export class TimelineVideoPopupComponent implements OnInit, OnDestroy {
  title = 'Upload video';
  typeFile: string = 'video';
  checkFileUpload: boolean = false;
  fileUpload: File;

  private unsubcribe$ = new Subject<void>();

  constructor(
    public activeModal: NgbActiveModal,
    private toastService: ToastService,
    private uploadMediaService: UploadMediaRepositoryService
  ) {}

  ngOnInit(): void {}

  ngOnDestroy() {
    this.fileUpload = null;
    this.checkFileUpload = false;
    this.unsubcribe$.next();
    this.unsubcribe$.complete();
  }

  selectFile(fileInput) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      // validation
      const file: File = fileInput.target.files[0];
      if (!this.validation(file)) {
        return;
      } else {
        this.fileUpload = file;
        this.checkFileUpload = true;
      }
    }
  }

  DragDropFile() {
    throw new Error('Not Implement');
  }

  onSubmit() {
    this.uploadFile(this.fileUpload, this.typeFile);
  }

  private uploadFile(file: File, type: string) {
    this.uploadMediaService
      .uploadFile(file, type)
      .pipe(takeUntil(this.unsubcribe$))
      .subscribe((response) => {
        if (response.resultCode === 0 && !response.errorDisplay) {
          this.toastService.show(response.errorMessage, {
            classname: 'bg-danger text-light',
            delay: 5000,
          });
        }
        if (response.resultCode === 1) {
          // pass data upload to container timeline-image
          this.activeModal.close(response.resultData);
        }
      });
  }

  private validation(file: File) {
    // is file IMAGE: Format:  MP4, M4V, MOV, AVI, WMV..
    // fileSize <= 20 MB
    const messagerIsVideo: string = 'File không hỗ trợ định dạng!';
    const messagerFileSize: string = 'File vượt quá dung lượng cho phép!';
    if (!isVideo(file.name)) {
      // toastr message
      this.toastService.show(messagerIsVideo, {
        classname: 'bg-danger text-light',
        delay: 5000,
      });
      return false;
    }
    if (file.size > 20 * 1024 * 1024) {
      this.toastService.show(messagerFileSize, {
        classname: 'bg-danger text-light',
        delay: 5000,
      });
      return false;
    }
    return true;
  }

}
