import { Component, OnInit, AfterViewInit, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TenantServiceProxy, TenantListDto, NameValueDto, CommonLookupServiceProxy, FindUsersInput, EntityDtoOfInt64, ListResultDtoOfComboboxItemDto, ComboboxItemDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Observable } from 'rxjs/Observable';
import { CreateTenantModalComponent } from './create-tenant-modal.component';
import { EditTenantModalComponent } from './edit-tenant-modal.component';
import { TenantFeaturesModalComponent } from './tenant-features-modal.component'
import { CommonLookupModalComponent } from '@app/shared/common/lookup/common-lookup-modal.component';
import { ImpersonationService } from '@app/admin/users/impersonation.service';
import { appModuleAnimation } from '@shared/animations/routerTransition';

import { AppConsts } from '@shared/AppConsts';
import { GridComponent, GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { State, process, SortDescriptor, orderBy, toODataString } from '@progress/kendo-data-query';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import * as moment from "moment";
import { DataLocalStorage } from "shared/services/data-local-storage.service";
import { AppGridData } from "shared/grid-data-results/grid-data-results";

@Component({
    templateUrl: "./tenants.component.html",
    styleUrls: ["./tenants.component.less"],
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class TenantsComponent extends AppComponentBase implements OnInit, AfterViewInit {
    tenantsData: AppGridData;
    editionsName: ComboboxItemDto[];

    @ViewChild('impersonateUserLookupModal') impersonateUserLookupModal: CommonLookupModalComponent;
    // @ViewChild('createTenantModal') createTenantModal: CreateTenantModalComponent;
    // @ViewChild('editTenantModal') editTenantModal: EditTenantModalComponent;
    @ViewChild('tenantFeaturesModal') tenantFeaturesModal: TenantFeaturesModalComponent;

    private _$tenantsTable: JQuery;
    TenantName: string;
    UserName: string;
    EditionName: string;
    advancedFiltersAreShown: boolean = false;

    buttonCount: number = 5;
    info: boolean = true;
    type: 'numeric' | 'input' = 'numeric';
    pageSizes: number[] = AppConsts.grid.pageSizes;
    previousNext: boolean = true;
    pageSize: number = AppConsts.grid.defaultPageSize;
    skip: number = 0;
    sort: Array<SortDescriptor> = [];

    @ViewChild(GridComponent) private grid: GridComponent;

    constructor(
        injector: Injector,
        private _tenantService: TenantServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _commonLookupService: CommonLookupServiceProxy,
        private _impersonationService: ImpersonationService,
        private _tenantsGridDataResult: AppGridData,
        private _dataLocalStorage: DataLocalStorage,
        private _router: Router
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.impersonateUserLookupModal.configure({
            title: this.l('SelectAUser'),
            dataSource: (skipCount: number, maxResultCount: number, filter: string, tenantId?: number) => {
                var input = new FindUsersInput();
                input.filter = filter;
                input.maxResultCount = maxResultCount;
                input.skipCount = skipCount;
                input.tenantId = tenantId;
                return this._commonLookupService.findUsers(input);
            }
        });

        this._dataLocalStorage.editionsDataLocalStorage();
    }

    ngAfterViewInit(): void {
        this.tenantsData = this._tenantsGridDataResult;
        this.getTenants();
    }

    getTenants(): void {
        this.loadData();
    }

    createTenant(): void {
        // this.createTenantModal.show();
        this._router.navigate(['app/admin/tenants/create']);
    };

    deleteTenant(tenant: TenantListDto): void {
        let self = this;
        self.message.confirm(
            self.l('TenantDeleteWarningMessage', tenant.tenancyName),
            isConfirmed => {
                if (isConfirmed) {
                    self._tenantService.deleteTenant(tenant.id).subscribe(() => {
                        self.getTenants();
                        self.notify.success(self.l('SuccessfullyDeleted'));
                    });
                }
            }
        );
    }

    impersonateUser(item: NameValueDto): void {
        this._impersonationService
            .impersonate(
            parseInt(item.value),
            this.impersonateUserLookupModal.tenantId
            );
    }

    public dataStateChange({ skip, take, sort }: DataStateChangeEvent): void {
        this.skip = skip;
        this.pageSize = take;
        this.sort = sort;

        this.loadData();
    }

    private loadData(): void {
        let loadTenantData = () => {
            let maxResultCount, skipCount, sorting;
            let state = { skip: this.skip, take: this.pageSize, sort: this.sort };
            let EditionId: number = this.transEditionId(this.EditionName);
            if (state) {
                maxResultCount = state.take;
                skipCount = state.skip
                if (state.sort.length > 0 && state.sort[0].dir) {
                    sorting = state.sort[0].field + " " + state.sort[0].dir
                }
            }
            return this._tenantService.getTenants(this.TenantName, this.UserName, EditionId, undefined, sorting, maxResultCount, skipCount)
        };
        // { skip: this.skip, take: this.pageSize, sort: this.sort }, this.TenantName, this.UserName, this.EditionName
        this._tenantsGridDataResult.query(loadTenantData);
    }

    /**
 * 由于option绑定的是版本名称字符串，需要转为number -> EditionId
 * @param editionName 
 */
    private transEditionId(editionName: string): number {

        let editionsString = localStorage.getItem("edition.info");
        if (!editionsString) {
            return;
        }
        let jsonData = JSON.parse(editionsString, this.jsonParseReviver);
        this.editionsName = ListResultDtoOfComboboxItemDto.fromJS(jsonData).items;
        for (let i = 0; i < this.editionsName.length; i++) {
            if (editionName === this.editionsName[i].displayText) {
                return i;
            }
        }
    }

    protected jsonParseReviver: (key: string, value: any) => any = undefined;


    loginAsThisUser(dataItem): void {
        this.impersonateUserLookupModal.tenantId = dataItem.id;
        this.impersonateUserLookupModal.show();
    }

    unlockedTenants(dataItem) {
        this._tenantService.unlockTenantAdmin(new EntityDtoOfInt64({ id: dataItem.id }))
            .subscribe(() => {
                this.notify.success(this.l('UnlockedTenandAdmin', dataItem.name));
            });
    }

    editHandler(dataItem): void {
        this._router.navigate(['app/admin/tenants/edit', dataItem.id]);
    }

    removeHandler(dataItem): void {
        this.deleteTenant(dataItem);
    }
}