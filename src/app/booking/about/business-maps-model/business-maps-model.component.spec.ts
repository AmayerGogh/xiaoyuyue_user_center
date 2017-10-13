import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { BusinessMapsModelComponent } from './business-maps-model.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('BusinessMpsModelComponent', () => {
  let component: BusinessMapsModelComponent;
  let fixture: ComponentFixture<BusinessMapsModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BusinessMapsModelComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessMapsModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
