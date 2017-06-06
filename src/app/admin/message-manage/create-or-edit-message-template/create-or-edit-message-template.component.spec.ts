import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateOrEditMessageTemplateComponent } from "app/admin/message-manage/create-or-edit-message-template/create-or-edit-message-template.component";


describe('CreateOrEditMessageTemplateComponent', () => {
  let component: CreateOrEditMessageTemplateComponent;
  let fixture: ComponentFixture<CreateOrEditMessageTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOrEditMessageTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrEditMessageTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
