import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineImageComponent } from './timeline-image.component';

describe('TimelineImageComponent', () => {
  let component: TimelineImageComponent;
  let fixture: ComponentFixture<TimelineImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
