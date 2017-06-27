import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterSideBarComponent } from './side-bar.component';

describe('CenterSideBarComponent', () => {
  let component: CenterSideBarComponent;
  let fixture: ComponentFixture<CenterSideBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CenterSideBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
