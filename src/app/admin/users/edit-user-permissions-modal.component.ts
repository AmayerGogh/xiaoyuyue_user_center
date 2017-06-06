import { Component, ViewChild, Injector, Output, EventEmitter, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { ModalDirective } from 'ngx-bootstrap';
import { UserServiceProxy, GetUserPermissionsForEditOutput, UpdateUserPermissionsInput, EntityDtoOfInt64 } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { PermissionTreeComponent } from '../shared/permission-tree.component';
import { PermissionTreeEditModel } from '@app/admin/shared/permission-tree-edit.model';
import { appModuleAnimation } from '@shared/animations/routerTransition';

import * as _ from "lodash";

@Component({
    selector: 'editUserPermissionsModal',
    templateUrl: './edit-user-permissions-modal.component.html',
    animations: [appModuleAnimation()],
})
export class EditUserPermissionsModalComponent extends AppComponentBase {

    @ViewChild('editModal') modal: ModalDirective;
    @ViewChild('permissionTree') permissionTree: PermissionTreeComponent;

    // @Output() isUserCreate = new EventEmitter();

    saving: boolean = false;
    resettingPermissions: boolean = false;
    @Input()
    userId: number;

    constructor(
        injector: Injector,
        private _userService: UserServiceProxy,
        private route: ActivatedRoute,
        private location: Location,
    ) {
        super(injector);
    }

    ngOnInit(): void {
        if (this.userId) {
            this._userService
                .getUserPermissionsForEdit(this.userId)
                .subscribe(result => {
                    this.permissionTree.editData = result;
                })
        }
    }

    resetPermissions(): void {

        var input = new EntityDtoOfInt64();

        input.id = this.userId;

        this.resettingPermissions = true;
        this._userService.resetUserSpecificPermissions(input).subscribe(() => {
            this.notify.info(this.l('ResetSuccessfully'));
            this._userService.getUserPermissionsForEdit(this.userId).subscribe(result => {
                this.permissionTree.editData = result;
            });
        }, undefined, () => {
            this.resettingPermissions = false;
        });
    }
}