import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { ModalModule, TabsModule, TooltipModule, PopoverModule } from 'ngx-bootstrap';
import { FileUploadModule } from '@node_modules/ng2-file-upload';

import { AdminRoutingModule } from './admin-routing.module'
import { UtilsModule } from '@shared/utils/utils.module'
import { AppCommonModule } from '@app/shared/common/app-common.module'

import { UsersComponent } from './users/users.component'
import { PermissionComboComponent } from './shared/permission-combo.component';
import { RoleComboComponent } from './shared/role-combo.component';
import { CreateOrEditUserModalComponent } from './users/create-or-edit-user-modal.component'
import { EditUserPermissionsModalComponent } from './users/edit-user-permissions-modal.component';
import { PermissionTreeComponent } from './shared/permission-tree.component';
import { FeatureTreeComponent } from './shared/feature-tree.component';

import { RolesComponent } from './roles/roles.component'
import { CreateOrEditRoleModalComponent } from './roles/create-or-edit-role-modal.component'

import { AuditLogsComponent } from './audit-logs/audit-logs.component'
import { AuditLogDetailModalComponent } from './audit-logs/audit-log-detail-modal.component'

import { HostSettingsComponent } from './settings/host-settings.component'
import { MaintenanceComponent } from './maintenance/maintenance.component'
import { EditionsComponent } from './editions/editions.component'
import { CreateOrEditEditionModalComponent } from './editions/create-or-edit-edition-modal.component'
import { ImpersonationService } from './users/impersonation.service';
import { LanguagesComponent } from './languages/languages.component';
import { LanguageTextsComponent } from './languages/language-texts.component';
import { CreateOrEditLanguageModalComponent } from './languages/create-or-edit-language-modal.component';
import { TenantsComponent } from './tenants/tenants.component'
import { CreateTenantModalComponent } from './tenants/create-tenant-modal.component'
import { EditTenantModalComponent } from './tenants/edit-tenant-modal.component'
import { TenantFeaturesModalComponent } from './tenants/tenant-features-modal.component'
import { EditTextModalComponent } from './languages/edit-text-modal.component';
import { OrganizationUnitsComponent } from './organization-units/organization-units.component';
import { OrganizationTreeComponent } from './organization-units/organization-tree.component';
import { OrganizationUnitMembersComponent } from './organization-units/organization-unit-members.component';
import { CreateOrEditUnitModalComponent } from './organization-units/create-or-edit-unit-modal.component';
import { TenantSettingsComponent } from './settings/tenant-settings.component'

import { GridModule, SharedModule } from '@progress/kendo-angular-grid';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { UserManagementComponent } from "app/admin/settings/host-settings/user-management/user-management.component";
import { TenantManagementComponent } from "app/admin/settings/host-settings/tenant-management/tenant-management.component";
import { SecurityComponent } from "app/admin/settings/host-settings/security/security.component";
import { EmailSmtpComponent } from "app/admin/settings/host-settings/email-smtp/email-smtp.component";
import { LoginSettingComponent } from "app/admin/settings/host-settings/login-setting/login-setting.component";
import { GeneralInfoComponent } from "app/admin/settings/host-settings/general-info/general-info.component";
import { AppStorageService } from "shared/services/storage.service";
import { HostSettingService } from "shared/services/get-host-settings.service";
import { GetUserForEdit } from "shared/services/get-user-info.service";
import { TenantService } from "shared/services/tenant.service";
import { DataLocalStorage } from "shared/services/data-local-storage.service";
import { SmsSettingComponent } from './settings/host-settings/sms-setting/sms-setting.component';
import { MessageManageComponent } from './message-manage/message-manage.component';

import { DialogModule } from '@progress/kendo-angular-dialog';
import { SMSTemplateServiceProxy, OrganizationBookingServiceProxy, PictureServiceProxy, OutletServiceServiceProxy } from "shared/service-proxies/service-proxies";
import { EditModalComponent } from "app/admin/message-manage/create-or-edit-message-template/edit-modal/edit-modal.component";
import { CreateOrEditMessageTemplateComponent } from "app/admin/message-manage/create-or-edit-message-template/create-or-edit-message-template.component";
import { DatePickerModule, DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { ManageBookingComponent } from './manage-booking/manage-booking.component';
import { CreateOrEditBookingComponent } from "app/admin/create-or-edit-booking/create-or-edit-booking.component";
import { BaseInfoComponent } from "app/admin/create-or-edit-booking/base-info/base-info.component";
import { PictureManageComponent } from "app/admin/create-or-edit-booking/picture-manage/picture-manage.component";
import { TimeInfoComponent } from "app/admin/create-or-edit-booking/time-info/time-info.component";
import { UploadPictureModelComponent } from './create-or-edit-booking/picture-manage/upload-picture-model/upload-picture-model.component';


@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,

        FileUploadModule,
        ModalModule.forRoot(),
        TabsModule.forRoot(),
        TooltipModule.forRoot(),
        PopoverModule.forRoot(),

        AdminRoutingModule,
        UtilsModule,
        AppCommonModule,
        GridModule,
        DropDownsModule,
        ButtonsModule,
        SharedModule,
        DialogModule,

        DatePickerModule,
        DateInputsModule,
    ],
    declarations: [
        UsersComponent,
        PermissionComboComponent,
        RoleComboComponent,
        CreateOrEditUserModalComponent,
        EditUserPermissionsModalComponent,
        PermissionTreeComponent,
        FeatureTreeComponent,
        RolesComponent,
        CreateOrEditRoleModalComponent,
        AuditLogsComponent,
        AuditLogDetailModalComponent,
        HostSettingsComponent,
        MaintenanceComponent,
        EditionsComponent,
        CreateOrEditEditionModalComponent,
        LanguagesComponent,
        LanguageTextsComponent,
        CreateOrEditLanguageModalComponent,
        TenantsComponent,
        CreateTenantModalComponent,
        EditTenantModalComponent,
        TenantFeaturesModalComponent,
        CreateOrEditLanguageModalComponent,
        EditTextModalComponent,
        OrganizationUnitsComponent,
        OrganizationTreeComponent,
        OrganizationUnitMembersComponent,
        CreateOrEditUnitModalComponent,
        TenantSettingsComponent,
        
        UserManagementComponent,
        TenantManagementComponent,
        SecurityComponent,
        EmailSmtpComponent,
        LoginSettingComponent,
        GeneralInfoComponent,
        SmsSettingComponent,
        MessageManageComponent,
        CreateOrEditMessageTemplateComponent,
        EditModalComponent,
        CreateOrEditBookingComponent,
        BaseInfoComponent,
        PictureManageComponent,
        TimeInfoComponent,
        ManageBookingComponent,
        UploadPictureModelComponent,
    ],
    providers: [
        ImpersonationService,
        AppStorageService,
        HostSettingService,
        GetUserForEdit,
        TenantService,
        SMSTemplateServiceProxy,
        DataLocalStorage,
        OrganizationBookingServiceProxy,
        PictureServiceProxy,
        OutletServiceServiceProxy
    ]
})
export class AdminModule { }