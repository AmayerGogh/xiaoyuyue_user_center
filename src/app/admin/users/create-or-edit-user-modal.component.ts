import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap';
import { UserServiceProxy, ProfileServiceProxy, UserEditDto, CreateOrUpdateUserInput, UserRoleDto, GetUserForEditOutput, ExternalUserLoginDto, PasswordComplexitySetting } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { AppConsts } from '@shared/AppConsts';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Location } from '@angular/common';
import { EditUserPermissionsModalComponent } from './edit-user-permissions-modal.component'

import * as _ from "lodash";
import { GetUserForEdit } from "shared/services/get-user-info.service";
import { PermissionTreeComponent } from "app/admin/shared/permission-tree.component";
import { SortDescriptor } from "@progress/kendo-data-query/dist/es/sort-descriptor";

@Component({
    selector: 'createOrEditUserModal',
    templateUrl: './create-or-edit-user-modal.component.html',
    animations: [appModuleAnimation()],
    styles: [
        `.user-edit-dialog-profile-image {
             margin-bottom: 20px;
        }
        :host >>> .popover {
          max-width: 400px;
        }`
    ]
})
export class CreateOrEditUserModalComponent extends AppComponentBase {

    @ViewChild('nameInput') nameInput: ElementRef;
    @ViewChild('createOrEditModal') modal: ModalDirective;
    @ViewChild('editUserPermissionsModal') editUserPermissionsModal: EditUserPermissionsModalComponent;
    @ViewChild('permissionTree') permissionTree: EditUserPermissionsModalComponent;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    saving: boolean = false;
    canChangeUserName: boolean = true;
    isTwoFactorEnabled: boolean = this.setting.getBoolean("Abp.Zero.UserManagement.TwoFactorLogin.IsEnabled");
    isLockoutEnabled: boolean = this.setting.getBoolean("Abp.Zero.UserManagement.UserLockOut.IsEnabled");
    passwordComplexitySetting: PasswordComplexitySetting = new PasswordComplexitySetting();

    getUserInfos: GetUserForEditOutput = new GetUserForEditOutput();
    user: UserEditDto = new UserEditDto();
    roles: UserRoleDto[];
    sendActivationEmail: boolean = true;
    setRandomPassword: boolean = true;
    isShowPermission: boolean = true;
    href: string = document.location.href;
    userId: number = +this.href.substr(this.href.lastIndexOf("/") + 1, this.href.length);
    passwordComplexityInfo: string = '';
    pageSize: number = AppConsts.grid.defaultPageSize;
    skip: number = 0;
    sort: Array<SortDescriptor> = [];
    _getUserForEdit: GetUserForEdit;
    constructor(
        injector: Injector,
        private _userService: UserServiceProxy,
        private route: ActivatedRoute,
        private location: Location,
        private getUserForEdit: GetUserForEdit, 
    ) {
        super(injector);
        this._getUserForEdit = getUserForEdit;
    }

    ngOnInit(): void {
        // 根据ID获取用户信息
        this.getForEdit(this.userId);

    }

    /**
     * 是否显示权限和外部认证页面
     * 用户页面下就获取数据
     * 创建用户下就重置数据
     * @param 
     */
    getForEdit(userId?: number): void {
        let that = this;
        if (userId) {
            this._getUserForEdit.getUserInfo(userId);
            this.setRandomPassword = false;
            this.sendActivationEmail = false;
            this.isShowPermission = false;
        } else {
            this.isShowPermission = true;
            this._getUserForEdit.user = this.user;
            this._getUserForEdit.roles = this.roles;
        }
    }


    onShown(): void {
        $(this.nameInput.nativeElement).focus();
    }

    save(): void {
        var input = new CreateOrUpdateUserInput();

        if (!this.isShowPermission) {
            input.grantedPermissionNames = this.editUserPermissionsModal.permissionTree.getGrantedPermissionNames();
        }

        input.user = this._getUserForEdit.user;
        input.setRandomPassword = this.setRandomPassword;
        input.sendActivationEmail = this.sendActivationEmail;
        input.assignedRoleNames =
            _.map(
                _.filter(this.roles, { isAssigned: true }), role => role.roleName
            );
        this.saving = true;
        this._userService.createOrUpdateUser(input)
            .finally(() => { this.saving = false; })
            .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modalSave.emit(null);
            });
    }

    close(): void {
        this.location.back();
    }

    getAssignedRoleCount(): number {
        return _.filter(this._getUserForEdit.roles, { isAssigned: true }).length;
    }

}