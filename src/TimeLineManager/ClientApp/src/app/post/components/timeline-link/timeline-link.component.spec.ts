import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineLinkComponent } from './timeline-link.component';

describe('TimelineLinkComponent', () => {
  let component: TimelineLinkComponent;
  let fixture: ComponentFixture<TimelineLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
