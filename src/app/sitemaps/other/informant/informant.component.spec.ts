/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InformantComponent } from './informant.component';

describe('InformantComponent', () => {
  let component: InformantComponent;
  let fixture: ComponentFixture<InformantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
