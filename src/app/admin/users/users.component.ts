import { Component, AfterViewInit, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { UserServiceProxy, UserListDto, EntityDtoOfInt64 } from '@shared/service-proxies/service-proxies';

import { PermissionCheckerService } from '@abp/auth/permission-checker.service';
import { NotifyService } from '@abp/notify/notify.service';
import { AppConsts } from '@shared/AppConsts';
import { AppComponentBase } from '@shared/common/app-component-base';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { FlatPermissionWithLevelDto, TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditUserModalComponent } from './create-or-edit-user-modal.component';
import { ImpersonationService } from './impersonation.service';
import { appModuleAnimation } from '@shared/animations/routerTransition';

import * as moment from "moment";

import { GridComponent, GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { State, process, SortDescriptor, orderBy, toODataString } from '@progress/kendo-data-query';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SelectHelper } from '@shared/helpers/SelectHelper';
import { AppGridData } from "shared/grid-data-results/grid-data-results";
import { UserGridDataInputDto } from "shared/grid-data-results/base-grid-data-input.dto";

@Component({
    templateUrl: "./users.component.html",
    styleUrls: ["./users.component.less"],
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class UsersComponent extends AppComponentBase implements AfterViewInit {
    //Filters
    advancedFiltersAreShown: boolean = false;
    userName: string = '';
    surname: string;
    email: string;
    isEmailConfirmed: boolean;
    phoneNumber: string;
    isPhoneConfirmed: boolean;
    isActive: boolean;

    selectedPermission: string = '';
    roles: number[] = undefined;

    flags: Object[] = SelectHelper.defaultList();

    /**
 * kendo gird
 */
    usersData: AppGridData;
    displayName: string;

    buttonCount: number = 5;
    info: boolean = true;
    type: 'numeric';
    previousNext: boolean = true;
    pageSizes: boolean = true;
    pageSize: number = AppConsts.grid.defaultPageSize;
    skip: number = 0;
    sort: Array<SortDescriptor> = [];

    @ViewChild(GridComponent) private grid: GridComponent;

    constructor(
        injector: Injector,
        private _http: Http,
        private _userServiceProxy: UserServiceProxy,
        private _userGridDataResult: AppGridData,
        private _notifyService: NotifyService,
        private _fileDownloadService: FileDownloadService,
        private _impersonationService: ImpersonationService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private router: Router,
    ) {
        super(injector);
    }

    ngAfterViewInit(): void {
        // this.userName = this._activatedRoute.snapshot.queryParams['filterText'] || '';
    }

    public ngOnInit(): void {
        this.usersData = this._userGridDataResult;
        this.getUsers();
    }


    getUsers(): void {
        this.loadUsersData();
    }

    exportToExcel(): void {
        this._userServiceProxy.getUsersToExcel()
            .subscribe(result => {
                this._fileDownloadService.downloadTempFile(result);
            });
    }

    createUser(): void {
        // this.createOrEditUserModal.show();
        this.router.navigate(['app/admin/users/create']);
    }

    deleteUser(user: UserListDto): void {
        if (user.userName === AppConsts.userManagement.defaultAdminUserName) {
            this.message.warn(this.l("{0}UserCannotBeDeleted", AppConsts.userManagement.defaultAdminUserName));
            return;
        }

        this.message.confirm(
            this.l('UserDeleteWarningMessage', user.userName),
            (isConfirmed) => {
                if (isConfirmed) {
                    this._userServiceProxy.deleteUser(user.id)
                        .subscribe(() => {
                            this.getUsers();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }

    public dataStateChange({ skip, take, sort }: DataStateChangeEvent): void {
        this.skip = skip;
        this.pageSize = take;
        this.sort = sort;

        this.loadUsersData();
    }

    loadUsersData(): void {
        let inputDto = new UserGridDataInputDto();
        inputDto.Permission = this.permission ? this.selectedPermission : undefined;
        inputDto.RoleIds = this.roles;
        inputDto.UserName = this.userName;
        inputDto.Surname = this.surname;
        inputDto.Email = this.email;
        inputDto.IsEmailConfirmed = this.isEmailConfirmed;
        inputDto.PhoneNumber = this.phoneNumber;
        inputDto.IsPhoneConfirmed = this.isPhoneConfirmed;
        inputDto.IsActive = this.isActive;
        inputDto.maxResultCount = this.pageSize;
        inputDto.skipCount = this.skip;

        if (this.sort.length > 0 && this.sort[0].dir) {
            inputDto.sorting = this.sort[0].field + " " + this.sort[0].dir;
        }

        let loadUserData = () => {
            return this._userServiceProxy.getUsers(inputDto.UserName, inputDto.Surname, inputDto.Email, inputDto.IsEmailConfirmed, inputDto.PhoneNumber, inputDto.IsPhoneConfirmed, inputDto.IsActive, inputDto.Permission, inputDto.RoleIds, inputDto.sorting, inputDto.maxResultCount, inputDto.skipCount);
        }

        this._userGridDataResult.query(loadUserData);
    }

    // 编辑删除
    loginAsThisUser(dataItem) {
        this._impersonationService.impersonate(dataItem.id, this.appSession.tenantId);
    }

    editHandler(dataItem) {
        this.router.navigate(['app/admin/users/edit', dataItem.id]);
    }

    changePermissions(dataItem) {
        this.router.navigate(['app/admin/users/editPermission', { "id": dataItem.id, "userName": dataItem.userName }]);
    }

    unlockedUser(dataItem) {
        this._userServiceProxy.unlockUser(new EntityDtoOfInt64({ id: dataItem.id })).subscribe(() => {
            this.notify.success(this.l('UnlockedTheUser', dataItem.userName));
        });
    }

    removeHandler(dataItem) {
        this.deleteUser(dataItem);
    }
}