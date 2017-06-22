import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptimalBookingTimeModelComponent } from './optimal-booking-time-model.component';

describe('OptimalBookingTimeModelComponent', () => {
  let component: OptimalBookingTimeModelComponent;
  let fixture: ComponentFixture<OptimalBookingTimeModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptimalBookingTimeModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptimalBookingTimeModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
