import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { NgbModalOptions, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ngbModalOptionsConfig } from 'src/app/core/configs/ngb-modal-options.config';
import { Survey } from 'src/app/domain/api-models/list-survey-response';

@Component({
  selector: 'app-timeline-survey',
  templateUrl: './timeline-survey.component.html',
  styleUrls: ['./timeline-survey.component.scss']
})
export class TimelineSurveyComponent implements OnInit {

  @Input() survey: Survey;
  @Output() SelectItem: EventEmitter<Survey> = new EventEmitter();

  private optionsModal: NgbModalOptions = ngbModalOptionsConfig;
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  // + openPopUp()
  // + getList()
  // + renderItem(item: Coupon)
  // + removeItem(item: Coupon)
  addItem(survey: Survey) {
    this.SelectItem.emit(survey);
  }

  removeItem(survey: Survey) {
    if (this.survey.id === survey.id) {
      this.survey = null;
      this.addItem(this.survey);
    }
  }

  async openPopUp() {
    const options = this.optionsModal;
    options.size = 'lg';
    const { TimelineSurveyPopupComponent } = await import('../timeline-survey-popup/timeline-survey-popup.component');
    const modalRef = this.modalService.open(
      TimelineSurveyPopupComponent,
      options
    );
    modalRef.result.then(
      (result: Survey) => {
        if (result) {
          this.survey = result;
          this.SelectItem.emit(this.survey);
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
