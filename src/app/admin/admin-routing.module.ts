import { AdminPermissions } from '@shared/AdminPermissions';
import { NgModule } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';
import { AuditLogsComponent } from './audit-logs/audit-logs.component';
import { HostSettingsComponent } from './settings/host-settings.component';
import { TenantSettingsComponent } from './settings/tenant-settings.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { EditionsComponent } from './editions/editions.component';
import { LanguagesComponent } from './languages/languages.component';
import { LanguageTextsComponent } from './languages/language-texts.component';
import { TenantsComponent } from './tenants/tenants.component';
import { OrganizationUnitsComponent } from './organization-units/organization-units.component';

import { CreateOrEditRoleModalComponent } from './roles/create-or-edit-role-modal.component';
import { CreateOrEditUserModalComponent } from './users/create-or-edit-user-modal.component';
import { EditUserPermissionsModalComponent } from './users/edit-user-permissions-modal.component';
import { AuditLogDetailModalComponent } from './audit-logs/audit-log-detail-modal.component';
import { CreateOrEditEditionModalComponent } from './editions/create-or-edit-edition-modal.component';
import { CreateTenantModalComponent } from './tenants/create-tenant-modal.component';
import { EditTenantModalComponent } from './tenants/edit-tenant-modal.component';
import { MessageManageComponent } from "app/admin/message-manage/message-manage.component";
import { CreateOrEditMessageTemplateComponent } from "app/admin/message-manage/create-or-edit-message-template/create-or-edit-message-template.component";
import { CreateOrEditBookingComponent } from "app/admin/create-or-edit-booking/create-or-edit-booking.component";
import { ManageBookingComponent } from "app/admin/manage-booking/manage-booking.component";

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                children: [

                    {
                        path: 'booking',
                        children: [
                            { path: '', redirectTo: 'list' },
                            { path: "list", component: ManageBookingComponent },
                            { path: "create", component: CreateOrEditBookingComponent },
                            { path: "edit/:id", component: CreateOrEditBookingComponent }
                        ]
                    },
                    {
                        path: 'users',
                        children: [
                            { path: '', redirectTo: 'list' },
                            { path: 'list', component: UsersComponent, data: { permission: AdminPermissions.userManage_Users } },
                            { path: 'create', component: CreateOrEditUserModalComponent, data: { permission: AdminPermissions.userManage_UsersCreate } },
                            { path: 'edit/:id', component: CreateOrEditUserModalComponent, data: { permission: AdminPermissions.userManage_UsersEdit } },
                            { path: 'editPermission', component: EditUserPermissionsModalComponent, data: { permission: AdminPermissions.userManage_UsersChangePermissions } },
                        ]
                    },
                    {
                        path: 'roles',
                        children: [
                            { path: '', redirectTo: 'list' },
                            { path: 'list', component: RolesComponent, data: { permission: AdminPermissions.userManage_Roles } },
                            { path: 'create', component: CreateOrEditRoleModalComponent, data: { permission: AdminPermissions.userManage_RolesCreate } },
                            { path: 'edit/:id', component: CreateOrEditRoleModalComponent, data: { permission: AdminPermissions.userManage_RolesEdit } },
                        ]
                    },
                    {
                        path: 'auditLogs',
                        children: [
                            { path: '', redirectTo: 'list' },
                            { path: "list", component: AuditLogsComponent, data: { permission: AdminPermissions.system_AuditLogs } },
                            { path: "detail", component: AuditLogDetailModalComponent }
                        ]
                    },
                    { path: 'maintenance', component: MaintenanceComponent, data: { permission: AdminPermissions.system_HostMaintenance } },
                    { path: 'hostSettings', component: HostSettingsComponent, data: { permission: AdminPermissions.configuration_HostSettings } },
                    {
                        path: 'editions',
                        children: [
                            { path: '', redirectTo: 'list' },
                            { path: "list", component: EditionsComponent, data: { permission: AdminPermissions.system_Editions } },
                            { path: "create", component: CreateOrEditEditionModalComponent },
                            { path: "edit/:id", component: CreateOrEditEditionModalComponent }
                        ]
                    },
                    { path: 'languages', component: LanguagesComponent, data: { permission: AdminPermissions.configuration_Languages } },
                    { path: 'languages/:name/texts', component: LanguageTextsComponent, data: { permission: AdminPermissions.configuration_LanguagesChangeTexts } },
                    {
                        path: 'tenants',
                        children: [
                            { path: '', redirectTo: 'list' },
                            { path: "list", component: TenantsComponent, data: { permission: AdminPermissions.userManage_Tenants } },
                            { path: "create", component: CreateTenantModalComponent },
                            { path: "edit/:id", component: EditTenantModalComponent }
                        ]
                    },
                    { path: 'organization-units', component: OrganizationUnitsComponent, data: { permission: AdminPermissions.userManage_OrganizationUnits } },
                    { path: 'tenantSettings', component: TenantSettingsComponent, data: { permission: AdminPermissions.configuration_TenantSettings } },
                    {
                        path: 'message-template',
                        children: [
                            { path: '', redirectTo: 'list', data: { permission: AdminPermissions.content_SmsTemplates } },
                            { path: "list", component: MessageManageComponent },
                            { path: "create", component: CreateOrEditMessageTemplateComponent },
                            { path: "edit/:id", component: CreateOrEditMessageTemplateComponent }
                        ]
                    },
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class AdminRoutingModule {
    constructor(private router: Router) {
        router.events.subscribe(() => {
            this.hideOpenJTableDropdownMenus();
        });
    }

    hideOpenJTableDropdownMenus(): void {
        var $dropdownMenus = $('.dropdown-menu.tether-element');
        $dropdownMenus.css({
            'display': 'none'
        });
    }
}