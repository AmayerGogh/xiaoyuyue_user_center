import { Component, OnInit, Injector } from '@angular/core';
import { appModuleAnimation } from "shared/animations/routerTransition";
import { AppComponentBase } from "shared/common/app-component-base";
import { AppConsts } from "shared/AppConsts";
import { SortDescriptor } from "@progress/kendo-data-query/dist/es/sort-descriptor";
import { GridDataMock } from "shared/grid-data-results/grid-data-mock";
import { Location } from '@angular/common';
import { SMSTemplateServiceProxy, SMSProviderInfoDto, GetSMSTemplateForEditDto, SMSTemplateItemDto, CreateOrUpdateSMSTemplateInput } from "shared/service-proxies/service-proxies";
import { GridDataResult } from "@progress/kendo-angular-grid/dist/es/data.collection";
import { AppGridData } from "shared/grid-data-results/grid-data-results";
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-edit-message-template',
  templateUrl: './create-or-edit-message-template.component.html',
  styleUrls: ['./create-or-edit-message-template.component.css'],
  animations: [appModuleAnimation()]
})
export class CreateOrEditMessageTemplateComponent extends AppComponentBase implements OnInit {
  smsTemplateGridData: AppGridData = new AppGridData();
  gridEditRowIndex: any;
  defaultSmsProvider: SMSProviderInfoDto = new SMSProviderInfoDto();
  gridDataResult: SMSTemplateItemDto[];
  smsTemplateForEdit: GetSMSTemplateForEditDto = new GetSMSTemplateForEditDto();
  allSmsProvider: SMSProviderInfoDto[];
  // editDataItem传给子组件
  editDataItem: SMSTemplateItemDto;

  href: string = document.location.href;
  smsTemplateId: any = +this.href.substr(this.href.lastIndexOf("/") + 1, this.href.length);

  buttonCount: number = 5;
  info: boolean = true;
  type: 'numeric' | 'input' = 'numeric';
  pageSizes: number[] = AppConsts.grid.pageSizes;
  previousNext: boolean = true;
  pageSize: number = AppConsts.grid.defaultPageSize;
  skip: number = 0;
  sort: Array<SortDescriptor> = [];
  private isNew: boolean;

  constructor(
    injector: Injector,
    private _location: Location,
    private _smsTemplateDataResult: AppGridData,
    private _smsTemplateServiceProxy: SMSTemplateServiceProxy,
    private _gridDataMock: GridDataMock
  ) {
    super(injector);
  }

  ngOnInit() {
    this.smsTemplateGridData = this._smsTemplateDataResult;
    this.loadData();
  }

  loadData() {
    if (!this.smsTemplateId) {
      this.gridDataResult = new Array();
      this.smsTemplateGridData = null;
      // 获取所有可用的短信供应商
      this._smsTemplateServiceProxy
        .getSMSProviders()
        .subscribe((response) => {
          this.allSmsProvider = response;
          this.defaultSmsProvider = response[0];
        });
      return;
    }

    let loadSmsTemplateData = () => {
      return this._smsTemplateServiceProxy
        .getSMSTemplateForEdit(this.smsTemplateId)
        .map(response => {
          this.smsTemplateForEdit = response;
          this.allSmsProvider = response.availabelSmsProviders;
          this.defaultSmsProvider = response.availabelSmsProviders[0];
          delete response.items[0].creationTime;
          this.gridDataResult = response.items;

          let gridData = (<GridDataResult>{
            data: this.gridDataResult,
            total: this.gridDataResult.length
          })
          return gridData;
        })
    };
    this._smsTemplateDataResult.query(loadSmsTemplateData, true);
  }

  saveData() {
    let input = new CreateOrUpdateSMSTemplateInput();
    input.id = this.smsTemplateId;
    input.name = this.smsTemplateForEdit.name;
    input.smsProvider = this.defaultSmsProvider.systemName;
    input.templateCode = this.smsTemplateForEdit.templateCode;
    input.isActive = true;
    input.items = this.gridDataResult;

    this._smsTemplateServiceProxy.createOrUpdate(input).subscribe(() => {
      this.notify.info(this.l('SavedSuccessfully'));
      this.back();
    });
  }

  public editHandler({ rowIndex, dataItem }) {
    this.isNew = false;
    this.editDataItem = dataItem;
    this.gridEditRowIndex = rowIndex;
  }
  public addHandler() {
    this.editDataItem = new SMSTemplateItemDto();
    this.isNew = true;
  }
  public cancelHandler() {
    this.editDataItem = undefined;
  }
  public saveHandler(smsTemplate: SMSTemplateItemDto) {
    let input = new SMSTemplateItemDto();
    input.dataItemName = smsTemplate.dataItemName;
    input.dataItemValue = smsTemplate.dataItemValue;
    input.id = smsTemplate.id;

    if (this.isNew) {
      this.gridDataResult.push(input);
    } else {
      this.gridDataResult[this.gridEditRowIndex] = input;
    }

    this.localChangeGridData();
    this.editDataItem = undefined;
  }

  public removeHandler({ dataItem }) {
    this.deleteGridItem(dataItem);
    this.localChangeGridData();
  }

  // 仅本地改变Grid的数据
  private localChangeGridData() {
    let fn = () => {
      let gridData = (<GridDataResult>{
        data: this.gridDataResult,
        total: this.gridDataResult.length
      })
      return Observable.of(gridData);
    };
    this._smsTemplateDataResult.query(fn, true);
    // 本地增删之后，返回DOM上的值
    this.smsTemplateGridData = this._smsTemplateDataResult;
  }

  // 删除单行GridItem
  private deleteGridItem(item) {
    for (var i = 0; i < this.gridDataResult.length; i++) {
      if (this.gridDataResult[i] == item) {
        this.gridDataResult.splice(i, 1);
        break;
      }
    }
  }

  back(): void {
    this._location.back();
  }

}
