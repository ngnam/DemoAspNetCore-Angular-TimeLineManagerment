import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'src/app/shared/components/toast-container/toast-service';
import { Subject } from 'rxjs';
import { StickerRepositoryService } from 'src/app/domain/api-repository/sticker-repository.service';
import { takeUntil } from 'rxjs/operators';
import { Sticker } from 'src/app/domain/api-models/list-sticker-response';
import { OptionsToast } from 'src/app/core/configs/toast.config';

@Component({
  selector: 'app-timeline-sticker-popup',
  templateUrl: './timeline-sticker-popup.component.html',
  styleUrls: ['./timeline-sticker-popup.component.scss']
})
export class TimelineStickerPopupComponent implements OnInit, OnDestroy {

  items: Sticker[];
  title = 'Sticker';

  private unsubcribe$ = new Subject<void>();

  constructor(
    public activeModal: NgbActiveModal,
    private toastService: ToastService,
    private stickerRepositoryService: StickerRepositoryService
  ) {}


  ngOnInit(): void {
    this.loadStickers();
  }

  loadStickers() {
    this.stickerRepositoryService.getAll(0, 40)
      .pipe(takeUntil(this.unsubcribe$))
      .subscribe((data) => {
        if (data.resultCode === 1 && data.resultData) {
          if (data.resultData.list && data.resultData.list.length > 0) {
            this.items = data.resultData.list;
          } else {
            this.items = [];
          }
          console.log(this.items);
        }
        if (data.errorDisplay && data.errorMessage) {
          // notification error
          console.log(data.errorMessage);
          this.toastService.show(data.errorMessage, OptionsToast.danger);
        }
      });
  }

  selectItem(item: Sticker) {
    this.activeModal.close(item);
  }

  ngOnDestroy() {
    this.unsubcribe$.next();
    this.unsubcribe$.complete();
  }

}
