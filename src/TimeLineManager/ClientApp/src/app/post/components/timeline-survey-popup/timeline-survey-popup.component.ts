import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'src/app/shared/components/toast-container/toast-service';
import { SurveyRepositoryService } from 'src/app/domain/api-repository/survey-repository.service';
import { takeUntil } from 'rxjs/operators';
import { OptionsToast } from 'src/app/core/configs/toast.config';
import { Survey } from 'src/app/domain/api-models/list-survey-response';

enum Status {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
@Component({
  selector: 'app-timeline-survey-popup',
  templateUrl: './timeline-survey-popup.component.html',
  styleUrls: ['./timeline-survey-popup.component.scss'],
})
export class TimelineSurveyPopupComponent implements OnInit, OnDestroy {
  statusSurvey = Status;
  items: Survey[];
  title = 'Surveys';
  private unsubcribe$ = new Subject<void>();

  constructor(
    public activeModal: NgbActiveModal,
    private toastService: ToastService,
    private surveyRepositoryService: SurveyRepositoryService
  ) {}

  ngOnInit(): void {
    this.loadSurveys();
  }

  loadSurveys() {
    this.surveyRepositoryService
      .getAll()
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

  selectItem(item: Survey) {
    this.activeModal.close(item);
  }

  ngOnDestroy() {
    this.unsubcribe$.next();
    this.unsubcribe$.complete();
  }
}
