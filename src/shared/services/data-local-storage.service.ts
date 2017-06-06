import { Injectable } from '@angular/core';
import { PermissionServiceProxy, FlatPermissionWithLevelDto, ListResultDtoOfFlatPermissionWithLevelDto, RoleServiceProxy, PagedResultDtoOfRoleListDto, RoleListDto, CommonLookupServiceProxy, ListResultDtoOfComboboxItemDto, ComboboxItemDto, EditionServiceProxy } from "shared/service-proxies/service-proxies";

@Injectable()
export class DataLocalStorage {
    permissionsString: string;
    permissions: FlatPermissionWithLevelDto[];
    rolesString: string;
    roles: RoleListDto[];
    editionsString: string;
    editionsName: ComboboxItemDto[];

    constructor(
        private _permissionService: PermissionServiceProxy,
        private _roleService: RoleServiceProxy,
        private _commonLookupServiceProxy: CommonLookupServiceProxy
    ) { }
    protected jsonParseReviver: (key: string, value: any) => any = undefined;

    /**
     * 把用户权限保存在localStorage
     * @return promise object
     */
    userDataLocalStorage(): Promise<FlatPermissionWithLevelDto[]> {
        this.permissionsString = localStorage.getItem("user.permission");
        return new Promise((response) => {
            if (this.permissionsString) {
                let jsonData = JSON.parse(this.permissionsString, this.jsonParseReviver);
                this.permissions = ListResultDtoOfFlatPermissionWithLevelDto.fromJS(jsonData).items;
                response(this.permissions);
            } else {
                this._permissionService
                    .getAllPermissions()
                    .subscribe(result => {
                        this.permissions = result.items;
                        this.permissionsString = result.toJSON();
                        localStorage.setItem("user.permission", this.permissionsString);
                        response(result.items);
                    })
            }
        })
    }

    /**
     * 把角色信息保存在localStorage
     */
    rolesDataLocalStorage(): Promise<RoleListDto> {
        this.rolesString = localStorage.getItem("roles.info");
        return new Promise((response) => {
            if (this.rolesString) {
                let jsonData = JSON.parse(this.rolesString, this.jsonParseReviver);
                this.roles = PagedResultDtoOfRoleListDto.fromJS(jsonData).items;
                response(this.roles);
            } else {
                this._roleService
                    .getRoles(undefined, undefined, undefined, undefined, undefined)
                    .subscribe(result => {
                        this.roles = result.items;
                        this.rolesString = result.toJSON();
                        localStorage.setItem("roles.info", this.rolesString);
                        response(result.items)
                    })
            }
        })
    }

    /**
     * 把版本信息存在localStorage
     */
    editionsDataLocalStorage() {
        this.editionsString = localStorage.getItem("edition.info");
        if (this.editionsString) {
            let jsonData = JSON.parse(this.editionsString, this.jsonParseReviver);
            this.editionsName = ListResultDtoOfComboboxItemDto.fromJS(jsonData).items;
        } else {
            this._commonLookupServiceProxy
                .getEditionsForCombobox()
                .subscribe(result => {
                    let choose = new ComboboxItemDto();
                    choose.value = "0";
                    choose.displayText = "请选择";
                    choose.isSelected = false;

                    result.items.unshift(choose);
                    this.editionsString = result.toJSON();
                    this.editionsName = result.items;

                    localStorage.setItem("edition.info", this.editionsString);
                })
        }
    }
}