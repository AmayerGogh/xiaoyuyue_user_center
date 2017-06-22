import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyBookingModelComponent } from './reply-booking-model.component';

describe('ReplyBookingModelComponent', () => {
  let component: ReplyBookingModelComponent;
  let fixture: ComponentFixture<ReplyBookingModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReplyBookingModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplyBookingModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
