import { Component, AfterViewInit, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuditLogServiceProxy, AuditLogListDto } from '@shared/service-proxies/service-proxies';
import { NotifyService } from '@abp/notify/notify.service';
import { AppConsts } from '@shared/AppConsts';
import { AppComponentBase } from '@shared/common/app-component-base';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { AuditLogDetailModalComponent } from '@app/admin/audit-logs/audit-log-detail-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { ActivatedRoute, Router } from '@angular/router';

import * as moment from "moment";

import { GridComponent, GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { State, process, SortDescriptor, orderBy, toODataString } from '@progress/kendo-data-query';
import { DatetimeHelper } from "shared/helpers/DatetimeHelper";
import { AppGridData } from "shared/grid-data-results/grid-data-results";
import { LogsGridDataInputDto } from "shared/grid-data-results/base-grid-data-input.dto";

@Component({
    templateUrl: "./audit-logs.component.html",
    styleUrls: ["./audit-logs.component.less"],
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class AuditLogsComponent extends AppComponentBase implements AfterViewInit {

    @ViewChild('auditLogDetailModal') auditLogDetailModal: AuditLogDetailModalComponent;
    @ViewChild(GridComponent) private grid: GridComponent;

    //Filters
    public startDate: moment.Moment = moment().startOf("day");
    public endDate: moment.Moment = moment().endOf("day");
    public username: string;
    public serviceName: string;
    public methodName: string;
    public browserInfo: string;
    public hasException: boolean = undefined;
    public minExecutionDuration: number;
    public maxExecutionDuration: number;

    // grid result
    logsData: AppGridData;

    // grid
    skip: number = 0;
    sort: Array<SortDescriptor> = [];
    pageSize: number = AppConsts.grid.defaultPageSize;
    info: boolean = true;
    buttonCount: number = 5;
    previousNext: boolean = true;
    type: 'numeric' | 'input' = 'numeric';
    advancedFiltersAreShown: boolean = false;
    pageSizes: number[] = AppConsts.grid.pageSizes;



    constructor(
        injector: Injector,
        private _auditLogService: AuditLogServiceProxy,
        private _notifyService: NotifyService,
        private _fileDownloadService: FileDownloadService,
        private _auditLogGridDataResult: AppGridData,
        private _router: Router
    ) {
        super(injector);
    }

    ngAfterViewInit(): void {
        let self = this;
        this.logsData = this._auditLogGridDataResult;
        this.loadData();
    }

    showDetails(record: AuditLogListDto): void {
        this.auditLogDetailModal.show(record);
    }

    getAuditLogs(): void {
        this.loadData();
    }

    exportToExcel(): void {
        let self = this;
        self._auditLogService.getAuditLogsToExcel(
            self.startDate,
            self.endDate,
            self.username,
            self.serviceName,
            self.methodName,
            self.browserInfo,
            self.hasException,
            self.minExecutionDuration,
            self.maxExecutionDuration,
            undefined,
            undefined,
            undefined)
            .subscribe(result => {
                self._fileDownloadService.downloadTempFile(result);
            });
    }

    public dataStateChange({ skip, take, sort }: DataStateChangeEvent): void {
        this.skip = skip;
        this.pageSize = take;
        this.sort = sort;

        this.loadData();
    }

    truncateString(value: string) {
        return abp.utils.truncateString(value, 32) || '';
    }

    loadData(): void {
        let inputDto = new LogsGridDataInputDto();
        inputDto.startDate = this.startDate;
        inputDto.endDate = this.endDate;
        inputDto.userName = this.username;
        inputDto.serviceName = this.serviceName;
        inputDto.browserInfo = this.browserInfo;
        inputDto.hasException = this.hasException;
        inputDto.minExecutionDuration = this.minExecutionDuration;
        inputDto.maxExecutionDuration = this.maxExecutionDuration;
        inputDto.maxResultCount = this.pageSize;
        inputDto.skipCount = this.skip;
        if (inputDto.minExecutionDuration == null) {
            inputDto.minExecutionDuration = undefined;
        }

        if (inputDto.maxExecutionDuration == null) {
            inputDto.maxExecutionDuration = undefined;
        }
        if (this.sort.length > 0 && this.sort[0].dir) {
            inputDto.sorting = this.sort[0].field + " " + this.sort[0].dir;
        }

        let loadAuditLogData = () => {
            return this._auditLogService.getAuditLogs(
                inputDto.startDate,
                inputDto.endDate,
                inputDto.userName,
                inputDto.serviceName,
                inputDto.methodName,
                inputDto.browserInfo,
                inputDto.hasException,
                inputDto.minExecutionDuration,
                inputDto.maxExecutionDuration,
                inputDto.sorting,
                inputDto.maxResultCount,
                inputDto.skipCount)
                .map(response => {
                    var string = response.toJS();
                    string.items.forEach(function (item) {
                        item.executionTime = DatetimeHelper.localDatetime(item.executionTime);
                        // item.executionDuration = item.executionDuration + " ms";
                        // item.browserInfo = abp.utils.truncateStringWithPostfix(item.browserInfo, 20);
                    })
                    return string;
                })
        };
        this._auditLogGridDataResult.query(loadAuditLogData);
    }

    showDetailHandler(dataItem): void {
        this._router.navigate(['app/admin/auditLogs/detail', dataItem]);
    }
}