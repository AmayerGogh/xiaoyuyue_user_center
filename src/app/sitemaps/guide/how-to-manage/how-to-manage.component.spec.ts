/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HowToManageComponent } from './how-to-manage.component';

describe('HowToManageComponent', () => {
  let component: HowToManageComponent;
  let fixture: ComponentFixture<HowToManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HowToManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HowToManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
