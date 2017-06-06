import { Component, Input, Output, EventEmitter, OnInit, Injector } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { SMSTemplateItemDto } from "shared/service-proxies/service-proxies";
import { AppComponentBase } from "shared/common/app-component-base";

@Component({
  selector: 'kendo-grid-edit-form',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.less']
})
export class EditModalComponent extends AppComponentBase implements OnInit {
  smsTemplateItem: SMSTemplateItemDto;
  private editForm = new FormGroup({
    'dataItemName': new FormControl("", Validators.required),
    'dataItemValue': new FormControl("", Validators.required),
    'id': new FormControl({ value: "", disabled: true })
  });
  active: boolean = false;


  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Output() save: EventEmitter<SMSTemplateItemDto> = new EventEmitter();

  @Input() public set model(smsTemplate: SMSTemplateItemDto) {
    this.editForm.reset(smsTemplate);
    this.smsTemplateItem = smsTemplate;
    this.active = smsTemplate !== undefined;
  }
  @Input() public isNew: boolean = false;

  constructor(
    injector: Injector,
  ) {
    super(injector);
  }

  ngOnInit() {


  }

  public onSave(e): void {
    e.preventDefault();
    this.save.emit(this.editForm.value);
    this.active = false;
  }

  public onCancel(e): void {
    e.preventDefault();
    this.closeForm();
  }

  private closeForm(): void {
    this.active = false;
  }

}
