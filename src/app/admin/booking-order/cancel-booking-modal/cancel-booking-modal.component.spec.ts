import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CancelBookingModalComponent } from './cancel-booking-modal.component';


describe('CancelBookingModalComponent', () => {
  let component: CancelBookingModalComponent;
  let fixture: ComponentFixture<CancelBookingModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelBookingModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelBookingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
