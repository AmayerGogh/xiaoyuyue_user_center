/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HowToBookingComponent } from './how-to-booking.component';

describe('HowToBookingComponent', () => {
  let component: HowToBookingComponent;
  let fixture: ComponentFixture<HowToBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HowToBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HowToBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
