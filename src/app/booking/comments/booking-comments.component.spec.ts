import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { BookingCommentsComponent } from './booking-comments.component';

describe('BookingCommentsComponent', () => {
  let component: BookingCommentsComponent;
  let fixture: ComponentFixture<BookingCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookingCommentsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
