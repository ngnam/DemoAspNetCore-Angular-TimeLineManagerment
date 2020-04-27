import { Component, OnInit, OnDestroy } from '@angular/core';
import { Link } from 'src/app/domain/api-models/url-information-response';
import { Subject } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'src/app/shared/components/toast-container/toast-service';
import { UrlInfoRepositoryService } from 'src/app/domain/api-repository/url-info-repository.service';
import { takeUntil } from 'rxjs/operators';
import { OptionsToast } from 'src/app/core/configs/toast.config';

@Component({
  selector: 'app-timeline-link-popup',
  templateUrl: './timeline-link-popup.component.html',
  styleUrls: ['./timeline-link-popup.component.scss']
})
export class TimelineLinkPopupComponent implements OnInit, OnDestroy {

  linkUrl: string;

  title = 'Enter Link Url';

  private unsubcribe$ = new Subject<void>();

  constructor(
    public activeModal: NgbActiveModal,
    private toastService: ToastService,
    private urlInfoRepositoryService: UrlInfoRepositoryService
  ) {}

  ngOnInit(): void {
  }

  loadLinkInfo() {
    this.urlInfoRepositoryService.getInfoLink(this.linkUrl)
      .pipe(takeUntil(this.unsubcribe$))
      .subscribe((data) => {
        if (data.resultCode === 1 && data.resultData) {
          this.selectItem(data.resultData);
        }
        if (data.errorDisplay && data.errorMessage) {
          // notification error
          console.log(data.errorMessage);
          this.toastService.show(data.errorMessage, OptionsToast.danger);
        }
      });
  }

  selectItem(item: Link) {
    this.activeModal.close(item);
  }

  ngOnDestroy() {
    this.unsubcribe$.next();
    this.unsubcribe$.complete();
  }

}
