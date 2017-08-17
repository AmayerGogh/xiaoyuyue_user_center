import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BookingRatingComponent } from "booking/rating/booking-rating.component";

describe('BookingRatingComponent', () => {
  let component: BookingRatingComponent;
  let fixture: ComponentFixture<BookingRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
