import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-timeline-image-popup',
  templateUrl: './timeline-image-popup.component.html',
  styleUrls: ['./timeline-image-popup.component.scss']
})
export class TimelineImagePopupComponent implements OnInit {
  title = 'Upload photo';
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
