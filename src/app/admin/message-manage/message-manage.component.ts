import { Component, OnInit, Injector } from '@angular/core';
import { appModuleAnimation } from "shared/animations/routerTransition";
import { AppComponentBase } from "shared/common/app-component-base";
import { Router } from "@angular/router";
import { AppConsts } from "shared/AppConsts";
import { SortDescriptor } from "@progress/kendo-data-query/dist/es/sort-descriptor";
import { AppGridData } from "shared/grid-data-results/grid-data-results";
import { SMSTemplateServiceProxy, SMSProviderInfoDto } from "shared/service-proxies/service-proxies";

@Component({
  selector: 'app-message-manage',
  templateUrl: './message-manage.component.html',
  styleUrls: ['./message-manage.component.css'],
  animations: [appModuleAnimation()]
})
export class MessageManageComponent extends AppComponentBase implements OnInit {
  allSmsProvider: SMSProviderInfoDto[];
  templateName: string;
  templateCode: string;
  providerNamde: string;
  loadMessageManageData: AppGridData;

  buttonCount: number = 5;
  info: boolean = true;
  type: 'numeric' | 'input' = 'numeric';
  pageSizes: number[] = AppConsts.grid.pageSizes;
  previousNext: boolean = true;
  pageSize: number = AppConsts.grid.defaultPageSize;
  skip: number = 0;
  sort: Array<SortDescriptor> = [];

  constructor(
    injector: Injector,
    private _router: Router,
    private _smsTemplateDataResult: AppGridData,
    private _smsTemplateServiceProxy: SMSTemplateServiceProxy,
  ) {
    super(injector);
  }

  ngOnInit() {
    this.loadMessageManageData = this._smsTemplateDataResult;
    this.loadData();
  }

  createSmsTemplate(): void {
    this._router.navigate(['app/admin/message-template/create']);
  }
  editHandler(dataItem) {
    this._router.navigate(['app/admin/message-template/edit', dataItem.id]);
  }
  deleteHandler(dataItem) {
    this._smsTemplateServiceProxy
      .deleteAsync(dataItem.id).subscribe(() => {
        this.loadData();
      });
  }

  public loadData() {
    let state = { skip: this.skip, take: this.pageSize, sort: this.sort };
    let maxResultCount, skipCount, sorting;
    if (state) {
      maxResultCount = state.take;
      skipCount = state.skip
      if (state.sort.length > 0 && state.sort[0].dir) {
        sorting = state.sort[0].field + " " + state.sort[0].dir;
      }
    }

    let messageTemplateData = () => {
      return this._smsTemplateServiceProxy.getSMSTemplates(this.templateName, this.templateCode, this.providerNamde, true, sorting, maxResultCount, skipCount);
    };
    this._smsTemplateDataResult.query(messageTemplateData);

    this._smsTemplateServiceProxy
      .getSMSProviders()
      .subscribe(result => {
        this.allSmsProvider = result;
      })
  }
}
