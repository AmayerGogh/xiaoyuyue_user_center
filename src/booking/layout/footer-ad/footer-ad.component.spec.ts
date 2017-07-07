import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterAdComponent } from './footer-ad.component';

describe('FooterAdComponent', () => {
  let component: FooterAdComponent;
  let fixture: ComponentFixture<FooterAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
