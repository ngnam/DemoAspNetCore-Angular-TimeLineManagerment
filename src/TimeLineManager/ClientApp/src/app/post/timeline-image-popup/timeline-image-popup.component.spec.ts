import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineImagePopupComponent } from './timeline-image-popup.component';

describe('TimelineImagePopupComponent', () => {
  let component: TimelineImagePopupComponent;
  let fixture: ComponentFixture<TimelineImagePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineImagePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineImagePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
