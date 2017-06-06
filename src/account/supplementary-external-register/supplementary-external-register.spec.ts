import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SupplementaryExternalRegisterComponent } from "account/supplementary-external-register/supplementary-external-register.component";


describe('ReplenishLoginComponent', () => {
  let component: SupplementaryExternalRegisterComponent;
  let fixture: ComponentFixture<SupplementaryExternalRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplementaryExternalRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplementaryExternalRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
