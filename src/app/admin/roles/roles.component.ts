import { Component, AfterViewInit, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { RoleServiceProxy, RoleListDto } from '@shared/service-proxies/service-proxies';

import { NotifyService } from '@abp/notify/notify.service';
import { AppConsts } from '@shared/AppConsts';
import { AppComponentBase } from '@shared/common/app-component-base';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { FlatPermissionWithLevelDto } from '@shared/service-proxies/service-proxies';
import { appModuleAnimation } from '@shared/animations/routerTransition';

import * as moment from "moment";

import { GridComponent, GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { State, process, SortDescriptor, orderBy, toODataString } from '@progress/kendo-data-query';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppStorageService } from "shared/services/storage.service";
import { AppGridData } from "shared/grid-data-results/grid-data-results";


@Component({
    templateUrl: "./roles.component.html",
    animations: [appModuleAnimation()]
})
export class RolesComponent extends AppComponentBase {
    // @ViewChild('createOrEditRoleModal') createOrEditRoleModal: CreateOrEditRoleModalComponent;

    // Filters
    selectedPermission: string = '';

    // grid result
    rolesData: AppGridData;

    // kendo grid
    displayName: string;

    // page setting
    buttonCount: number = 5;
    info: boolean = true;
    type: 'numeric' | 'input' = 'numeric';
    pageSizes: number[] = AppConsts.grid.pageSizes;
    previousNext: boolean = true;
    pageSize: number = this._localStorage.getStorageValue("roles.take") ? this._localStorage.getStorageValue("roles.take") : AppConsts.grid.defaultPageSize;
    // 如果一开始没值就为零
    // 抽出为localstorage组件，来读写localstorage数据    Mark！
    skip: number = this._localStorage.getStorageValue("roles.skip") ? this._localStorage.getStorageValue("roles.skip") : 0;
    sort: Array<SortDescriptor> = [];

    @ViewChild(GridComponent) private grid: GridComponent;

    // 配置列数
    roleName: Object = {
        field: 'displayName',
        title: this.l('RoleName')
    }
    creationTime: Object = {
        field: 'CreationTime',
        title: this.l('CreationTime')
    }
    columns: Object[] = [this.roleName, this.creationTime];

    constructor(
        injector: Injector,
        private _roleService: RoleServiceProxy,
        private _rolesGridDataResult: AppGridData,
        private _notifyService: NotifyService,
        private _fileDownloadService: FileDownloadService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _localStorage: AppStorageService
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.rolesData = this._rolesGridDataResult;
        this.loadData();
    }

    /**
     * roles actions
     */
    getRoles(): void {
        this.loadData();
    }

    createRole(): void {
        this._router.navigate(['app/admin/roles/create']);
        // this.createOrEditRoleModal.show();
    }

    deleteRole(role: RoleListDto): void {
        var self = this;
        self.message.confirm(
            self.l('RoleDeleteWarningMessage', role.displayName),
            function (isConfirmed) {
                if (isConfirmed) {
                    self._roleService.deleteRole(role.id).subscribe(() => {
                        self.getRoles();
                        abp.notify.success(self.l('SuccessfullyDeleted'));
                    });
                }
            }
        );
    }

    public dataStateChange({ skip, take, sort }: DataStateChangeEvent): void {
        this.skip = skip;
        this.pageSize = take;
        this.sort = sort;
        // 把用户点击后的skip保存在localstorage中
        this._localStorage.setStorageValue("roles.skip", this.skip);
        this._localStorage.setStorageValue("roles.take", this.pageSize);
        this.loadData();
    }

    loadData(): void {
        let permission = this.permission ? this.selectedPermission : undefined;
        let state = { skip: this.skip, take: this.pageSize, sort: this.sort };
        let maxResultCount, skipCount, sorting;
        if (state) {
            maxResultCount = state.take;
            skipCount = state.skip
            if (state.sort.length > 0 && state.sort[0].dir) {
                sorting = state.sort[0].field + " " + state.sort[0].dir
            }
        }
        let loadRoleData = () => {
            return this._roleService.getRoles(this.displayName, permission, sorting, maxResultCount, skipCount);
        }
        this._rolesGridDataResult.query(loadRoleData);

    }

    // 编辑删除
    editHandler({ sender, rowIndex, dataItem }) {
        this._router.navigate(['app/admin/roles/edit', dataItem.id]);
    }
    removeHandler({ sender, rowIndex, dataItem }) {
        this.deleteRole(dataItem);
    }
}