/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ContactorModelComponent } from './contactor-model.component';

describe('ContactorModelComponent', () => {
  let component: ContactorModelComponent;
  let fixture: ComponentFixture<ContactorModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactorModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactorModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
