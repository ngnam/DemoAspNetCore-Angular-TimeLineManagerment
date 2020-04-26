import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-timeline-video-popup',
  templateUrl: './timeline-video-popup.component.html',
  styleUrls: ['./timeline-video-popup.component.scss']
})
export class TimelineVideoPopupComponent implements OnInit {
  title = 'Upload vidoeo';
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
