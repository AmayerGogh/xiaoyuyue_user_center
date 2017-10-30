import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { AdminSideBarComponent } from './side-bar.component';

describe('AdminSideBarComponent', () => {
  let component: AdminSideBarComponent;
  let fixture: ComponentFixture<AdminSideBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminSideBarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
