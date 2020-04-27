import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { isImage } from 'src/app/core/base/helpers';
import { UploadMediaRepositoryService } from 'src/app/domain/api-repository/upload-media-repository.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastService } from 'src/app/shared/components/toast-container/toast-service';

@Component({
  selector: 'app-timeline-image-popup',
  templateUrl: './timeline-image-popup.component.html',
  styleUrls: ['./timeline-image-popup.component.scss'],
})
export class TimelineImagePopupComponent implements OnInit, OnDestroy {
  title = 'Upload photo';
  typeFile: string = 'photo';
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

  // + selectFile()
  // + DragDropFile()
  // + uploadFile(fileUpload, typeFile)

  selectFile(fileInput) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      // validation
      const file: File = fileInput.target.files[0];
      if (!this.validation(file)) {
        return;
      } else {
        this.fileUpload = file;
        this.checkFileUpload = true;
        // passed All -> preview File
        this.previewFile(file);
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
    // is file IMAGE: Format: JPG, JPGE, PNG.
    // fileSize <= 10 MB
    const messagerIsImage: string = 'File không hỗ trợ định dạng!';
    const messagerFileSize: string = 'File vượt quá dung lượng cho phép!';
    if (!isImage(file.name)) {
      // toastr message
      this.toastService.show(messagerIsImage, {
        classname: 'bg-danger text-light',
        delay: 5000,
      });
      return false;
    }
    if (file.size > 10 * 1024 * 1024) {
      this.toastService.show(messagerFileSize, {
        classname: 'bg-danger text-light',
        delay: 5000,
      });
      return false;
    }
    return true;
  }

  private previewFile(file: File) {
    const reader = new FileReader();
    reader.onload = function (e: any) {
      document.getElementById('preview').setAttribute('src', e.target.result);
    };

    reader.readAsDataURL(file);
  }
}
